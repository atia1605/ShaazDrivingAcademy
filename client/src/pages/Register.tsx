import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { postJson } from "../api";
import { courseTypes } from "../data/content";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { SITE } from "../site";

export function Register() {
  useDocumentTitle("Register for Driving Lessons | Shaaz Driving Academy Toronto & Scarborough");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [courseType, setCourseType] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [errMsg, setErrMsg] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrMsg("");
    try {
      await postJson<{ message: string }>("/api/register-interest", {
        fullName,
        email,
        phone: phone || undefined,
        courseType: courseType || undefined,
        notes: notes || undefined,
      });
      setStatus("ok");
      setFullName("");
      setEmail("");
      setPhone("");
      setCourseType("");
      setNotes("");
    } catch (e) {
      setStatus("err");
      setErrMsg(e instanceof Error ? e.message : "Something went wrong.");
    }
  }

  return (
    <div className="page-register-wrap">
      <section className="register-hero">
        <div className="container">
          <p className="breadcrumb">
            <Link to="/">Home</Link> / Register
          </p>
          <h1>Register online</h1>
          <p className="lead register-lead">
            Tell us what you need — we will follow up with scheduling and next steps. Need to pay a deposit?{" "}
            <Link to="/pay">Pay online</Link> after you submit, or call{" "}
            <a href={`tel:${SITE.phonePrimary.tel}`}>{SITE.phonePrimary.display}</a> anytime.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <div className="card register-card">
            <form className="form register-form" onSubmit={onSubmit}>
              <label className="field">
                <span>Full name</span>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  maxLength={200}
                  autoComplete="name"
                />
              </label>
              <label className="field">
                <span>Email</span>
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
                <span>Phone (optional)</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={40}
                  autoComplete="tel"
                />
              </label>
              <label className="field">
                <span>Course interest</span>
                <select value={courseType} onChange={(e) => setCourseType(e.target.value)}>
                  {courseTypes.map((o) => (
                    <option key={o.value || "empty"} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>Notes (optional)</span>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} maxLength={4000} />
              </label>
              {status === "ok" && (
                <p className="form-success">Thanks — your request was received. We will contact you soon.</p>
              )}
              {status === "err" && (
                <div className="callout callout-warn">
                  <p className="form-error" style={{ margin: 0 }}>
                    {errMsg}
                  </p>
                  <p className="small muted" style={{ marginTop: "0.5rem" }}>
                    Call <a href={`tel:${SITE.phonePrimary.tel}`}>{SITE.phonePrimary.display}</a> or email{" "}
                    <a href={`mailto:${SITE.email}`}>{SITE.email}</a> and we will help you register.
                  </p>
                </div>
              )}
              <div className="form-actions">
                <button type="submit" className="btn btn-primary btn-lg" disabled={status === "loading"}>
                  {status === "loading" ? "Submitting…" : "Submit registration"}
                </button>
                <Link to="/" className="btn btn-ghost">
                  Back to home
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
