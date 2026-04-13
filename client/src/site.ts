/** Languages instructors can support for explanations (marketing copy — adjust if needed). */
export const SITE_LANGUAGES = [
  "Bangla",
  "English",
  "Urdu",
  "Hindi",
  "Arabic",
  "Sylheti",
  "Chittagong",
] as const;

const _langParts = [...SITE_LANGUAGES];
const _langLast = _langParts.pop()!;
/** e.g. "Bangla, English, … and Chittagong" */
export const SITE_LANGUAGES_DISPLAY = `${_langParts.join(", ")} and ${_langLast}`;

/** Public contact details — shown across the site */
export const SITE = {
  name: "Shaaz Driving Academy",
  email: "shohanchowdhury@hotmail.com",
  /** Single visit / mailing address — Danforth corridor, serving Toronto & Scarborough */
  address: "3096 Danforth Ave, Scarborough, ON M1L 1B1",
  /** Service area label for copy and SEO */
  serviceArea: "Toronto & Scarborough",
  phonePrimary: {
    tel: "6477837582",
    display: "647-783-7582",
    contactName: "Md Shohan Chowdhury",
  },
  phoneSecondary: {
    tel: "4166865799",
    display: "416-686-5799",
    contactName: "Office",
  },
  phoneTertiary: {
    tel: "4168774783",
    display: "416-877-4783",
    contactName: "Md Shahjahan Uddin",
  },
} as const;

/** All voice lines for footers, locations, FAQ bot, etc. */
export const SITE_PHONE_LIST = [SITE.phonePrimary, SITE.phoneSecondary, SITE.phoneTertiary] as const;

export type SitePhone = (typeof SITE_PHONE_LIST)[number];

/** Website credit — update `email` / `phone` if these change. */
export const WEB_DESIGNER = {
  name: "Atia Nahia",
  email: "nahiabaksh21@gmail.com",
  phone: {
    tel: "6475105901",
    display: "647-510-5901",
  },
  role: "Web designer",
  summary: "Designed and built this site for Shaaz Driving Academy.",
} as const;
