import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { SITE } from "../../site";

type Tone = "green" | "purple" | "orange";
type Row = { topic: string; grade: string; tone: Tone };
type Slide = { title: string; meta: string; rows: Row[]; notes: string };

export function LessonReportCarousel() {
  const { t } = useTranslation();
  const lessonReportSlides = t("content.lessonReportSlides", { returnObjects: true }) as Slide[];

  const [index, setIndex] = useState(0);
  const n = lessonReportSlides.length;
  const touchStartX = useRef<number | null>(null);

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + n) % n);
    },
    [n],
  );

  const slide = lessonReportSlides[index];

  return (
    <section className="section lesson-report-section" aria-labelledby="lesson-report-heading">
      <div className="container">
        <h2 id="lesson-report-heading">{t("content.lessonReport.h2")}</h2>
        <p
          className="section-intro lesson-report-intro"
          dangerouslySetInnerHTML={{ __html: t("content.lessonReport.intro") }}
        />

        <div
          className="lesson-report-carousel"
          role="group"
          aria-roledescription="carousel"
          aria-label={t("content.lessonReport.carouselLabel")}
        >
          <button
            type="button"
            className="carousel-arrow carousel-arrow--prev"
            aria-label={t("content.lessonReport.prev")}
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
            <article className="lesson-report-card" key={index} aria-live="polite" aria-atomic="true">
              <div className="lesson-report-card-banner">{SITE.name}</div>
              <div className="lesson-report-card-body">
                <h3 className="lesson-report-card-title">{slide.title}</h3>
                <p className="lesson-report-card-meta">{slide.meta}</p>
                <div className="lesson-report-table" role="table" aria-label={t("content.lessonReport.scoreAriaTable")}>
                  <div className="lesson-report-row lesson-report-row--head" role="row">
                    <span role="columnheader">{t("content.lessonReport.topic")}</span>
                    <span role="columnheader">{t("content.lessonReport.score")}</span>
                  </div>
                  {slide.rows.map((row) => (
                    <div key={row.topic} className="lesson-report-row" role="row">
                      <span role="cell">{row.topic}</span>
                      <span role="cell">
                        <span
                          className={`lesson-grade lesson-grade--${row.tone}`}
                          aria-label={t("content.lessonReport.scoreAria", { grade: row.grade })}
                        >
                          {row.grade}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="lesson-report-notes">
                  <strong>{t("content.lessonReport.notes")}</strong>
                  <p>{slide.notes}</p>
                </div>
              </div>
            </article>
          </div>

          <button
            type="button"
            className="carousel-arrow carousel-arrow--next"
            aria-label={t("content.lessonReport.next")}
            onClick={() => go(1)}
          >
            <span aria-hidden>›</span>
          </button>
        </div>

        <div className="carousel-dots" role="tablist" aria-label={t("content.lessonReport.dots")}>
          {lessonReportSlides.map((s, i) => (
            <button
              key={s.title}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={t("content.lessonReport.slideOf", { n: i + 1, total: n })}
              className={`carousel-dot${i === index ? " is-active" : ""}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
