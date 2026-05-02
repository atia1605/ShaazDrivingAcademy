import { useState } from "react";
import type { FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { postJson } from "../api";
import { usePageSeo } from "../hooks/usePageSeo";
import type { OwnerEmailNotify, OwnerSmsNotify, RegistrantEmailStatus } from "../ownerNotifyStatus";
import { describeOwnerEmailNotify, describeOwnerSmsNotify, registrantEmailUi } from "../ownerNotifyStatus";
import { SITE } from "../site";

type RegisterResponse = {
  message: string;
  id: string;
  ownerEmailNotify: OwnerEmailNotify;
  ownerSmsNotify: OwnerSmsNotify;
  registrantEmail: RegistrantEmailStatus;
};

type CourseOpt = { value: string; label: string };

export function Register() {
  const { t } = useTranslation();
  usePageSeo({
    title: t("meta.register", { brand: SITE.name }),
    description: t("metaDesc.register"),
  });

  const courseTypes = t("content.courseTypes", { returnObjects: true }) as CourseOpt[];

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [courseType, setCourseType] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [errMsg, setErrMsg] = useState("");
  const [notifyEmail, setNotifyEmail] = useState<{ text: string; tone: "ok" | "warn" | "bad" } | null>(null);
  const [notifySms, setNotifySms] = useState<string | null>(null);
  const [registrantNote, setRegistrantNote] = useState<{ text: string; tone: "ok" | "warn" } | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrMsg("");
    setNotifyEmail(null);
    setNotifySms(null);
    setRegistrantNote(null);
    try {
      const data = await postJson<RegisterResponse>("/api/register-interest", {
        fullName,
        email,
        phone: phone || undefined,
        courseType: courseType || undefined,
        notes: notes || undefined,
      });
      setNotifyEmail(describeOwnerEmailNotify(data.ownerEmailNotify, t));
      const sms = describeOwnerSmsNotify(data.ownerSmsNotify, t);
      setNotifySms(sms);
      setRegistrantNote(registrantEmailUi(data.registrantEmail, t));
      setStatus("ok");
      setFullName("");
      setEmail("");
      setPhone("");
      setCourseType("");
      setNotes("");
    } catch (err) {
      setStatus("err");
      setErrMsg(err instanceof Error ? err.message : t("notify.genericErr"));
    }
  }

  return (
    <div className="page-register-wrap">
      <section className="register-hero">
        <div className="container">
          <p className="breadcrumb">
            <Link to="/">{t("breadcrumb.home")}</Link> / {t("content.registerPage.breadcrumb")}
          </p>
          <h1>{t("content.registerPage.h1")}</h1>
          <p className="lead register-lead">
            {t("content.registerPage.leadStart")}{" "}
            <Link to="/pay">{t("content.registerPage.leadPay")}</Link> {t("content.registerPage.leadMid")}{" "}
            <a href={`tel:${SITE.phonePrimary.tel}`}>{SITE.phonePrimary.display}</a> {t("content.registerPage.leadEnd")}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <div className="card register-card">
            <form className="form register-form" onSubmit={onSubmit}>
              <label className="field">
                <span>{t("content.registerPage.fullName")}</span>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  maxLength={200}
                  autoComplete="name"
                />
              </label>
              <label className="field">
                <span>{t("content.registerPage.email")}</span>
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
                <span>{t("content.registerPage.phone")}</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={40}
                  autoComplete="tel"
                />
              </label>
              <label className="field">
                <span>{t("content.registerPage.courseInterest")}</span>
                <select value={courseType} onChange={(e) => setCourseType(e.target.value)}>
                  {courseTypes.map((o) => (
                    <option key={o.value || "empty"} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>{t("content.registerPage.notes")}</span>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} maxLength={4000} />
              </label>
              {status === "ok" && (
                <>
                  <p className="form-success">{t("content.registerPage.success")}</p>
                  {registrantNote && (
                    <div
                      className={`notify-api-status notify-api-status--${registrantNote.tone}`}
                      role="status"
                      aria-live="polite"
                    >
                      <strong style={{ display: "block", marginBottom: "0.25rem" }}>
                        {t("content.registerPage.confirmationEmail")}
                      </strong>
                      {registrantNote.text}
                    </div>
                  )}
                  {notifyEmail && (
                    <div
                      className={`notify-api-status notify-api-status--${notifyEmail.tone}`}
                      role="status"
                      aria-live="polite"
                    >
                      <strong style={{ display: "block", marginBottom: "0.25rem" }}>
                        {t("content.registerPage.staffEmail")}
                      </strong>
                      {notifyEmail.text}
                    </div>
                  )}
                  {notifySms && (
                    <p className="small muted" style={{ marginTop: "0.5rem" }} role="status">
                      {notifySms}
                    </p>
                  )}
                </>
              )}
              {status === "err" && (
                <div className="callout callout-warn">
                  <p className="form-error" style={{ margin: 0 }}>
                    {errMsg}
                  </p>
                  <p className="small muted" style={{ marginTop: "0.5rem" }}>
                    {t("content.registerPage.errHelpIntro")}{" "}
                    <a href={`tel:${SITE.phonePrimary.tel}`}>{SITE.phonePrimary.display}</a>{" "}
                    {t("content.registerPage.errHelpOr")}{" "}
                    <a href={`mailto:${SITE.email}`}>{SITE.email}</a> {t("content.registerPage.errHelpEnd")}
                  </p>
                </div>
              )}
              <div className="form-actions">
                <button type="submit" className="btn btn-primary btn-lg" disabled={status === "loading"}>
                  {status === "loading" ? t("content.registerPage.submitting") : t("content.registerPage.submit")}
                </button>
                <Link to="/" className="btn btn-ghost">
                  {t("content.registerPage.backHome")}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
