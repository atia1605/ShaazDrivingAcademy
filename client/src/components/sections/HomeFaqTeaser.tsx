import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

type TeaserItem = { q: string; a: string };

export function HomeFaqTeaser() {
  const { t } = useTranslation();
  const items = t("content.homeFaqTeaserItems", { returnObjects: true }) as TeaserItem[];

  return (
    <section className="section home-faq-teaser" aria-labelledby="home-faq-teaser-heading">
      <div className="container">
        <h2 id="home-faq-teaser-heading">{t("content.homeFaqTeaser.h2")}</h2>
        <p className="section-intro">{t("content.homeFaqTeaser.intro")}</p>
        <ul className="home-faq-teaser-list">
          {items.map((item) => (
            <li key={item.q} className="home-faq-teaser-item">
              <h3 className="home-faq-teaser-q">{item.q}</h3>
              <p className="home-faq-teaser-a">{item.a}</p>
            </li>
          ))}
        </ul>
        <p className="home-faq-teaser-more">
          <Link to="/faq" className="btn btn-outline">
            {t("content.homeFaqTeaser.more")}
          </Link>
        </p>
      </div>
    </section>
  );
}
