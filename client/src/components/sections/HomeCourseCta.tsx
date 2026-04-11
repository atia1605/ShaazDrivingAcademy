import { Link } from "react-router-dom";

export function HomeCourseCta() {
  return (
    <section className="section home-course-cta" aria-labelledby="home-cta-courses-heading">
      <div className="container home-course-cta-inner">
        <div className="home-course-cta-copy">
          <h2 id="home-cta-courses-heading">Courses &amp; pricing</h2>
          <p>
            BDE packages, individual lessons, and negotiable rates — explore full details and package options before you
            register.
          </p>
        </div>
        <Link to="/courses" className="btn btn-primary btn-lg home-course-cta-btn">
          See courses &amp; pricing
        </Link>
      </div>
    </section>
  );
}
