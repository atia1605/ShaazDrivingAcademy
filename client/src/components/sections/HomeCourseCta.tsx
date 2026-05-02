import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function HomeCourseCta() {
  const { t } = useTranslation();

  return (
    <section className="section home-course-cta" aria-labelledby="home-cta-courses-heading">
      <div className="container home-course-cta-inner">
        <div className="home-course-cta-copy">
          <h2 id="home-cta-courses-heading">{t("content.homeCourseCta.h2")}</h2>
          <p>{t("content.homeCourseCta.p")}</p>
        </div>
        <Link to="/courses" className="btn btn-primary btn-lg home-course-cta-btn">
          {t("content.homeCourseCta.btn")}
        </Link>
      </div>
    </section>
  );
}
