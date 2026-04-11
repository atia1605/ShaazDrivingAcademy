import { Link } from "react-router-dom";
import { SITE } from "../../site";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-bg" />
      <div className="container hero-grid">
        <div className="hero-content">
          <p className="hero-eyebrow">Ministry-approved · Serving the GTA for 20+ years</p>
          <h1 id="hero-heading">Drive with confidence — from your first lesson to test day</h1>
          <p className="hero-lead">
            Professional BDE courses, flexible individual lessons, and clear guidance at every step. Register online,
            pay securely, and reach us by phone or email anytime.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary btn-lg">
              Register online
            </Link>
            <Link to="/pay" className="btn btn-secondary-light btn-lg">
              Pay a deposit
            </Link>
          </div>
          <div className="hero-actions hero-actions-secondary">
            <a href={`tel:${SITE.phonePrimary.tel}`} className="btn btn-outline">
              {SITE.phonePrimary.display}
            </a>
            <a href={`tel:${SITE.phoneSecondary.tel}`} className="btn btn-outline">
              {SITE.phoneSecondary.display}
            </a>
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
              <strong>Licensed</strong>
              <span>Instructors</span>
            </li>
            <li>
              <strong>Online &amp; in-class</strong>
              <span>Flexible options</span>
            </li>
          </ul>
          <p className="hero-panel-note">
            Prefer to talk? Call <a href={`tel:${SITE.phonePrimary.tel}`}>{SITE.phonePrimary.display}</a> — we respond
            quickly.
          </p>
        </aside>
      </div>
    </section>
  );
}
