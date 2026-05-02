import { useTranslation } from "react-i18next";
import { SITE } from "../../site";

export function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="section section-alt">
      <div className="container narrow">
        <h2>{t("content.aboutPage.h2")}</h2>
        <p className="lead">{t("content.aboutPage.p1", { brand: SITE.name })}</p>
        <p className="lead">
          {t("content.aboutPage.p2", {
            languages: t("site.languagesDisplay"),
          })}
        </p>
      </div>
    </section>
  );
}
