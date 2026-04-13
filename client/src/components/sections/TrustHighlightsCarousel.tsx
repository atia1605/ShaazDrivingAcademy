import { useCallback, useRef, useState } from "react";
import { trustHighlightSlides } from "../../data/homeShowcase";

function LaurelIcon() {
  return (
    <svg className="trust-laurel" viewBox="0 0 140 72" aria-hidden>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        d="M70 58V44M52 52c-8-10-12-22-8-34 4-10 14-14 26-10M88 52c8-10 12-22 8-34-4-10-14-14-26-10M38 46c-14-4-22-16-18-30 3-10 13-16 24-14M102 46c14-4 22-16 18-30-3-10-13-16-24-14M46 40c-10 2-18-4-20-14-2-10 6-18 16-18M94 40c10 2 18-4 20-14 2-10-6-18-16-18"
      />
    </svg>
  );
}

export function TrustHighlightsCarousel() {
  const [index, setIndex] = useState(0);
  const n = trustHighlightSlides.length;
  const touchStartX = useRef<number | null>(null);

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + n) % n);
    },
    [n]
  );

  const slide = trustHighlightSlides[index];

  return (
    <section className="section trust-carousel-section" aria-labelledby="trust-carousel-heading">
      <div className="container trust-carousel-inner">
        <div className="trust-carousel-flag" aria-hidden>
          <span className="trust-flag-emoji">🇨🇦</span>
        </div>
        <h2 id="trust-carousel-heading" className="trust-carousel-title">
          <span className="trust-carousel-title-line">Friendly instructors · step-by-step lessons</span>
          <span className="trust-carousel-title-accent">Shaaz Driving Academy</span>
        </h2>
        <p className="trust-carousel-sub">
          Experienced coaches, hands-on in-car training, and a strong road-test focus — including help picking a
          DriveTest location that fits you. Swipe or tap next to read more.
        </p>
        <div className="trust-carousel-rule" aria-hidden />

        <div
          className="trust-carousel-frame"
          role="group"
          aria-roledescription="carousel"
          aria-label="Trust highlights"
        >
          <button
            type="button"
            className="carousel-arrow carousel-arrow--prev carousel-arrow--on-dark"
            aria-label="Previous highlight"
            onClick={() => go(-1)}
          >
            <span aria-hidden>‹</span>
          </button>

          <div
            className="trust-slide-shell"
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(e) => {
              if (touchStartX.current == null) return;
              const x = e.changedTouches[0]?.clientX ?? touchStartX.current;
              const dx = x - touchStartX.current;
              if (dx < -48) go(1);
              if (dx > 48) go(-1);
              touchStartX.current = null;
            }}
          >
            <div className="trust-slide" key={index} aria-live="polite">
              <div className="trust-badge-visual">
                <LaurelIcon />
                <div className="trust-badge-text">
                  <span className="trust-badge-headline">{slide.headline}</span>
                  <span className="trust-badge-sub">{slide.sub}</span>
                </div>
              </div>
              <p className="trust-badge-source">{slide.source}</p>
            </div>
          </div>

          <button
            type="button"
            className="carousel-arrow carousel-arrow--next carousel-arrow--on-dark"
            aria-label="Next highlight"
            onClick={() => go(1)}
          >
            <span aria-hidden>›</span>
          </button>
        </div>

        <div className="carousel-dots carousel-dots--light" role="tablist" aria-label="Trust highlights">
          {trustHighlightSlides.map((_, i) => (
            <button
              key={trustHighlightSlides[i].headline}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Highlight ${i + 1} of ${n}`}
              className={`carousel-dot${i === index ? " is-active" : ""}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
