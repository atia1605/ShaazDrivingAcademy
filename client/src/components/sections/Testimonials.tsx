import { testimonials } from "../../data/content";

export function Testimonials() {
  return (
    <section id="testimonials" className="section section-alt">
      <div className="container">
        <h2>What students say</h2>
        <div className="grid-3">
          {testimonials.map((t) => (
            <blockquote key={t.author} className="card quote-card">
              <p>{t.quote}</p>
              <footer>— {t.author}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
