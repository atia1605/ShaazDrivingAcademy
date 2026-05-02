import { useTranslation } from "react-i18next";
import { SITE } from "../site";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function TopBar() {
  const { t } = useTranslation();

  return (
    <div className="top-bar">
      <div className="container top-bar-inner">
        <div className="top-bar-left">
          <span className="top-bar-tag">{t("topBar.tag")}</span>
          <span className="top-bar-lang" title={t("topBar.languagesTitle")}>
            {t("site.languagesInline")}
          </span>
        </div>
        <div className="top-bar-links">
          <LanguageSwitcher />
          <a className="top-bar-link" href={`mailto:${SITE.email}`}>
            <span className="sr-only">Email </span>
            {SITE.email}
          </a>
          <span className="top-bar-sep" aria-hidden>
            ·
          </span>
          <a className="top-bar-link" href={`tel:${SITE.phonePrimary.tel}`}>
            <span className="sr-only">{SITE.phonePrimary.contactName} </span>
            {SITE.phonePrimary.display}
          </a>
        </div>
      </div>
    </div>
  );
}
