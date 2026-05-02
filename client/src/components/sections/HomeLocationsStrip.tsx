import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { SITE, SITE_PHONE_LIST } from "../../site";

export function HomeLocationsStrip() {
  const { t } = useTranslation();

  return (
    <section
      className="section section-alt home-locations-strip section-home-last"
      aria-labelledby="home-locations-strip-heading"
    >
      <div className="container">
        <h2 id="home-locations-strip-heading">{t("content.homeLocationsStrip.h2")}</h2>
        <p className="section-intro">
          <span
            dangerouslySetInnerHTML={{
              __html: t("content.homeLocationsStrip.intro", { cities: SITE.serviceArea }),
            }}
          />{" "}
          <strong>{t("site.languagesDisplay")}</strong>.
        </p>
        <div className="home-locations-grid home-locations-grid--single">
          <article className="home-location-card">
            <h3>{t("content.homeLocationsStrip.officeTitle")}</h3>
            <p className="home-location-address">{SITE.address}</p>
            <ul className="home-location-phone-list">
              {SITE_PHONE_LIST.map((p) => (
                <li key={p.tel}>
                  <span className="home-location-phone-name">{p.contactName}</span>
                  <a href={`tel:${p.tel}`}>{p.display}</a>
                </li>
              ))}
            </ul>
          </article>
        </div>
        <p className="home-locations-more">
          <Link to="/locations" className="btn btn-primary">
            {t("content.homeLocationsStrip.cta")}
          </Link>
        </p>
      </div>
    </section>
  );
}
