import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { faqItems } from "../data/content";
import { SITE } from "../site";
import { matchFaqIndex } from "../utils/faqChatMatch";

function FaqAnswer({ item }: { item: (typeof faqItems)[number] }) {
  if ("aHtml" in item && item.aHtml) {
    return (
      <div
        className="faq-chat-answer-html"
        dangerouslySetInnerHTML={{ __html: item.aHtml }}
      />
    );
  }
  if ("a" in item) {
    return <p className="faq-chat-answer-text">{item.a}</p>;
  }
  return null;
}

type ChatMessage =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "bot"; kind: "welcome" }
  | { id: string; role: "bot"; kind: "faq"; faqIndex: number }
  | { id: string; role: "bot"; kind: "fallback" };

let msgId = 0;
function nextId() {
  msgId += 1;
  return `m-${msgId}`;
}

const QUICK_PROMPTS = [
  "How do I book my road test?",
  "Can I do a course without G1?",
  "I have a driver's licence from another country. How do I apply in Ontario and what tests do I need?",
] as const;

export function FaqChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const listEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setInput("");
    setMessages([]);
  }, []);

  const scrollToBottom = useCallback(() => {
    listEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!open) return;
    setMessages((prev) => (prev.length === 0 ? [{ id: nextId(), role: "bot", kind: "welcome" }] : prev));
  }, [open]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, open, scrollToBottom]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 200);
      return () => clearTimeout(t);
    }
  }, [open]);

  const sendText = useCallback((raw: string) => {
    const text = raw.trim();
    if (!text) return;

    setMessages((prev) => {
      const userMsg: ChatMessage = { id: nextId(), role: "user", text };
      const idx = matchFaqIndex(text);
      const bot: ChatMessage =
        idx !== null
          ? { id: nextId(), role: "bot", kind: "faq", faqIndex: idx }
          : { id: nextId(), role: "bot", kind: "fallback" };
      return [...prev, userMsg, bot];
    });
    setInput("");
  }, []);

  const clearChat = useCallback(() => {
    setMessages([{ id: nextId(), role: "bot", kind: "welcome" }]);
  }, []);

  return (
    <>
      <button
        type="button"
        className={`faq-chat-launcher${open ? " is-hidden" : ""}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="faq-chat-panel"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="faq-chat-launcher-icon" aria-hidden>
          <svg viewBox="0 0 24 24" width="1.35em" height="1.35em" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a4 4 0 0 1-4 4H8l-5 3v-7H4a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h13a4 4 0 0 1 4 4v9z" strokeLinejoin="round" />
            <path d="M8 9h8M8 13h5" strokeLinecap="round" />
          </svg>
        </span>
        <span className="faq-chat-launcher-label">FAQ</span>
      </button>

      {open ? (
        <div
          id="faq-chat-panel"
          className="faq-chat-backdrop"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            className="faq-chat-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="faq-chat-title"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="faq-chat-header">
              <div>
                <h2 id="faq-chat-title">Ask us anything</h2>
                <p className="faq-chat-sub">
                  Type a question below. Replies use our FAQ when there&apos;s a close match — for anything else, reach
                  us by phone or email.
                </p>
              </div>
              <div className="faq-chat-header-actions">
                <button type="button" className="faq-chat-clear" onClick={clearChat}>
                  Clear chat
                </button>
                <button type="button" className="faq-chat-close" onClick={close} aria-label="Close">
                  ×
                </button>
              </div>
            </header>

            <div className="faq-chat-messages" role="log" aria-live="polite" aria-relevant="additions">
              {messages.map((m) => {
                if (m.role === "user") {
                  return (
                    <div key={m.id} className="faq-chat-msg faq-chat-msg--user">
                      <div className="faq-chat-msg-bubble">{m.text}</div>
                    </div>
                  );
                }
                if (m.kind === "welcome") {
                  return (
                    <div key={m.id} className="faq-chat-msg faq-chat-msg--bot">
                      <div className="faq-chat-msg-bubble faq-chat-msg-bubble--bot">
                        <p className="faq-chat-welcome-text">
                          Hi! Ask about road tests, G1, payments, certificates, or lessons. Try the quick prompts below,
                          or type your own question.
                        </p>
                        <div className="faq-chat-quick-prompts">
                          {QUICK_PROMPTS.map((p) => (
                            <button
                              key={p}
                              type="button"
                              className="faq-chat-chip"
                              onClick={() => sendText(p)}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }
                if (m.kind === "faq") {
                  const item = faqItems[m.faqIndex];
                  return (
                    <div key={m.id} className="faq-chat-msg faq-chat-msg--bot">
                      <div className="faq-chat-msg-bubble faq-chat-msg-bubble--bot">
                        <p className="faq-chat-matched-label">From our FAQ</p>
                        <p className="faq-chat-bubble-q">{item.q}</p>
                        <FaqAnswer item={item} />
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={m.id} className="faq-chat-msg faq-chat-msg--bot">
                    <div className="faq-chat-msg-bubble faq-chat-msg-bubble--bot">
                      <p className="faq-chat-fallback-text">
                        I don&apos;t have a specific answer for that in our FAQ yet.{" "}
                        <strong>{SITE.name}</strong> can help directly:
                      </p>
                      <ul className="faq-chat-fallback-list">
                        <li>
                          Call{" "}
                          <a href={`tel:${SITE.phonePrimary.tel}`}>{SITE.phonePrimary.display}</a> or{" "}
                          <a href={`tel:${SITE.phoneSecondary.tel}`}>{SITE.phoneSecondary.display}</a>
                        </li>
                        <li>
                          Email{" "}
                          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                        </li>
                        <li>
                          Visit our <Link to="/faq" onClick={close}>FAQ page</Link> or{" "}
                          <Link to="/contact" onClick={close}>contact form</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })}
              <div ref={listEndRef} />
            </div>

            <form
              className="faq-chat-form"
              onSubmit={(e) => {
                e.preventDefault();
                sendText(input);
              }}
            >
              <label className="sr-only" htmlFor="faq-chat-input-field">
                Type your question
              </label>
              <input
                id="faq-chat-input-field"
                ref={inputRef}
                type="text"
                className="faq-chat-input"
                placeholder="Type your question and press Send…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoComplete="off"
              />
              <button type="submit" className="faq-chat-send btn btn-primary btn-sm">
                Send
              </button>
            </form>

            <footer className="faq-chat-footer">
              <Link to="/faq" className="btn btn-sm btn-outline" onClick={close}>
                Full FAQ page
              </Link>
              <Link to="/contact" className="btn btn-sm btn-outline" onClick={close}>
                Contact
              </Link>
            </footer>
          </div>
        </div>
      ) : null}
    </>
  );
}
