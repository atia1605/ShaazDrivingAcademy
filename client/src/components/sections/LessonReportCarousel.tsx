import { useCallback, useRef, useState } from "react";
import { lessonReportSlides } from "../../data/homeShowcase";
import { SITE } from "../../site";

export function LessonReportCarousel() {
  const [index, setIndex] = useState(0);
  const n = lessonReportSlides.length;
  const touchStartX = useRef<number | null>(null);

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + n) % n);
    },
    [n]
  );

  const slide = lessonReportSlides[index];

  return (
    <section className="section lesson-report-section" aria-labelledby="lesson-report-heading">
      <div className="container">
        <h2 id="lesson-report-heading">Track progress like a pro</h2>
        <p className="section-intro lesson-report-intro">
          See how we structure feedback after lessons — clear topics, simple scores, and next steps. The cards below are{" "}
          <strong>samples only</strong>; your real report may look different. Use the arrows or dots to browse slides.
        </p>

        <div
          className="lesson-report-carousel"
          role="group"
          aria-roledescription="carousel"
          aria-label="Sample lesson report slides"
        >
          <button
            type="button"
            className="carousel-arrow carousel-arrow--prev"
            aria-label="Previous slide"
            onClick={() => go(-1)}
          >
            <span aria-hidden>‹</span>
          </button>

          <div
            className="lesson-report-card-wrap"
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
            <article
              className="lesson-report-card"
              key={index}
              aria-live="polite"
              aria-atomic="true"
            >
              <div className="lesson-report-card-banner">{SITE.name}</div>
              <div className="lesson-report-card-body">
                <h3 className="lesson-report-card-title">{slide.title}</h3>
                <p className="lesson-report-card-meta">{slide.meta}</p>
                <div className="lesson-report-table" role="table" aria-label="Topic scores">
                  <div className="lesson-report-row lesson-report-row--head" role="row">
                    <span role="columnheader">Topic</span>
                    <span role="columnheader">Score</span>
                  </div>
                  {slide.rows.map((row) => (
                    <div key={row.topic} className="lesson-report-row" role="row">
                      <span role="cell">{row.topic}</span>
                      <span role="cell">
                        <span className={`lesson-grade lesson-grade--${row.tone}`} aria-label={`Score ${row.grade}`}>
                          {row.grade}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="lesson-report-notes">
                  <strong>Notes</strong>
                  <p>{slide.notes}</p>
                </div>
              </div>
            </article>
          </div>

          <button
            type="button"
            className="carousel-arrow carousel-arrow--next"
            aria-label="Next slide"
            onClick={() => go(1)}
          >
            <span aria-hidden>›</span>
          </button>
        </div>

        <div className="carousel-dots" role="tablist" aria-label="Report slides">
          {lessonReportSlides.map((_, i) => (
            <button
              key={lessonReportSlides[i].title}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Slide ${i + 1} of ${n}`}
              className={`carousel-dot${i === index ? " is-active" : ""}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
