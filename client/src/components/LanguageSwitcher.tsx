import { useTranslation } from "react-i18next";
import i18n, { type SupportedLang, SUPPORTED_LANGS } from "../i18n";

function normalizeLng(code: string): SupportedLang {
  const base = code.split("-")[0] ?? "en";
  return SUPPORTED_LANGS.includes(base as SupportedLang) ? (base as SupportedLang) : "en";
}

export function LanguageSwitcher() {
  const { t } = useTranslation();

  return (
    <div className="lang-switcher">
      <label className="sr-only" htmlFor="site-lang-select">
        {t("lang.label")}
      </label>
      <select
        id="site-lang-select"
        className="lang-switcher-select"
        value={normalizeLng(i18n.language)}
        aria-label={t("lang.label")}
        onChange={(e) => {
          void i18n.changeLanguage(e.target.value as SupportedLang);
        }}
      >
        <option value="en">{t("lang.en")}</option>
        <option value="bn">{t("lang.bn")}</option>
        <option value="ur">{t("lang.ur")}</option>
      </select>
    </div>
  );
}
