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

/** Regions and cities we highlight for students (one physical office on Danforth). */
export const SITE_SERVICE_CITIES = [
  "Toronto",
  "Scarborough",
  "North York",
  "East York",
  "Etobicoke",
  "Ajax",
  "Brampton",
  "Pickering",
  "Oakville",
  "Oshawa",
  "Whitby",
  "Unionville",
  "Mississauga",
  "Windsor",
] as const;

function oxfordCommaList(items: readonly string[]): string {
  const n = items.length;
  if (n === 0) return "";
  if (n === 1) return items[0]!;
  if (n === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[n - 1]!}`;
}

/** Comma-separated prose list for {{area}} / {{cities}} in copy */
export const SITE_SERVICE_AREA = oxfordCommaList(SITE_SERVICE_CITIES);

/** Production origin for canonical URLs and JSON-LD (must match live domain). */
export const SITE_ORIGIN = "https://www.shaazdriving.com" as const;

/**
 * Full canonical URL for the current route (respects Vite `base` for GitHub Pages builds).
 */
export function siteCanonicalUrl(pathname: string): string {
  const base = import.meta.env.BASE_URL;
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const tail =
    pathname === "/" || pathname === "" ? "" : pathname.startsWith("/") ? pathname.slice(1) : pathname;
  return `${SITE_ORIGIN}${normalizedBase}${tail}`;
}

/** Public contact details — shown across the site */
export const SITE = {
  name: "Shaaz Driving Academy",
  email: "shohanchowdhury@hotmail.com",
  /** Single visit / mailing address — Danforth corridor */
  address: "3096 Danforth Ave, Scarborough, ON M1L 1B1",
  /** Cities we welcome students from — see SITE_SERVICE_CITIES */
  serviceArea: SITE_SERVICE_AREA,
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
  /** Official TikTok — update `url` / `handle` if the profile changes */
  tiktok: {
    url: "https://www.tiktok.com/@shaazdrivingacademy",
    handle: "@shaazdrivingacademy",
  },
  /**
   * Google Maps search for this address (opens listing & reviews).
   * Replace with your direct Business Profile / “Write a review” link from Google Business if you prefer.
   */
  googleMapsListingUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Shaaz Driving Academy 3096 Danforth Ave Scarborough ON M1L 1B1")}`,
  /**
   * Same idea as a Google Search for “Shaaz Driving Academy reviews” — without `sxsrf`, `si`, `ved`, etc.
   * Those long copy-pasted URLs from the address bar are session-specific and break when shared on a website.
   */
  googleReviewsSearchUrl: `https://www.google.com/search?q=${encodeURIComponent("Shaaz Driving Academy reviews")}`,
} as const;

/** Brand image (`client/public/images/shaaz-logo.png`) — shown as a circle in header/footer */
export const SITE_LOGO_SRC = `${import.meta.env.BASE_URL}images/shaaz-logo.png`;

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
