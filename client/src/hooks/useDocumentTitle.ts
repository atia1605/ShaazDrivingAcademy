import { useEffect } from "react";

/**
 * Sets document.title for SPA SEO. Each route should call with a unique, descriptive title.
 */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
