import { Link } from "react-router-dom";
import { homeFaqTeaserItems } from "../../data/content";

export function HomeFaqTeaser() {
  return (
    <section className="section home-faq-teaser" aria-labelledby="home-faq-teaser-heading">
      <div className="container">
        <h2 id="home-faq-teaser-heading">Common questions</h2>
        <p className="section-intro">Quick answers — more detail on our FAQ page.</p>
        <ul className="home-faq-teaser-list">
          {homeFaqTeaserItems.map((item) => (
            <li key={item.q} className="home-faq-teaser-item">
              <h3 className="home-faq-teaser-q">{item.q}</h3>
              <p className="home-faq-teaser-a">{item.a}</p>
            </li>
          ))}
        </ul>
        <p className="home-faq-teaser-more">
          <Link to="/faq" className="btn btn-outline">
            View all FAQs
          </Link>
        </p>
      </div>
    </section>
  );
}
