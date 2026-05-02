import { useTranslation } from "react-i18next";
import { SITE, SITE_PHONE_LIST } from "../../site";

export function Locations() {
  const { t } = useTranslation();

  return (
    <section id="locations" className="section section-alt">
      <div className="container">
        <h2>{t("content.locationsPage.h2")}</h2>
        <p
          className="section-intro"
          dangerouslySetInnerHTML={{
            __html: t("content.locationsPage.intro", { cities: SITE.serviceArea }),
          }}
        />
        <div className="grid-locations">
          <article className="card location-card">
            <h3>{t("content.locationsPage.cardTitle")}</h3>
            <p>{SITE.address}</p>
            <p className="location-phones">
              {SITE_PHONE_LIST.map((p) => (
                <span key={p.tel} className="location-phone-line">
                  <span className="location-phone-name">{p.contactName}: </span>
                  <a href={`tel:${p.tel}`}>{p.display}</a>
                </span>
              ))}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
