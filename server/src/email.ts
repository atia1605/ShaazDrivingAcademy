/**
 * Optional Resend integration — set RESEND_API_KEY and RESEND_FROM in .env
 * https://resend.com/docs/send-with-node
 */
export async function sendOwnerNotification(subject: string, html: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const to = process.env.SITE_OWNER_EMAIL;
  if (!apiKey || !from || !to) return;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, html }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Resend error:", res.status, text);
  }
}
