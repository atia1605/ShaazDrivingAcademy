import { useCallback, useEffect, useId, useRef, useState } from "react";
import { WEB_DESIGNER } from "../site";

export function WebDesignerCredit() {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const openBtnRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => openBtnRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <p className="footer-web-credit">
        <button
          ref={openBtnRef}
          type="button"
          className="footer-web-credit-btn"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={open ? "web-designer-dialog" : undefined}
          onClick={() => setOpen(true)}
        >
          Website by {WEB_DESIGNER.name} — tap for details
        </button>
      </p>

      {open ? (
        <div
          className="web-designer-modal-root"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            id="web-designer-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="web-designer-modal"
          >
            <div className="web-designer-modal-head">
              <h2 id={titleId} className="web-designer-modal-title">
                Web designer
              </h2>
              <button ref={closeRef} type="button" className="web-designer-modal-close" onClick={close} aria-label="Close">
                ×
              </button>
            </div>
            <div className="web-designer-modal-body">
              <p className="web-designer-modal-name">{WEB_DESIGNER.name}</p>
              <p className="web-designer-modal-role">{WEB_DESIGNER.role}</p>
              <p className="web-designer-modal-summary">{WEB_DESIGNER.summary}</p>
              <p className="web-designer-modal-email">
                <a href={`mailto:${WEB_DESIGNER.email}`}>{WEB_DESIGNER.email}</a>
              </p>
              <p className="web-designer-modal-phone">
                <a href={`tel:${WEB_DESIGNER.phone.tel}`}>{WEB_DESIGNER.phone.display}</a>
              </p>
            </div>
            <div className="web-designer-modal-foot">
              <button type="button" className="btn btn-ghost web-designer-modal-done" onClick={close}>
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
