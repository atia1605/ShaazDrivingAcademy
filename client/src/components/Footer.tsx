import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { LogoImagePreview } from "./LogoImagePreview";
import { TikTokIcon } from "./TikTokIcon";
import { WebDesignerCredit } from "./WebDesignerCredit";
import { SITE, SITE_PHONE_LIST } from "../site";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-col footer-brand">
          <div className="footer-brand-head">
            <LogoImagePreview imgClassName="footer-brand-logo" width={52} height={52} />
            <strong className="footer-title">{SITE.name}</strong>
          </div>
          <p className="footer-blurb">
            {t("footer.blurb", {
              area: SITE.serviceArea,
              languages: t("site.languagesDisplay"),
            })}
          </p>
          <div className="footer-social">
            <span className="footer-social-label">{t("footer.follow")}</span>
            <a
              href={SITE.tiktok.url}
              className="footer-social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TikTokIcon className="footer-social-icon" />
              <span>{t("footer.tiktok", { handle: SITE.tiktok.handle })}</span>
            </a>
          </div>
        </div>
        <div className="footer-col">
          <span className="footer-heading">{t("footer.quickLinks")}</span>
          <ul className="footer-links">
            <li>
              <Link to="/register">{t("footer.registerOnline")}</Link>
            </li>
            <li>
              <Link to="/pay">{t("footer.payOnline")}</Link>
            </li>
            <li>
              <Link to="/faq">{t("nav.faq")}</Link>
            </li>
            <li>
              <Link to="/contact">{t("nav.contact")}</Link>
            </li>
            <li>
              <Link to="/about">{t("nav.about")}</Link>
            </li>
            <li>
              <Link to="/courses">{t("nav.courses")}</Link>
            </li>
            <li>
              <Link to="/locations">{t("nav.locations")}</Link>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <span className="footer-heading">{t("footer.contactHeading")}</span>
          <ul className="footer-links">
            <li>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            {SITE_PHONE_LIST.map((p) => (
              <li key={p.tel}>
                <a href={`tel:${p.tel}`}>
                  {p.contactName}: {p.display}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="footer-copy">
            {t("footer.rights", { year: new Date().getFullYear(), name: SITE.name })}
          </p>
          <p className="footer-address">{SITE.address}</p>
          <p className="footer-meta">{t("footer.mto")}</p>
          <WebDesignerCredit />
        </div>
      </div>
    </footer>
  );
}
