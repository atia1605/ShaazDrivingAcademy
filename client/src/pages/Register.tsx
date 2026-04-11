import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { postJson } from "../api";
import { courseTypes } from "../data/content";

export function Register() {
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
    <section className="section page-register">
      <div className="container narrow">
        <p className="breadcrumb">
          <Link to="/">Home</Link> / Register
        </p>
        <h1>Register online</h1>
        <p className="lead">
          Tell us how we can help and we will follow up with next steps. For urgent questions, call{" "}
          <a href="tel:6477837582">647-783-7582</a>.
        </p>
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
          {status === "ok" && <p className="form-success">Thanks — your request was received. We will contact you soon.</p>}
          {status === "err" && <p className="form-error">{errMsg}</p>}
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={status === "loading"}>
              {status === "loading" ? "Submitting…" : "Submit"}
            </button>
            <Link to="/" className="btn btn-ghost">
              Back to home
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
