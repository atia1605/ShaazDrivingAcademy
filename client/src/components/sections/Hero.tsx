import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-bg" />
      <div className="container hero-content">
        <p className="hero-eyebrow">GTA · Ministry-approved BDE</p>
        <h1 id="hero-heading">Confident driving starts with the right training</h1>
        <p className="hero-lead">
          Ministry-approved Beginner Driver Education, online and virtual options across the GTA, taught by licensed
          instructors with 20+ years of experience.
        </p>
        <div className="hero-actions">
          <Link to="/register" className="btn btn-primary">
            Register online
          </Link>
          <a href="tel:6477837582" className="btn btn-outline">
            Call 647-783-7582
          </a>
          <a href="tel:4166865799" className="btn btn-outline">
            Call 416-686-5799
          </a>
        </div>
      </div>
    </section>
  );
}
