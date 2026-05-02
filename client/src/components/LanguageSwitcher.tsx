import { useTranslation } from "react-i18next";
import { type SupportedLang, SUPPORTED_LANGS } from "../i18n";

function normalizeLng(code: string): SupportedLang {
  const raw = code.replace("_", "-").toLowerCase();
  const base = raw.split("-")[0] ?? "en";
  if (SUPPORTED_LANGS.includes(raw as SupportedLang)) return raw as SupportedLang;
  if (SUPPORTED_LANGS.includes(base as SupportedLang)) return base as SupportedLang;
  return "en";
}

export function LanguageSwitcher() {
  const { t, i18n: i18nInstance } = useTranslation();

  return (
    <div className="lang-switcher">
      <label className="lang-switcher-prompt" htmlFor="site-lang-select">
        {t("lang.translateTo")}
      </label>
      <select
        id="site-lang-select"
        className="lang-switcher-select"
        value={normalizeLng(i18nInstance.language)}
        onChange={(e) => {
          void i18nInstance.changeLanguage(e.target.value as SupportedLang);
        }}
      >
        <option value="en">{t("lang.en")}</option>
        <option value="bn">{t("lang.bn")}</option>
        <option value="ur">{t("lang.ur")}</option>
        <option value="fr">{t("lang.fr")}</option>
        <option value="es">{t("lang.es")}</option>
        <option value="yue">{t("lang.yue")}</option>
        <option value="ne">{t("lang.ne")}</option>
        <option value="ar">{t("lang.ar")}</option>
      </select>
    </div>
  );
}
