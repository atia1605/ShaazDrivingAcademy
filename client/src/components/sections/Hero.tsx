import { Link } from "react-router-dom";
import { SITE, SITE_LANGUAGES_DISPLAY, SITE_PHONE_LIST } from "../../site";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-bg" />
      <div className="container hero-grid">
        <div className="hero-content">
          <p className="hero-eyebrow">Ministry-approved · Serving the GTA for 20+ years</p>
          <h1 id="hero-heading">Drive with confidence — from your first lesson to test day</h1>
          <p className="hero-lead">
            <strong>MTO-approved</strong> BDE and flexible in-car lessons from <strong>friendly, experienced</strong>{" "}
            instructors — <strong>step-by-step</strong>, <strong>hands-on</strong> coaching. Register or pay online
            anytime. In <strong>{SITE_LANGUAGES_DISPLAY}</strong> when it helps you learn.
          </p>
          <ul className="hero-seo-points">
            <li>
              <strong>BDE &amp; lessons</strong> — classroom, in-car, and digital components for Toronto &amp;
              Scarborough. <Link to="/courses">Courses &amp; pricing</Link>.
            </li>
            <li>
              <strong>G1, G2 &amp; G</strong> — packages and individual lessons; road-test prep with help choosing a
              DriveTest centre and practice plan.
            </li>
            <li>
              <strong>GTA</strong> — one Danforth location serving{" "}
              <Link to="/locations">Toronto &amp; Scarborough</Link>.
            </li>
          </ul>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary btn-lg">
              Register online
            </Link>
            <Link to="/pay" className="btn btn-secondary-light btn-lg">
              Pay a deposit
            </Link>
          </div>
          <div className="hero-actions hero-actions-secondary">
            {SITE_PHONE_LIST.map((p) => (
              <a key={p.tel} href={`tel:${p.tel}`} className="btn btn-outline hero-phone-btn">
                <span className="hero-phone-name">{p.contactName}</span>
                <span className="hero-phone-num">{p.display}</span>
              </a>
            ))}
            <a href={`mailto:${SITE.email}`} className="btn btn-outline">
              Email us
            </a>
          </div>
        </div>
        <aside className="hero-panel" aria-label="Highlights">
          <ul className="hero-stats">
            <li>
              <strong>MTO-approved</strong>
              <span>BDE provider</span>
            </li>
            <li>
              <strong>Friendly &amp; hands-on</strong>
              <span>Step-by-step · patient instructors</span>
            </li>
            <li>
              <strong>Road-test ready</strong>
              <span>Pass focus · DriveTest guidance</span>
            </li>
            <li>
              <strong>Languages</strong>
              <span className="hero-stat-languages">{SITE_LANGUAGES_DISPLAY}</span>
            </li>
          </ul>
          <p className="hero-panel-note">
            Call{" "}
            <a href={`tel:${SITE.phonePrimary.tel}`}>
              {SITE.phonePrimary.contactName} ({SITE.phonePrimary.display})
            </a>{" "}
            — quick replies.
          </p>
        </aside>
      </div>
    </section>
  );
}
