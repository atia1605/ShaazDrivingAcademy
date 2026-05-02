import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { siteCanonicalUrl } from "../site";

function setMetaName(name: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setMetaProperty(property: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export type PageSeoOptions = {
  title: string;
  description: string;
  /** When set, adds `<meta name="robots" …>` (e.g. `noindex, follow` for thank-you pages). */
  robots?: string;
};

/**
 * Updates document title, meta description, canonical URL, and OG/Twitter tags for SPA routes.
 * Crawlers that run JavaScript see route-specific metadata after hydration.
 */
export function usePageSeo({ title, description, robots }: PageSeoOptions) {
  const { pathname } = useLocation();
  const canonical = siteCanonicalUrl(pathname);

  useEffect(() => {
    document.title = title;
    setMetaName("description", description);
    setCanonical(canonical);
    setMetaProperty("og:title", title);
    setMetaProperty("og:description", description);
    setMetaProperty("og:url", canonical);
    setMetaName("twitter:title", title);
    setMetaName("twitter:description", description);

    if (robots !== undefined) {
      setMetaName("robots", robots);
    } else {
      document.head.querySelector('meta[name="robots"]')?.remove();
    }
  }, [title, description, canonical, robots]);
}
