import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { testimonials } from "../../data/content";
import { SITE } from "../../site";

const EXCERPT_MAX = 132;
const SCROLL_SPEED_PX = 0.42;
const GAP_REM = 1;

function cleanQuote(q: string) {
  return q.trim().replace(/^["'""]+|["'""]+$/g, "");
}

function excerptForMarquee(quote: string) {
  const t = cleanQuote(quote);
  if (t.length <= EXCERPT_MAX) return t;
  return `${t.slice(0, EXCERPT_MAX).trimEnd()}…`;
}

function initialsFromAuthor(author: string) {
  const parts = author.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    const a = parts[0]!.charAt(0);
    const b = parts[parts.length - 1]!.charAt(0);
    return `${a}${b}`.toUpperCase();
  }
  return author.slice(0, 2).toUpperCase();
}

function hueFromAuthor(author: string) {
  let n = 0;
  for (let i = 0; i < author.length; i++) {
    n = (n + author.charCodeAt(i) * (i + 5)) % 360;
  }
  return n;
}

function StarRow() {
  return (
    <span className="testimonial-float-stars" aria-label="Rated 5 out of 5">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className="testimonial-float-star" aria-hidden>
          ★
        </span>
      ))}
    </span>
  );
}

function TestimonialFloatCard({ author, quote, avatarSrc }: { author: string; quote: string; avatarSrc?: string }) {
  const h = hueFromAuthor(author);
  const h2 = (h + 52) % 360;
  return (
    <article className="testimonial-float-card" lang="en">
      <div className="testimonial-float-card-inner">
        <div className="testimonial-float-avatar-wrap" aria-hidden="true">
          {avatarSrc ? (
            <img className="testimonial-float-avatar-img" src={avatarSrc} alt="" width={44} height={44} loading="lazy" />
          ) : (
            <div
              className="testimonial-float-avatar"
              style={{
                background: `linear-gradient(145deg, hsl(${h} 54% 36%) 0%, hsl(${h2} 46% 26%) 100%)`,
              }}
            >
              <span className="testimonial-float-avatar-text">{initialsFromAuthor(author)}</span>
            </div>
          )}
        </div>
        <div className="testimonial-float-body">
          <StarRow />
          <p className="testimonial-float-quote">“{excerptForMarquee(quote)}”</p>
          <footer className="testimonial-float-footer">
            <cite className="testimonial-float-author">{author}</cite>
            <span className="testimonial-float-badge">Google review</span>
          </footer>
        </div>
      </div>
    </article>
  );
}

export function Testimonials() {
  const loop = useMemo(() => [...testimonials, ...testimonials], []);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const halfRef = useRef(0);
  const cardStepRef = useRef(300);
  const hoverPauseRef = useRef(false);
  const arrowPauseRef = useRef(false);
  const rafRef = useRef(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [trackReady, setTrackReady] = useState(false);

  const measure = useCallback(() => {
    const tr = trackRef.current;
    if (!tr) return;
    const half = tr.scrollWidth / 2;
    halfRef.current = half;
    const card = tr.querySelector(".testimonial-float-card") as HTMLElement | null;
    if (card) {
      const gapPx =
        typeof window !== "undefined"
          ? parseFloat(getComputedStyle(document.documentElement).fontSize || "16") * GAP_REM
          : 16;
      cardStepRef.current = card.offsetWidth + gapPx;
    }
    if (half > 0) {
      while (offsetRef.current <= -half) offsetRef.current += half;
      while (offsetRef.current > 0) offsetRef.current -= half;
      tr.style.transform = `translateX(${offsetRef.current}px)`;
    }
    setTrackReady(half > 0);
  }, []);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion && trackRef.current) {
      trackRef.current.style.transform = "";
      offsetRef.current = 0;
    }
  }, [reduceMotion]);

  useLayoutEffect(() => {
    const tr = trackRef.current;
    if (!tr) return;
    measure();
    const ro = new ResizeObserver(() => measure());
    ro.observe(tr);
    return () => ro.disconnect();
  }, [measure]);

  const applyTransform = useCallback(() => {
    const tr = trackRef.current;
    if (!tr) return;
    tr.style.transform = `translateX(${offsetRef.current}px)`;
  }, []);

  const normalizeOffset = useCallback(() => {
    const h = halfRef.current;
    if (h <= 0) return;
    while (offsetRef.current <= -h) offsetRef.current += h;
    while (offsetRef.current > 0) offsetRef.current -= h;
  }, []);

  useEffect(() => {
    if (reduceMotion || !trackReady) return;

    const tick = () => {
      const h = halfRef.current;
      if (h > 0 && !hoverPauseRef.current && !arrowPauseRef.current) {
        offsetRef.current -= SCROLL_SPEED_PX;
        if (offsetRef.current <= -h) {
          offsetRef.current += h;
        }
      }
      applyTransform();
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reduceMotion, trackReady, applyTransform]);

  const nudge = useCallback(
    (dir: -1 | 1) => {
      arrowPauseRef.current = true;
      offsetRef.current += dir * cardStepRef.current;
      normalizeOffset();
      applyTransform();
      window.setTimeout(() => {
        arrowPauseRef.current = false;
      }, 2800);
    },
    [applyTransform, normalizeOffset]
  );

  return (
    <section id="testimonials" className="section section-alt">
      <div className="container">
        <h2>What students say</h2>
        <p className="section-intro testimonials-intro">
          We are proud of the relationships we build with students and families. Below are featured quotes — including
          several transcribed from public Google Maps reviews — see more on{" "}
          <a href={SITE.googleMapsListingUrl} target="_blank" rel="noopener noreferrer">
            Google Maps
          </a>{" "}
          or{" "}
          <a href={SITE.googleReviewsSearchUrl} target="_blank" rel="noopener noreferrer">
            Google Search (reviews)
          </a>
          .
        </p>

        <div className="testimonials-marquee-row">
          {!reduceMotion && (
            <button
              type="button"
              className="carousel-arrow carousel-arrow--prev testimonials-marquee-arrow"
              aria-label="Show previous reviews"
              onClick={() => nudge(1)}
            >
              <span aria-hidden>‹</span>
            </button>
          )}

          <div
            className="testimonials-marquee-shell"
            tabIndex={0}
            aria-label="Student reviews, auto-scrolling. Pause by hovering or focusing here."
            onMouseEnter={() => {
              hoverPauseRef.current = true;
            }}
            onMouseLeave={() => {
              hoverPauseRef.current = false;
            }}
            onFocus={() => {
              hoverPauseRef.current = true;
            }}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                hoverPauseRef.current = false;
              }
            }}
          >
            <div
              ref={trackRef}
              className={`testimonials-marquee-track${reduceMotion ? "" : " testimonials-marquee-track--js"}`}
            >
              {loop.map((t, i) => (
                <TestimonialFloatCard key={`${t.author}-${i}`} author={t.author} quote={t.quote} avatarSrc={t.avatarSrc} />
              ))}
            </div>
          </div>

          {!reduceMotion && (
            <button
              type="button"
              className="carousel-arrow carousel-arrow--next testimonials-marquee-arrow"
              aria-label="Show next reviews"
              onClick={() => nudge(-1)}
            >
              <span aria-hidden>›</span>
            </button>
          )}
        </div>

        <p className="testimonials-marquee-foot testimonials-marquee-foot-btns">
          <a className="btn btn-ghost btn-sm" href={SITE.googleMapsListingUrl} target="_blank" rel="noopener noreferrer">
            Open on Google Maps
          </a>
          <a
            className="btn btn-ghost btn-sm"
            href={SITE.googleReviewsSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Google Search
          </a>
        </p>
      </div>
    </section>
  );
}
