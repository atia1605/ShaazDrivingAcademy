/** Mirrors API fields from POST /api/register-interest and /api/contact */

import type { TFunction } from "i18next";

export type OwnerEmailNotify =
  | { configured: false; skipped?: true; sent: 0; failed: 0 }
  | { configured: true; sent: number; failed: number };

export type OwnerSmsNotify = { configured: false } | { configured: true; ok: boolean };

export type RegistrantEmailStatus = { sent: true } | { sent: false; reason: "not_configured" | "failed" };

export type NotifyTone = "ok" | "warn" | "bad";

export function describeOwnerEmailNotify(n: OwnerEmailNotify, t: TFunction): { text: string; tone: NotifyTone } {
  if (!n.configured) {
    return {
      text: t("notify.ownerEmailNotConfigured"),
      tone: "warn",
    };
  }
  const { sent, failed } = n;
  if (sent > 0 && failed === 0) {
    return {
      text: t("notify.ownerEmailSent", { count: sent }),
      tone: "ok",
    };
  }
  if (sent === 0 && failed > 0) {
    return {
      text: t("notify.ownerEmailFailed"),
      tone: "bad",
    };
  }
  if (sent > 0 && failed > 0) {
    return {
      text: t("notify.ownerEmailMixed", { sent, total: sent + failed }),
      tone: "warn",
    };
  }
  return { text: t("notify.ownerEmailSaved"), tone: "ok" };
}

export function describeOwnerSmsNotify(n: OwnerSmsNotify, t: TFunction): string | null {
  if (!n.configured) return null;
  return n.ok ? t("notify.smsSent") : t("notify.smsNotSent");
}

/** Confirmation email row on the Register success screen */
export function registrantEmailUi(n: RegistrantEmailStatus, t: TFunction): { text: string; tone: "ok" | "warn" } | null {
  if (n.sent) {
    return {
      text: t("notify.registrantSent"),
      tone: "ok",
    };
  }
  if (n.reason === "failed") {
    return {
      text: t("notify.registrantFailed"),
      tone: "warn",
    };
  }
  return null;
}
