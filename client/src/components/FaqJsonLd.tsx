import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SITE } from "../site";
import { plainTextFromFaqAnswer } from "../utils/plainTextFromFaqAnswer";

type FaqItem = { q: string; a?: string; aHtml?: string };

/**
 * FAQPage structured data for rich results — answers must be plain text.
 */
export function FaqJsonLd() {
  const { t } = useTranslation();
  const schema = useMemo(() => {
    const items = t("content.faqItems", { returnObjects: true }) as FaqItem[];
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map((item) => {
        const aHtml =
          "aHtml" in item && item.aHtml ? item.aHtml.replace(/\{\{brand\}\}/g, SITE.name) : undefined;
        const text = plainTextFromFaqAnswer(item.a, aHtml);
        return {
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text,
          },
        };
      }),
    };
  }, [t]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
