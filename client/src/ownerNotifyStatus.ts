/** Mirrors API fields from POST /api/register-interest and /api/contact */

export type OwnerEmailNotify =
  | { configured: false; skipped?: true; sent: 0; failed: 0 }
  | { configured: true; sent: number; failed: number };

export type OwnerSmsNotify = { configured: false } | { configured: true; ok: boolean };

export type RegistrantEmailStatus = { sent: true } | { sent: false; reason: "not_configured" | "failed" };

export type NotifyTone = "ok" | "warn" | "bad";

export function describeOwnerEmailNotify(n: OwnerEmailNotify): { text: string; tone: NotifyTone } {
  if (!n.configured) {
    return {
      text: "Staff email alerts are not configured on the server. Your submission is still saved.",
      tone: "warn",
    };
  }
  const { sent, failed } = n;
  if (sent > 0 && failed === 0) {
    return {
      text: `Staff email notification sent (${sent} inbox${sent === 1 ? "" : "es"}).`,
      tone: "ok",
    };
  }
  if (sent === 0 && failed > 0) {
    return {
      text:
        "Your registration is saved. Our automatic staff email didn’t send (technical issue on our side). Please call or email us if you need help right away—we still have your details.",
      tone: "bad",
    };
  }
  if (sent > 0 && failed > 0) {
    return {
      text: `Staff email: ${sent} of ${sent + failed} notification(s) sent. Some inboxes may not have received it.`,
      tone: "warn",
    };
  }
  return { text: "Your submission is saved.", tone: "ok" };
}

export function describeOwnerSmsNotify(n: OwnerSmsNotify): string | null {
  if (!n.configured) return null;
  return n.ok ? "SMS alert to instructor: sent." : "SMS alert to instructor: not sent (check Twilio settings on the server).";
}

/** Confirmation email row on the Register success screen */
export function registrantEmailUi(n: RegistrantEmailStatus): { text: string; tone: "ok" | "warn" } | null {
  if (n.sent) {
    return {
      text: "We sent a confirmation email to your address — please check your inbox (and spam/junk).",
      tone: "ok",
    };
  }
  if (n.reason === "failed") {
    return {
      text: "We couldn’t send a confirmation email right now; your registration is still saved and we’ll contact you.",
      tone: "warn",
    };
  }
  return null;
}
