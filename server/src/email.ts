/**
 * Owner notifications via [Resend](https://resend.com).
 * Set on Render: RESEND_API_KEY, RESEND_FROM, SITE_OWNER_EMAIL
 */
export type OwnerEmailNotifyResult =
  | { configured: false; skipped: true; sent: 0; failed: 0 }
  | { configured: true; skipped?: false; sent: number; failed: number };

export type OwnerSmsNotifyResult =
  | { configured: false }
  | { configured: true; ok: boolean };

type NotifyOptions = {
  /** Lets the owner hit Reply to reach the customer (contact / registration). */
  replyTo?: string;
};

/** Plain-text part helps deliverability (multipart/alternative). */
function htmlToPlainText(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function sendOwnerNotification(
  subject: string,
  html: string,
  options?: NotifyOptions
): Promise<OwnerEmailNotifyResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const toRaw = process.env.SITE_OWNER_EMAIL;

  if (!apiKey || !from || !toRaw) {
    const missing: string[] = [];
    if (!apiKey) missing.push("RESEND_API_KEY");
    if (!from) missing.push("RESEND_FROM");
    if (!toRaw) missing.push("SITE_OWNER_EMAIL");
    console.warn(`[email] Owner notification skipped — missing env: ${missing.join(", ")}`);
    return { configured: false, skipped: true, sent: 0, failed: 0 };
  }

  const to = toRaw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const text = htmlToPlainText(html);

  const uniqueRecipients = [...new Set(to)];
  console.log("[email] Sending owner notification to", uniqueRecipients.length, "address(es)");

  let sent = 0;
  let failed = 0;

  for (const recipient of uniqueRecipients) {
    const basePayload: Record<string, unknown> = {
      from,
      to: [recipient],
      subject,
      html,
      text,
      tags: [{ name: "source", value: "shaaz-api" }],
    };

    if (options?.replyTo) {
      basePayload.reply_to = options.replyTo;
    }

    const sendOnce = async (payload: Record<string, unknown>) => {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const resText = await res.text();
      return { res, resText };
    };

    try {
      let { res, resText } = await sendOnce(basePayload);

      if (!res.ok && res.status === 422 && basePayload.reply_to) {
        console.warn("[email] Retrying without reply_to for", recipient, res.status, resText);
        const withoutReply = { ...basePayload };
        delete withoutReply.reply_to;
        const second = await sendOnce(withoutReply);
        res = second.res;
        resText = second.resText;
      }

      if (!res.ok) {
        console.error("[email] Resend error for", recipient, ":", res.status, resText);
        failed++;
        continue;
      }
      sent++;
      try {
        const data = JSON.parse(resText) as { id?: string };
        if (data.id) {
          console.log("[email] Owner notification sent to", recipient, "Resend id:", data.id);
        } else {
          console.log("[email] Owner notification sent to", recipient);
        }
      } catch {
        console.log("[email] Owner notification sent to", recipient);
      }
    } catch (err) {
      console.error("[email] Network error calling Resend for", recipient, ":", err);
      failed++;
    }
  }

  return { configured: true, sent, failed };
}

export type RegistrantThankYouResult =
  | { sent: false; reason: "not_configured" }
  | { sent: false; reason: "failed" }
  | { sent: true };

/** Confirmation email to the person who submitted the registration form (uses same Resend `from` as staff alerts). */
export async function sendRegistrantRegistrationThankYou(params: {
  toEmail: string;
  fullName: string;
}): Promise<RegistrantThankYouResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!apiKey || !from) {
    console.warn("[email] Registrant thank-you skipped — missing RESEND_API_KEY or RESEND_FROM");
    return { sent: false, reason: "not_configured" };
  }

  const contactEmail = process.env.PUBLIC_CONTACT_EMAIL ?? "shohanchowdhury@hotmail.com";
  const contactPhone = process.env.PUBLIC_CONTACT_PHONE ?? "647-783-7582";
  const telHref = contactPhone.replace(/\D/g, "");

  const greeting = esc(params.fullName.trim().split(/\s+/)[0] || "there");
  const subject = "Thanks for registering — Shaaz Driving Academy";

  const html = `<p>Hi ${greeting},</p>
<p>Thank you for registering with <strong>Shaaz Driving Academy</strong>. We received your details and will get back to you shortly.</p>
<p>If you have questions in the meantime, feel free to reach us:</p>
<ul>
  <li><strong>Phone:</strong> <a href="tel:${telHref}">${esc(contactPhone)}</a></li>
  <li><strong>Email:</strong> <a href="mailto:${esc(contactEmail)}">${esc(contactEmail)}</a></li>
</ul>
<p>— Shaaz Driving Academy<br/>Toronto &amp; Scarborough</p>`;

  const text = htmlToPlainText(html);

  const basePayload: Record<string, unknown> = {
    from,
    to: [params.toEmail],
    subject,
    html,
    text,
    reply_to: contactEmail,
    tags: [{ name: "source", value: "shaaz-registrant-thanks" }],
  };

  const sendOnce = async (payload: Record<string, unknown>) => {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const resText = await res.text();
    return { res, resText };
  };

  try {
    let { res, resText } = await sendOnce(basePayload);

    if (!res.ok && res.status === 422 && basePayload.reply_to) {
      console.warn("[email] Registrant thank-you: retry without reply_to", res.status, resText);
      const withoutReply = { ...basePayload };
      delete withoutReply.reply_to;
      const second = await sendOnce(withoutReply);
      res = second.res;
      resText = second.resText;
    }

    if (!res.ok) {
      console.error("[email] Registrant thank-you Resend error:", res.status, resText);
      return { sent: false, reason: "failed" };
    }

    try {
      const data = JSON.parse(resText) as { id?: string };
      console.log("[email] Registrant thank-you sent to", params.toEmail, data.id ?? "");
    } catch {
      console.log("[email] Registrant thank-you sent to", params.toEmail);
    }
    return { sent: true };
  } catch (err) {
    console.error("[email] Registrant thank-you network error:", err);
    return { sent: false, reason: "failed" };
  }
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendOwnerSmsNotification(message: string): Promise<OwnerSmsNotifyResult> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_PHONE;
  const to = process.env.SITE_OWNER_PHONE;

  if (!accountSid || !authToken || !from || !to) {
    console.warn(
      "[sms] Owner SMS notification skipped: set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_PHONE, and SITE_OWNER_PHONE on the server."
    );
    return { configured: false };
  }

  const body = new URLSearchParams({
    From: from,
    To: to,
    Body: message,
  });

  try {
    const auth = Buffer.from(`${accountSid}:${authToken}`).toString("base64");
    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[sms] Twilio error:", res.status, errText);
      return { configured: true, ok: false };
    }
    return { configured: true, ok: true };
  } catch (err) {
    console.error("[sms] Twilio network error:", err);
    return { configured: true, ok: false };
  }
}
