/**
 * Owner notifications via [Resend](https://resend.com).
 * Set on Render: RESEND_API_KEY, RESEND_FROM, SITE_OWNER_EMAIL
 */
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
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const toRaw = process.env.SITE_OWNER_EMAIL;

  if (!apiKey || !from || !toRaw) {
    console.warn(
      "[email] Owner notification skipped: set RESEND_API_KEY, RESEND_FROM, and SITE_OWNER_EMAIL on the server."
    );
    return;
  }

  const to = toRaw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const text = htmlToPlainText(html);

  const payload: Record<string, unknown> = {
    from,
    to,
    subject,
    html,
    text,
  };

  if (options?.replyTo) {
    payload.reply_to = options.replyTo;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("[email] Resend error:", res.status, errText);
  }
}

export async function sendOwnerSmsNotification(message: string): Promise<void> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_PHONE;
  const to = process.env.SITE_OWNER_PHONE;

  if (!accountSid || !authToken || !from || !to) {
    console.warn(
      "[sms] Owner SMS notification skipped: set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_PHONE, and SITE_OWNER_PHONE on the server."
    );
    return;
  }

  const body = new URLSearchParams({
    From: from,
    To: to,
    Body: message,
  });

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
  }
}
