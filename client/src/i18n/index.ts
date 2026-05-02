import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ar from "../locales/ar.json";
import arContent from "../locales/content.ar.json";
import bn from "../locales/bn.json";
import bnContent from "../locales/content.bn.json";
import en from "../locales/en.json";
import enContent from "../locales/content.en.json";
import es from "../locales/es.json";
import esContent from "../locales/content.es.json";
import fr from "../locales/fr.json";
import frContent from "../locales/content.fr.json";
import ne from "../locales/ne.json";
import neContent from "../locales/content.ne.json";
import ur from "../locales/ur.json";
import urContent from "../locales/content.ur.json";
import yue from "../locales/yue.json";
import yueContent from "../locales/content.yue.json";

const STORAGE_KEY = "shaaz-lang";

export const SUPPORTED_LANGS = ["en", "bn", "ur", "fr", "es", "yue", "ne", "ar"] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

function normalizeLangCode(raw: string): string {
  const r = raw.replace("_", "-").toLowerCase();
  const base = r.split("-")[0] ?? "en";
  if (SUPPORTED_LANGS.includes(r as SupportedLang)) return r;
  if (SUPPORTED_LANGS.includes(base as SupportedLang)) return base;
  return "en";
}

function applyDocumentLang(lng: string) {
  const code = normalizeLangCode(lng);
  const htmlLang: Record<string, string> = {
    en: "en-CA",
    bn: "bn",
    ur: "ur",
    fr: "fr",
    es: "es",
    yue: "yue-Hant",
    ne: "ne",
    ar: "ar",
  };
  document.documentElement.lang = htmlLang[code] ?? "en-CA";
  document.documentElement.dir = code === "ur" || code === "ar" ? "rtl" : "ltr";
}

const saved =
  typeof localStorage !== "undefined" ? (localStorage.getItem(STORAGE_KEY) as SupportedLang | null) : null;
const normalizedSaved = saved ? normalizeLangCode(saved) : null;
const initialLng =
  normalizedSaved && SUPPORTED_LANGS.includes(normalizedSaved as SupportedLang)
    ? (normalizedSaved as SupportedLang)
    : ("en" as SupportedLang);

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: { ...en, ...enContent } },
    bn: { translation: { ...bn, ...bnContent } },
    ur: { translation: { ...ur, ...urContent } },
    fr: { translation: { ...fr, ...frContent } },
    es: { translation: { ...es, ...esContent } },
    yue: { translation: { ...yue, ...yueContent } },
    ne: { translation: { ...ne, ...neContent } },
    ar: { translation: { ...ar, ...arContent } },
  },
  lng: initialLng,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

applyDocumentLang(i18n.language);

i18n.on("languageChanged", (lng) => {
  try {
    localStorage.setItem(STORAGE_KEY, normalizeLangCode(lng));
  } catch {
    /* ignore */
  }
  applyDocumentLang(lng);
});

export default i18n;
