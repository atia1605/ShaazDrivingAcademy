import { useState } from "react";
import type { FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { postJson } from "../../api";
import type { OwnerEmailNotify } from "../../ownerNotifyStatus";
import { describeOwnerEmailNotify } from "../../ownerNotifyStatus";
import { TikTokIcon } from "../TikTokIcon";
import { SITE, SITE_PHONE_LIST } from "../../site";

const mailtoBody = (name: string, email: string, message: string) =>
  `Name: ${name}\nEmail: ${email}\n\n${message}`;

export function Contact() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [errMsg, setErrMsg] = useState("");
  const [notifyEmail, setNotifyEmail] = useState<{ text: string; tone: "ok" | "warn" | "bad" } | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrMsg("");
    setNotifyEmail(null);
    try {
      const data = await postJson<{ message: string; ownerEmailNotify: OwnerEmailNotify }>("/api/contact", {
        name,
        email,
        message,
      });
      setNotifyEmail(describeOwnerEmailNotify(data.ownerEmailNotify, t));
      setStatus("ok");
      setName("");
      setEmail("");
      setMessage("");
    } catch (e) {
      setStatus("err");
      setErrMsg(e instanceof Error ? e.message : t("notify.genericErr"));
    }
  }

  const mailtoHref = `mailto:${SITE.email}?subject=${encodeURIComponent(
    `${t("content.contactPage.mailtoSubject")} — ${SITE.name}`,
  )}&body=${encodeURIComponent(mailtoBody(name || "…", email || "…", message || "…"))}`;

  return (
    <section id="contact" className="section section-alt section-contact">
      <div className="container">
        <div className="section-head">
          <h2>{t("content.contactPage.h2")}</h2>
          <p className="section-intro">
            {t("content.contactPage.intro", { area: SITE.serviceArea })}{" "}
            {t("contact.offerLanguages")} <strong>{t("site.languagesDisplay")}</strong>.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-methods">
            <a href={`mailto:${SITE.email}`} className="contact-card">
              <span className="contact-card-label">{t("content.contactPage.email")}</span>
              <span className="contact-card-value">{SITE.email}</span>
              <span className="contact-card-hint">{t("content.contactPage.tapMail")}</span>
            </a>
            {SITE_PHONE_LIST.map((p) => (
              <a key={p.tel} href={`tel:${p.tel}`} className="contact-card">
                <span className="contact-card-label">{p.contactName}</span>
                <span className="contact-card-value">{p.display}</span>
                <span className="contact-card-hint">{t("content.contactPage.tapCall")}</span>
              </a>
            ))}
            <a href={SITE.tiktok.url} className="contact-card contact-card-tiktok" target="_blank" rel="noopener noreferrer">
              <span className="contact-card-label">{t("content.contactPage.followTiktok")}</span>
              <span className="contact-card-value contact-card-tiktok-value">
                <TikTokIcon className="contact-card-tiktok-icon" />
                TikTok {SITE.tiktok.handle}
              </span>
              <span className="contact-card-hint">{t("content.contactPage.opensTiktok")}</span>
            </a>
          </div>

          <div className="contact-form-wrap card">
            <h3 className="contact-form-title">{t("content.contactPage.formTitle")}</h3>
            <p className="small muted">{t("content.contactPage.formSub")}</p>
            <form className="form" onSubmit={onSubmit}>
              <label className="field">
                <span>{t("content.contactPage.name")}</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  maxLength={200}
                  autoComplete="name"
                />
              </label>
              <label className="field">
                <span>{t("content.contactPage.email")}</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  maxLength={320}
                  autoComplete="email"
                />
              </label>
              <label className="field">
                <span>{t("content.contactPage.message")}</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  maxLength={8000}
                />
              </label>
              {status === "ok" && (
                <>
                  <p className="form-success">{t("content.contactPage.sent")}</p>
                  {notifyEmail && (
                    <div
                      className={`notify-api-status notify-api-status--${notifyEmail.tone}`}
                      role="status"
                      aria-live="polite"
                    >
                      <strong style={{ display: "block", marginBottom: "0.25rem" }}>
                        {t("content.contactPage.staffEmail")}
                      </strong>
                      {notifyEmail.text}
                    </div>
                  )}
                </>
              )}
              {status === "err" && (
                <div className="callout callout-warn">
                  <p className="form-error" style={{ margin: 0 }}>
                    {errMsg}
                  </p>
                  <p className="small muted" style={{ marginTop: "0.5rem" }}>
                    {t("content.contactPage.errReach")}
                  </p>
                  <a className="btn btn-primary btn-sm" href={mailtoHref}>
                    {t("content.contactPage.openDraft")}
                  </a>
                </div>
              )}
              <button type="submit" className="btn btn-primary" disabled={status === "loading"}>
                {status === "loading" ? t("content.contactPage.sending") : t("content.contactPage.send")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
