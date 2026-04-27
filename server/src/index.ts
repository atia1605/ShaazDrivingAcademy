import "dotenv/config";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import Stripe from "stripe";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { sendOwnerNotification, sendOwnerSmsNotification } from "./email.js";
import { PAYMENT_PRODUCTS, formatCad, type PaymentProductKey } from "./payments.js";

const prisma = new PrismaClient();
const app = express();
const PORT = Number(process.env.PORT) || 4000;

const defaultClientOrigins =
  "http://localhost:5173,http://127.0.0.1:5173,https://www.shaazdriving.com,https://shaazdrivingacademy.onrender.com";

const clientOrigins = (process.env.CLIENT_ORIGIN || defaultClientOrigins)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const publicAppUrl = (process.env.PUBLIC_APP_URL || "http://localhost:5173").replace(/\/$/, "");

app.use(
  helmet({
    // Allow API responses to be read from www.shaazdriving.com (GitHub Pages)
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(
  cors({
    origin: clientOrigins.length === 1 ? clientOrigins[0] : clientOrigins,
    credentials: true,
  })
);
app.use(express.json({ limit: "64kb" }));

const contactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  message: z.string().min(1).max(8000),
});

const registrationSchema = z.object({
  fullName: z.string().min(1).max(200),
  email: z.string().email().max(320),
  phone: z.string().max(40).optional().or(z.literal("")),
  courseType: z.string().max(200).optional().or(z.literal("")),
  notes: z.string().max(4000).optional().or(z.literal("")),
});

const checkoutSchema = z.object({
  productKey: z.string(),
  customerEmail: z.string().email().optional(),
});

function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

/** Root URL — Render opens this in the browser; the API had no / route before (404). */
app.get("/", (_req, res) => {
  res.json({
    service: "shaaz-driving-api",
    message: "This host is the API only. The public website is at https://www.shaazdriving.com",
    health: "/api/health",
  });
});

app.get("/api/health", (_req, res) => {
  const ownerNotificationsConfigured = Boolean(
    process.env.RESEND_API_KEY && process.env.RESEND_FROM && process.env.SITE_OWNER_EMAIL
  );
  res.json({
    ok: true,
    service: "shaaz-driving-api",
    payments: Boolean(process.env.STRIPE_SECRET_KEY),
    /** True when Resend env vars are present (check logs if mail still does not arrive). */
    ownerNotificationsConfigured,
  });
});

app.get("/api/payment-options", (_req, res) => {
  const items = (Object.keys(PAYMENT_PRODUCTS) as PaymentProductKey[]).map((key) => {
    const p = PAYMENT_PRODUCTS[key];
    return {
      key,
      name: p.name,
      description: p.description,
      amountDisplay: formatCad(p.amountCents),
    };
  });
  res.json({ items, payOnlineEnabled: Boolean(process.env.STRIPE_SECRET_KEY) });
});

app.post("/api/checkout-session", async (req, res) => {
  const stripe = getStripe();
  if (!stripe) {
    res.status(503).json({ error: "Online payments are not configured yet." });
    return;
  }

  const parsed = checkoutSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input", details: parsed.error.flatten() });
    return;
  }

  const { productKey, customerEmail } = parsed.data;
  if (!(productKey in PAYMENT_PRODUCTS)) {
    res.status(400).json({ error: "Unknown product" });
    return;
  }

  const product = PAYMENT_PRODUCTS[productKey as PaymentProductKey];

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      ...(customerEmail ? { customer_email: customerEmail } : {}),
      line_items: [
        {
          price_data: {
            currency: "cad",
            unit_amount: product.amountCents,
            product_data: {
              name: product.name,
              description: product.description,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${publicAppUrl}/pay/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${publicAppUrl}/pay`,
      metadata: { productKey },
    });

    if (!session.url) {
      res.status(500).json({ error: "Could not create checkout session" });
      return;
    }

    res.json({ url: session.url });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Payment provider error" });
  }
});

app.post("/api/contact", async (req, res) => {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input", details: parsed.error.flatten() });
    return;
  }
  const row = await prisma.contactMessage.create({
    data: parsed.data,
  });

  await sendOwnerNotification(
    `Website contact: ${parsed.data.name}`,
    `<p><strong>Name:</strong> ${escapeHtml(parsed.data.name)}</p>
     <p><strong>Email:</strong> ${escapeHtml(parsed.data.email)}</p>
     <p><strong>Message:</strong></p><p>${escapeHtml(parsed.data.message).replace(/\n/g, "<br/>")}</p>`,
    { replyTo: parsed.data.email }
  ).catch((err) => console.error("[email] sendOwnerNotification (contact)", err));

  res.status(201).json({ id: row.id, message: "Thank you — we received your message." });
});

app.post("/api/register-interest", async (req, res) => {
  const parsed = registrationSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input", details: parsed.error.flatten() });
    return;
  }
  const { phone, courseType, notes, ...rest } = parsed.data;
  const row = await prisma.registrationInterest.create({
    data: {
      ...rest,
      phone: phone || null,
      courseType: courseType || null,
      notes: notes || null,
    },
  });

  await sendOwnerNotification(
    `New registration: ${parsed.data.fullName}`,
    `<p><strong>New Register Online submission</strong></p>
     <p>Submitted from shaazdriving.com. Full details are below:</p>
     <hr />
     <p><strong>Full name:</strong> ${escapeHtml(parsed.data.fullName)}</p>
     <p><strong>Email:</strong> ${escapeHtml(parsed.data.email)}</p>
     <p><strong>Phone number:</strong> ${escapeHtml(phone || "Not provided")}</p>
     <p><strong>Course interest:</strong> ${escapeHtml(courseType || "Not provided")}</p>
     <p><strong>Notes:</strong></p>
     <p>${escapeHtml(notes || "Not provided").replace(/\n/g, "<br/>")}</p>
     <hr />
     <p><strong>Quick copy:</strong></p>
     <p>
       Name: ${escapeHtml(parsed.data.fullName)}<br/>
       Email: ${escapeHtml(parsed.data.email)}<br/>
       Phone: ${escapeHtml(phone || "Not provided")}<br/>
       Course: ${escapeHtml(courseType || "Not provided")}<br/>
       Notes: ${escapeHtml(notes || "Not provided").replace(/\n/g, "<br/>")}
     </p>`,
    { replyTo: parsed.data.email }
  ).catch((err) => console.error("[email] sendOwnerNotification (registration)", err));

  const smsLines = [
    "New website registration",
    `Name: ${parsed.data.fullName}`,
    `Email: ${parsed.data.email}`,
    `Phone: ${phone || "—"}`,
    `Course interest: ${courseType || "—"}`,
    `Notes: ${notes || "—"}`,
  ];
  await sendOwnerSmsNotification(smsLines.join("\n")).catch((err) =>
    console.error("[sms] sendOwnerSmsNotification", err)
  );

  res.status(201).json({ id: row.id, message: "Registration interest saved. We'll be in touch." });
});

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Bind all interfaces — required for Render, Railway, Docker, etc. (not only 127.0.0.1)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`API listening on 0.0.0.0:${PORT} (open your service’s https://… URL in a browser — not localhost from these logs)`);
});
