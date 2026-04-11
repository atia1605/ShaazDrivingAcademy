import { testimonials } from "../../data/content";

const EXCERPT_MAX = 240;

function excerptForHome(quote: string): string {
  const trimmed = quote.trim().replace(/^["'""]+|["'""]+$/g, "");
  if (trimmed.length <= EXCERPT_MAX) {
    return trimmed;
  }
  return `${trimmed.slice(0, EXCERPT_MAX).trimEnd()}…`;
}

export function Testimonials() {
  return (
    <section id="testimonials" className="section section-alt">
      <div className="container">
        <h2>What students say</h2>
        <p className="section-intro testimonials-intro">
          Real feedback from students and families — newcomers, first-time drivers, refresher lessons, and more.
        </p>
        <div className="grid-3">
          {testimonials.map((t) => (
            <blockquote key={t.author} className="card quote-card" lang="en">
              <p>“{excerptForHome(t.quote)}”</p>
              <footer>
                — <cite className="quote-author">{t.author}</cite>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
