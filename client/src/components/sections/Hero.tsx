import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { SITE, SITE_PHONE_LIST } from "../../site";

export function Hero() {
  const { t } = useTranslation();
  const languages = t("site.languagesDisplay");

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-bg" />
      <div className="container hero-grid">
        <div className="hero-content">
          <p className="hero-eyebrow">{t("hero.eyebrow")}</p>
          <h1 id="hero-heading">{t("hero.title")}</h1>
          <p className="hero-lead">{t("hero.lead", { languages })}</p>
          <ul className="hero-seo-points">
            <li>
              <strong>{t("hero.seo1Title")}</strong> — {t("hero.seo1Body")}{" "}
              <Link to="/courses">{t("hero.seo1Link")}</Link>.
            </li>
            <li>
              <strong>{t("hero.seo2Title")}</strong> — {t("hero.seo2Body")}
            </li>
            <li>
              <strong>{t("hero.seo3Strong")}</strong> {t("hero.seo3Mid")}{" "}
              <Link to="/locations">{t("hero.seo3Link")}</Link>.
            </li>
          </ul>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary btn-lg">
              {t("hero.ctaRegister")}
            </Link>
            <Link to="/pay" className="btn btn-secondary-light btn-lg">
              {t("hero.ctaPay")}
            </Link>
          </div>
          <div className="hero-actions hero-actions-secondary">
            {SITE_PHONE_LIST.map((p) => (
              <a key={p.tel} href={`tel:${p.tel}`} className="btn btn-outline hero-phone-btn">
                <span className="hero-phone-name">{p.contactName}</span>
                <span className="hero-phone-num">{p.display}</span>
              </a>
            ))}
            <a href={`mailto:${SITE.email}`} className="btn btn-outline">
              {t("hero.emailUs")}
            </a>
          </div>
        </div>
        <aside className="hero-panel" aria-label={t("hero.panelAria")}>
          <ul className="hero-stats">
            <li>
              <strong>{t("hero.stat1a")}</strong>
              <span>{t("hero.stat1b")}</span>
            </li>
            <li>
              <strong>{t("hero.stat2a")}</strong>
              <span>{t("hero.stat2b")}</span>
            </li>
            <li>
              <strong>{t("hero.stat3a")}</strong>
              <span>{t("hero.stat3b")}</span>
            </li>
            <li>
              <strong>{t("hero.stat4a")}</strong>
              <span className="hero-stat-languages">{languages}</span>
            </li>
          </ul>
          <p className="hero-panel-note">
            {t("hero.panelNote", {
              name: SITE.phonePrimary.contactName,
              phone: SITE.phonePrimary.display,
            })}
          </p>
        </aside>
      </div>
    </section>
  );
}
