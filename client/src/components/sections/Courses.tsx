import { Link } from "react-router-dom";
import { bdePackages, g1g2Packages, g2gPackages } from "../../data/content";

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
        <ul className="simple-list">
          <li>In-class</li>
          <li>In-car class</li>
          <li>Digital</li>
        </ul>

        <h3 id="senior-courses" className="subsection-title">
          Courses for seniors
        </h3>
        <p className="muted">Ask us about programs tailored to experienced drivers refreshing their skills.</p>

        <h3 id="immigrant-courses" className="subsection-title">
          Courses for new immigrants
        </h3>
        <p className="muted">
          We support newcomers adapting to Ontario rules and road culture. Contact us to discuss the best path for your
          situation.
        </p>
      </div>
    </section>
  );
}
