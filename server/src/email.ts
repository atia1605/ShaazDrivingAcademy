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
