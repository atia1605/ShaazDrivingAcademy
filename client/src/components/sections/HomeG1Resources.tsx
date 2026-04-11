import { g1PracticeLinks, torontoG1DriveTestCentres } from "../../data/content";

export function HomeG1Resources() {
  return (
    <section className="section section-g1-resources" aria-labelledby="g1-resources-heading">
      <div className="container">
        <h2 id="g1-resources-heading">G1 written test — practice links &amp; Toronto-area centres</h2>
        <p className="section-intro">
          The G1 knowledge test is written at <strong>DriveTest</strong> centres. Study from the{" "}
          <strong>official handbook</strong> first; third-party practice sites are not run by the MTO — use them only
          as extra review.
        </p>
        <div className="g1-resources-grid">
          <div className="g1-resources-card">
            <h3 className="g1-resources-card-title">Study &amp; practice links</h3>
            <ul className="g1-link-list">
              {g1PracticeLinks.map((link) => (
                <li key={link.href} className={link.kind === "practice" ? "g1-link-item g1-link-item--practice" : "g1-link-item"}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="g1-link">
                    {link.label}
                  </a>
                  {link.kind === "practice" ? (
                    <span className="g1-link-note">
                      {" "}
                      Sample questions only — always verify rules in the official handbook.
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
          <div className="g1-resources-card g1-resources-card--centres">
            <h3 className="g1-resources-card-title">Toronto-area DriveTest centres</h3>
            <p className="g1-centres-lead muted small">
              G1 knowledge tests are offered here (and at other GTA sites). Hours and wait times vary — confirm on{" "}
              <a href="https://www.drivetest.ca" target="_blank" rel="noopener noreferrer">
                drivetest.ca
              </a>{" "}
              before you visit.
            </p>
            <ul className="g1-centre-list">
              {torontoG1DriveTestCentres.map((c) => (
                <li key={c.name} className="g1-centre-item">
                  <div className="g1-centre-top">
                    <strong className="g1-centre-name">{c.name}</strong>
                    <a href={c.mapsUrl} className="g1-centre-map" target="_blank" rel="noopener noreferrer">
                      Map
                    </a>
                  </div>
                  <span className="g1-centre-address">{c.address}</span>
                </li>
              ))}
            </ul>
            <p className="muted small g1-centres-foot">
              Addresses are for quick reference; use the{" "}
              <a href="https://www.drivetest.ca/drivetest-centre-search/" target="_blank" rel="noopener noreferrer">
                official centre search
              </a>{" "}
              for the latest details.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
