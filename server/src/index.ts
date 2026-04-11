import "dotenv/config";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const PORT = Number(process.env.PORT) || 4000;
const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.use(helmet());
app.use(
  cors({
    origin: clientOrigin,
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

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "shaaz-driving-api" });
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
  res.status(201).json({ id: row.id, message: "Registration interest saved. We'll be in touch." });
});

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
