import { useTranslation } from "react-i18next";
import { torontoG1DriveTestCentres } from "../../data/content";

type PracticeLink = { label: string; href: string; kind: "official" | "practice" };

export function HomeG1Resources() {
  const { t } = useTranslation();
  const links = t("content.g1PracticeLinks", { returnObjects: true }) as PracticeLink[];

  return (
    <section className="section section-g1-resources" aria-labelledby="g1-resources-heading">
      <div className="container">
        <h2 id="g1-resources-heading">{t("content.homeG1.h2")}</h2>
        <p
          className="section-intro"
          dangerouslySetInnerHTML={{ __html: t("content.homeG1.intro") }}
        />
        <div className="g1-resources-grid">
          <div className="g1-resources-card">
            <h3 className="g1-resources-card-title">{t("content.homeG1.studyTitle")}</h3>
            <ul className="g1-link-list">
              {links.map((link) => (
                <li
                  key={link.href}
                  className={link.kind === "practice" ? "g1-link-item g1-link-item--practice" : "g1-link-item"}
                >
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="g1-link">
                    {link.label}
                  </a>
                  {link.kind === "practice" ? (
                    <span className="g1-link-note"> {t("content.homeG1.practiceNote")}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
          <div className="g1-resources-card g1-resources-card--centres">
            <h3 className="g1-resources-card-title">{t("content.homeG1.centresTitle")}</h3>
            <p
              className="g1-centres-lead muted small"
              dangerouslySetInnerHTML={{ __html: t("content.homeG1.centresLead") }}
            />
            <ul className="g1-centre-list">
              {torontoG1DriveTestCentres.map((c) => (
                <li key={c.name} className="g1-centre-item">
                  <div className="g1-centre-top">
                    <strong className="g1-centre-name">{c.name}</strong>
                    <a href={c.mapsUrl} className="g1-centre-map" target="_blank" rel="noopener noreferrer">
                      {t("content.homeG1.map")}
                    </a>
                  </div>
                  <span className="g1-centre-address">{c.address}</span>
                </li>
              ))}
            </ul>
            <p
              className="muted small g1-centres-foot"
              dangerouslySetInnerHTML={{ __html: t("content.homeG1.foot") }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
