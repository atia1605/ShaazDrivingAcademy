import { SITE_LANGUAGES_DISPLAY } from "../../site";

export function About() {
  return (
    <section id="about" className="section section-alt">
      <div className="container narrow">
        <h2>About us</h2>
        <p className="lead">
          Shaaz Driving Academy is a Ministry-approved Beginner Driver Education course provider. All in-class and
          in-car curriculum is delivered by professional, fully licensed instructors. We are committed to quality
          driver education and have served the GTA for over 20 years.
        </p>
        <p className="lead">
          We welcome students from diverse backgrounds. When it helps you learn, we can explain rules, manoeuvres, and
          road-test expectations in <strong>{SITE_LANGUAGES_DISPLAY}</strong> — ask when you book or on your first
          lesson.
        </p>
      </div>
    </section>
  );
}
