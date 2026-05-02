import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { SITE } from "../../site";

/**
 * Local SEO–oriented copy: neighborhoods + internal links (no thin city doorway pages).
 */
export function HomeAreasServed() {
  const { t } = useTranslation();

  return (
    <section className="section section-areas-served" aria-labelledby="areas-served-heading">
      <div className="container">
        <h2 id="areas-served-heading">{t("homeAreas.title")}</h2>
        <p className="section-intro areas-served-intro">{t("homeAreas.intro", { brand: SITE.name })}</p>
        <p className="areas-served-links">
          <Link to="/courses">{t("homeAreas.coursesPricing")}</Link>
          <span className="areas-served-sep" aria-hidden>
            ·
          </span>
          <Link to="/locations">{t("homeAreas.locationsLink")}</Link>
          <span className="areas-served-sep" aria-hidden>
            ·
          </span>
          <Link to="/faq">{t("homeAreas.faq")}</Link>
          <span className="areas-served-sep" aria-hidden>
            ·
          </span>
          <Link to="/contact">{t("homeAreas.contact")}</Link>
        </p>
      </div>
    </section>
  );
}
