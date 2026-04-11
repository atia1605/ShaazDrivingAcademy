import { Link } from "react-router-dom";
import {
  bdePackages,
  classroomModes,
  g1g2Packages,
  g2gPackages,
  immigrantCoursesContent,
  seniorCoursesContent,
} from "../../data/content";
import { IconBook, IconCar, IconGlobe, IconHeart, IconMonitor } from "../NavIcons";
import { SITE } from "../../site";

const classroomIcons = [IconBook, IconCar, IconMonitor] as const;

export function Courses() {
  return (
    <section id="courses" className="section">
      <div className="container">
        <h2>Our driving courses</h2>
        <p className="section-intro">
          Choose a full BDE package or flexible individual lessons. Prices shown plus applicable tax and certification
          fees where noted.
        </p>

        <div className="grid-3" id="certification-courses">
          {bdePackages.map((pkg) => (
            <article key={pkg.title} className="card course-card">
              <h3>{pkg.title}</h3>
              <ul>
                {pkg.items.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className="muted small">Plus (+) tax and certification fee</p>
            </article>
          ))}
        </div>

        <h3 id="individual-lessons" className="subsection-title">
          Individual lessons
        </h3>
        <p className="lesson-price-note">
          <strong>Prices are negotiable</strong> — feel free to call{" "}
          <a href={`tel:${SITE.phonePrimary.tel}`}>{SITE.phonePrimary.display}</a> to discuss options that work for you.
        </p>
        <div className="two-col">
          <div className="col">
            <h4>G1 to G2</h4>
            <div className="package-list">
              {g1g2Packages.map((p) => (
                <div key={p.id} className="package-row" id={p.id}>
                  <div>
                    <span className="package-label">{p.label}</span>
                    <span className="package-price">{p.price}</span>
                  </div>
                  <Link to="/register" className="btn btn-sm btn-primary">
                    Book / inquire
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="col col-muted">
            <h4>G2 to G</h4>
            <div className="package-list">
              {g2gPackages.map((p) => (
                <div key={p.id} className="package-row" id={p.id}>
                  <div>
                    <span className="package-label">{p.label}</span>
                    <span className="package-price">{p.price}</span>
                  </div>
                  <Link to="/register" className="btn btn-sm btn-primary">
                    Book / inquire
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <h3 id="classroom-training" className="subsection-title">
          Classroom training
        </h3>
        <p className="course-subsection-lead">
          BDE programs combine three parts — in-class theory, in-car practice, and flexible digital / homelink work — so
          you graduate with skills that stick, not just hours on paper.
        </p>
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
            Courses for seniors
          </h3>
          <div className="course-split">
            <div className="course-pillar-intro">
              <p className="course-pillar-badge">For mature & experienced drivers</p>
              <p>{seniorCoursesContent.intro}</p>
              <p className="course-pillar-closing muted">{seniorCoursesContent.closing}</p>
              <div className="course-pillar-cta">
                <Link to="/register" className="btn btn-sm btn-primary">
                  Register your interest
                </Link>
                <a href={`tel:${SITE.phonePrimary.tel}`} className="btn btn-sm btn-outline">
                  Call {SITE.phonePrimary.display}
                </a>
              </div>
            </div>
            <ul className="course-check-list" aria-label="What we offer seniors">
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
            Courses for new immigrants
          </h3>
          <div className="course-split">
            <div className="course-pillar-intro">
              <p className="course-pillar-badge course-pillar-badge--accent">New to Ontario roads</p>
              <p>{immigrantCoursesContent.intro}</p>
              <p className="course-pillar-closing muted">{immigrantCoursesContent.closing}</p>
              <div className="course-pillar-cta">
                <Link to="/contact" className="btn btn-sm btn-primary">
                  Contact us
                </Link>
                <a href={`mailto:${SITE.email}`} className="btn btn-sm btn-outline">
                  Email {SITE.email}
                </a>
              </div>
            </div>
            <ul className="course-check-list" aria-label="Support for newcomers">
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
