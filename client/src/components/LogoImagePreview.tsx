import { useCallback, useEffect, useId, useRef, useState } from "react";
import { SITE, SITE_LOGO_SRC } from "../site";

type Props = {
  imgClassName: string;
  width: number;
  height: number;
  triggerClassName?: string;
};

export function LogoImagePreview({ imgClassName, width, height, triggerClassName }: Props) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const dialogId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
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
      <button
        ref={triggerRef}
        type="button"
        className={`logo-preview-trigger${triggerClassName ? ` ${triggerClassName}` : ""}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? dialogId : undefined}
        onClick={() => setOpen(true)}
      >
        <img
          className={imgClassName}
          src={SITE_LOGO_SRC}
          alt=""
          width={width}
          height={height}
          decoding="async"
          fetchPriority="high"
        />
        <span className="sr-only">View larger logo preview</span>
      </button>

      {open ? (
        <div
          className="logo-preview-backdrop"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            id={dialogId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="logo-preview-dialog"
          >
            <div className="logo-preview-dialog-head">
              <h2 id={titleId} className="logo-preview-dialog-title">
                Logo preview
              </h2>
              <button ref={closeRef} type="button" className="logo-preview-dialog-close" onClick={close} aria-label="Close">
                ×
              </button>
            </div>
            <div className="logo-preview-dialog-body">
              <div className="logo-preview-dialog-ring">
                <img
                  className="logo-preview-dialog-img"
                  src={SITE_LOGO_SRC}
                  alt={`${SITE.name} logo`}
                  width={512}
                  height={512}
                  decoding="async"
                />
              </div>
            </div>
            <div className="logo-preview-dialog-foot">
              <button type="button" className="btn btn-ghost logo-preview-dialog-done" onClick={close}>
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
