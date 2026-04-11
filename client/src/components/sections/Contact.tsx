import { useState } from "react";
import type { FormEvent } from "react";
import { postJson } from "../../api";

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

  return (
    <section id="contact" className="section section-alt">
      <div className="container narrow">
        <h2>Contact us</h2>
        <p className="contact-lines">
          Email: <a href="mailto:shohanchowdhury@hotmail.com">shohanchowdhury@hotmail.com</a>
          <br />
          Phone: <a href="tel:6477837582">647-783-7582</a>, <a href="tel:4166865799">416-686-5799</a>
        </p>
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
          {status === "ok" && <p className="form-success">Message sent. We will get back to you soon.</p>}
          {status === "err" && <p className="form-error">{errMsg}</p>}
          <button type="submit" className="btn btn-primary" disabled={status === "loading"}>
            {status === "loading" ? "Sending…" : "Send message"}
          </button>
        </form>
      </div>
    </section>
  );
}
