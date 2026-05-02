import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { SITE, SITE_PHONE_LIST } from "../site";
import { matchFaqIndex } from "../utils/faqChatMatch";

type LocalFaqItem = { q: string; a?: string; aHtml?: string };

function FaqAnswer({ item }: { item: LocalFaqItem }) {
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

/** English strings sent to `matchFaqIndex` (FAQ corpus is English). Buttons show translated labels from `faqChat.quickPrompts`. */
const QUICK_PROMPTS_EN = [
  "How do I book my road test?",
  "Can I do a course without G1?",
  "I have a driver's licence from another country. How do I apply in Ontario and what tests do I need?",
] as const;

export function FaqChatbot() {
  const { t } = useTranslation();
  const localizedFaqItems = useMemo(
    () => t("content.faqItems", { returnObjects: true }) as LocalFaqItem[],
    [t],
  );
  const quickPromptLabels = useMemo(
    () => t("faqChat.quickPrompts", { returnObjects: true }) as string[],
    [t],
  );
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
    /* Seed welcome bubble when opening — FAQ matching expects messages array updates from user sends */
    window.queueMicrotask(() =>
      setMessages((prev) => (prev.length === 0 ? [{ id: nextId(), role: "bot", kind: "welcome" }] : prev)),
    );
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
      const timer = window.setTimeout(() => inputRef.current?.focus(), 200);
      return () => clearTimeout(timer);
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
        <span className="faq-chat-launcher-label">{t("faqChat.launcher")}</span>
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
                <h2 id="faq-chat-title">{t("faqChat.title")}</h2>
                <p className="faq-chat-sub">{t("faqChat.subtitle")}</p>
              </div>
              <div className="faq-chat-header-actions">
                <button type="button" className="faq-chat-clear" onClick={clearChat}>
                  {t("faqChat.clear")}
                </button>
                <button type="button" className="faq-chat-close" onClick={close} aria-label={t("faqChat.close")}>
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
                        <p className="faq-chat-welcome-text">{t("faqChat.welcome")}</p>
                        <div className="faq-chat-quick-prompts">
                          {QUICK_PROMPTS_EN.map((en, i) => (
                            <button
                              key={en}
                              type="button"
                              className="faq-chat-chip"
                              onClick={() => sendText(en)}
                            >
                              {quickPromptLabels[i] ?? en}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }
                if (m.kind === "faq") {
                  const item = localizedFaqItems[m.faqIndex];
                  if (!item) return null;
                  return (
                    <div key={m.id} className="faq-chat-msg faq-chat-msg--bot">
                      <div className="faq-chat-msg-bubble faq-chat-msg-bubble--bot">
                        <p className="faq-chat-matched-label">{t("faqChat.fromFaq")}</p>
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
                        {t("faqChat.fallback", { name: SITE.name })}
                      </p>
                      <ul className="faq-chat-fallback-list">
                        <li>
                          {t("faqChat.fallbackCall")}{" "}
                          {SITE_PHONE_LIST.map((p, i) => (
                            <span key={p.tel}>
                              {i > 0 ? " · " : ""}
                              <a href={`tel:${p.tel}`}>
                                {p.contactName}: {p.display}
                              </a>
                            </span>
                          ))}
                        </li>
                        <li>
                          {t("faqChat.fallbackEmail")}{" "}
                          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                        </li>
                        <li>
                          {t("faqChat.fallbackVisit")}{" "}
                          <Link to="/faq" onClick={close}>
                            {t("faqChat.faqPage")}
                          </Link>{" "}
                          {t("faqChat.or")}{" "}
                          <Link to="/contact" onClick={close}>
                            {t("faqChat.contactForm")}
                          </Link>
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
                {t("faqChat.inputLabel")}
              </label>
              <input
                id="faq-chat-input-field"
                ref={inputRef}
                type="text"
                className="faq-chat-input"
                placeholder={t("faqChat.placeholder")}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoComplete="off"
              />
              <button type="submit" className="faq-chat-send btn btn-primary btn-sm">
                {t("faqChat.send")}
              </button>
            </form>

            <footer className="faq-chat-footer">
              <Link to="/faq" className="btn btn-sm btn-outline" onClick={close}>
                {t("faqChat.fullFaq")}
              </Link>
              <Link to="/contact" className="btn btn-sm btn-outline" onClick={close}>
                {t("faqChat.contact")}
              </Link>
            </footer>
          </div>
        </div>
      ) : null}
    </>
  );
}
