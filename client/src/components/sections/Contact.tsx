import { useState } from "react";
import type { FormEvent } from "react";
import { postJson } from "../../api";
import { SITE, SITE_LANGUAGES_DISPLAY, SITE_PHONE_LIST } from "../../site";

const mailtoBody = (name: string, email: string, message: string) =>
  `Name: ${name}\nEmail: ${email}\n\n${message}`;

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [errMsg, setErrMsg] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrMsg("");
    try {
      await postJson<{ message: string }>("/api/contact", { name, email, message });
      setStatus("ok");
      setName("");
      setEmail("");
      setMessage("");
    } catch (e) {
      setStatus("err");
      setErrMsg(e instanceof Error ? e.message : "Something went wrong.");
    }
  }

  const mailtoHref = `mailto:${SITE.email}?subject=${encodeURIComponent(
    "Message from Shaaz Driving Academy website"
  )}&body=${encodeURIComponent(mailtoBody(name || "…", email || "…", message || "…"))}`;

  return (
    <section id="contact" className="section section-alt section-contact">
      <div className="container">
        <div className="section-head">
          <h2>Contact us</h2>
          <p className="section-intro">
            Send a message online, email us directly, or call — we serve {SITE.serviceArea} from our Danforth location.
            We offer instruction and support in <strong>{SITE_LANGUAGES_DISPLAY}</strong>.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-methods">
            <a href={`mailto:${SITE.email}`} className="contact-card">
              <span className="contact-card-label">Email</span>
              <span className="contact-card-value">{SITE.email}</span>
              <span className="contact-card-hint">Tap to open your mail app</span>
            </a>
            {SITE_PHONE_LIST.map((p) => (
              <a key={p.tel} href={`tel:${p.tel}`} className="contact-card">
                <span className="contact-card-label">{p.contactName}</span>
                <span className="contact-card-value">{p.display}</span>
                <span className="contact-card-hint">Tap to call</span>
              </a>
            ))}
          </div>

          <div className="contact-form-wrap card">
            <h3 className="contact-form-title">Send a message</h3>
            <p className="small muted">We usually reply within one business day.</p>
            <form className="form" onSubmit={onSubmit}>
              <label className="field">
                <span>Name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                <span>Message</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  maxLength={8000}
                />
              </label>
              {status === "ok" && (
                <p className="form-success">Message sent. We will get back to you soon.</p>
              )}
              {status === "err" && (
                <div className="callout callout-warn">
                  <p className="form-error" style={{ margin: 0 }}>
                    {errMsg}
                  </p>
                  <p className="small muted" style={{ marginTop: "0.5rem" }}>
                    You can still reach us by email:
                  </p>
                  <a className="btn btn-primary btn-sm" href={mailtoHref}>
                    Open email draft
                  </a>
                </div>
              )}
              <button type="submit" className="btn btn-primary" disabled={status === "loading"}>
                {status === "loading" ? "Sending…" : "Send message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
