import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import bn from "../locales/bn.json";
import bnContent from "../locales/content.bn.json";
import en from "../locales/en.json";
import enContent from "../locales/content.en.json";
import ur from "../locales/ur.json";
import urContent from "../locales/content.ur.json";

const STORAGE_KEY = "shaaz-lang";

export const SUPPORTED_LANGS = ["en", "bn", "ur"] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

function applyDocumentLang(lng: string) {
  const code = lng.split("-")[0] ?? "en";
  document.documentElement.lang = code === "bn" ? "bn" : code === "ur" ? "ur" : "en";
  document.documentElement.dir = code === "ur" ? "rtl" : "ltr";
}

const saved =
  typeof localStorage !== "undefined" ? (localStorage.getItem(STORAGE_KEY) as SupportedLang | null) : null;
const initialLng =
  saved && SUPPORTED_LANGS.includes(saved as SupportedLang) ? saved : ("en" as SupportedLang);

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: { ...en, ...enContent } },
    bn: { translation: { ...bn, ...bnContent } },
    ur: { translation: { ...ur, ...urContent } },
  },
  lng: initialLng,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

applyDocumentLang(i18n.language);

i18n.on("languageChanged", (lng) => {
  try {
    localStorage.setItem(STORAGE_KEY, lng);
  } catch {
    /* ignore */
  }
  applyDocumentLang(lng);
});

export default i18n;
