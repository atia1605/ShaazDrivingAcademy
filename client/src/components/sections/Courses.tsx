import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { IconBook, IconCar, IconGlobe, IconHeart, IconMonitor } from "../NavIcons";
import { SITE } from "../../site";

const classroomIcons = [IconBook, IconCar, IconMonitor] as const;

type BdePackage = {
  title: string;
  beforePrice: string;
  studentPrice: string;
  instructorPrice: string;
  items: string[];
};
type Pkg = { id: string; label: string; price: string };
type ClassroomMode = { title: string; lead: string; bullets: string[] };
type Pillar = { intro: string; highlights: string[]; closing: string };

export function Courses() {
  const { t } = useTranslation();
  const bdePackages = t("content.bdePackages", { returnObjects: true }) as BdePackage[];
  const g1g2Packages = t("content.g1g2Packages", { returnObjects: true }) as Pkg[];
  const g2gPackages = t("content.g2gPackages", { returnObjects: true }) as Pkg[];
  const classroomModes = t("content.classroomModes", { returnObjects: true }) as ClassroomMode[];
  const seniorCoursesContent = t("content.seniorCourses", { returnObjects: true }) as Pillar;
  const immigrantCoursesContent = t("content.immigrantCourses", { returnObjects: true }) as Pillar;

  return (
    <section id="courses" className="section">
      <div className="container">
        <h2>{t("content.coursesUi.h2")}</h2>
        <p className="section-intro">{t("content.coursesUi.intro")}</p>

        <div className="grid-3" id="certification-courses">
          {bdePackages.map((pkg) => (
            <article key={pkg.title} className="card course-card">
              <h3>{pkg.title}</h3>
              <div className="bde-package-pricing">
                <p className="bde-price-was">
                  <span className="bde-was-label">{t("content.coursesUi.bdeWas")}</span>{" "}
                  <del>{pkg.beforePrice}</del>
                </p>
                <div className="bde-price-tier">
                  <span className="bde-price-amount">{pkg.studentPrice}</span>
                  <span className="bde-price-tier-label">{t("content.coursesUi.bdePickupStudent")}</span>
                </div>
                <div className="bde-price-tier">
                  <span className="bde-price-amount">{pkg.instructorPrice}</span>
                  <span className="bde-price-tier-label">{t("content.coursesUi.bdePickupInstructor")}</span>
                </div>
              </div>
              <ul>
                {pkg.items.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className="muted small">{t("content.coursesUi.taxNote")}</p>
            </article>
          ))}
        </div>

        <h3 id="individual-lessons" className="subsection-title">
          {t("content.coursesUi.individualH3")}
        </h3>
        <p className="lesson-price-note">
          <strong>{t("content.coursesUi.negotiable")}</strong> {t("content.coursesUi.callDiscuss")}{" "}
          <a href={`tel:${SITE.phonePrimary.tel}`}>{SITE.phonePrimary.display}</a> {t("content.coursesUi.optionsEnd")}
        </p>
        <div className="two-col">
          <div className="col">
            <h4>{t("content.coursesUi.g1g2")}</h4>
            <div className="package-list">
              {g1g2Packages.map((p) => (
                <div key={p.id} className="package-row" id={p.id}>
                  <div>
                    <span className="package-label">{p.label}</span>
                    <span className="package-price">{p.price}</span>
                  </div>
                  <Link to="/register" className="btn btn-sm btn-primary">
                    {t("content.coursesUi.bookInquire")}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="col col-muted">
            <h4>{t("content.coursesUi.g2g")}</h4>
            <div className="package-list">
              {g2gPackages.map((p) => (
                <div key={p.id} className="package-row" id={p.id}>
                  <div>
                    <span className="package-label">{p.label}</span>
                    <span className="package-price">{p.price}</span>
                  </div>
                  <Link to="/register" className="btn btn-sm btn-primary">
                    {t("content.coursesUi.bookInquire")}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <h3 id="classroom-training" className="subsection-title">
          {t("content.coursesUi.classroomH3")}
        </h3>
        <p className="course-subsection-lead">{t("content.coursesUi.classroomLead")}</p>
        <div className="course-feature-grid">
          {classroomModes.map((mode, i) => {
            const Icon = classroomIcons[i];
            return (
              <article key={mode.title} className="course-feature-card">
                <div className="course-feature-icon" aria-hidden>
                  <Icon />
                </div>
                <h4>{mode.title}</h4>
                <p className="course-feature-lead">{mode.lead}</p>
                <ul className="course-feature-bullets">
                  {mode.bullets.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <div className="course-pillar-band course-pillar-band--seniors" id="senior-courses">
          <h3 className="subsection-title course-pillar-title">
            <span className="course-pillar-title-icon" aria-hidden>
              <IconHeart />
            </span>
            {t("content.coursesUi.seniorsH3")}
          </h3>
          <div className="course-split">
            <div className="course-pillar-intro">
              <p className="course-pillar-badge">{t("content.coursesUi.seniorsBadge")}</p>
              <p>{seniorCoursesContent.intro}</p>
              <p className="course-pillar-closing muted">{seniorCoursesContent.closing}</p>
              <div className="course-pillar-cta">
                <Link to="/register" className="btn btn-sm btn-primary">
                  {t("content.coursesUi.seniorsRegister")}
                </Link>
                <a href={`tel:${SITE.phonePrimary.tel}`} className="btn btn-sm btn-outline">
                  {t("content.coursesUi.seniorsCall")} {SITE.phonePrimary.display}
                </a>
              </div>
            </div>
            <ul className="course-check-list" aria-label={t("content.coursesUi.seniorsAria")}>
              {seniorCoursesContent.highlights.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="course-pillar-band course-pillar-band--immigrants" id="immigrant-courses">
          <h3 className="subsection-title course-pillar-title">
            <span className="course-pillar-title-icon" aria-hidden>
              <IconGlobe />
            </span>
            {t("content.coursesUi.immigrantsH3")}
          </h3>
          <div className="course-split">
            <div className="course-pillar-intro">
              <p className="course-pillar-badge course-pillar-badge--accent">{t("content.coursesUi.immigrantsBadge")}</p>
              <p>{immigrantCoursesContent.intro}</p>
              <p className="course-pillar-closing muted">{immigrantCoursesContent.closing}</p>
              <div className="course-pillar-cta">
                <Link to="/contact" className="btn btn-sm btn-primary">
                  {t("content.coursesUi.immigrantsContact")}
                </Link>
                <a href={`mailto:${SITE.email}`} className="btn btn-sm btn-outline">
                  {t("content.coursesUi.immigrantsEmail")} {SITE.email}
                </a>
              </div>
            </div>
            <ul className="course-check-list" aria-label={t("content.coursesUi.immigrantsAria")}>
              {immigrantCoursesContent.highlights.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
