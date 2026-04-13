import { Link } from "react-router-dom";

/**
 * Local SEO–oriented copy: neighborhoods + internal links (no thin city doorway pages).
 */
export function HomeAreasServed() {
  return (
    <section className="section section-areas-served" aria-labelledby="areas-served-heading">
      <div className="container">
        <h2 id="areas-served-heading">Driving lessons &amp; BDE across Toronto &amp; the GTA</h2>
        <p className="section-intro areas-served-intro">
          Shaaz Driving Academy serves students from <strong>Toronto</strong>, <strong>Scarborough</strong>,{" "}
          <strong>East York</strong>, the <strong>Danforth</strong> corridor, <strong>North York</strong>, and nearby
          GTA communities. We offer <strong>MTO-approved BDE</strong> packages, <strong>individual lessons</strong> for
          G1→G2 and G2→G, and support for <strong>road test preparation</strong>.
        </p>
        <p className="areas-served-links">
          <Link to="/courses">Courses &amp; pricing</Link>
          <span className="areas-served-sep" aria-hidden>
            ·
          </span>
          <Link to="/locations">Toronto &amp; Scarborough locations</Link>
          <span className="areas-served-sep" aria-hidden>
            ·
          </span>
          <Link to="/faq">FAQ</Link>
          <span className="areas-served-sep" aria-hidden>
            ·
          </span>
          <Link to="/contact">Contact</Link>
        </p>
      </div>
    </section>
  );
}
