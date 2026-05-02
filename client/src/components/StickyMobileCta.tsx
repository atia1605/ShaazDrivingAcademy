import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { SITE } from "../site";

export function StickyMobileCta() {
  const { t } = useTranslation();

  return (
    <div className="sticky-mobile-cta" role="navigation" aria-label={t("sticky.aria")}>
      <a href={`tel:${SITE.phonePrimary.tel}`} className="sticky-btn sticky-btn-call">
        {t("sticky.call")}
      </a>
      <a href={`mailto:${SITE.email}`} className="sticky-btn sticky-btn-mail">
        {t("sticky.email")}
      </a>
      <Link to="/pay" className="sticky-btn sticky-btn-pay">
        {t("sticky.pay")}
      </Link>
      <Link to="/register" className="sticky-btn sticky-btn-reg">
        {t("sticky.register")}
      </Link>
    </div>
  );
}
