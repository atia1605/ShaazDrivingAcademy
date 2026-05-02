import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SITE } from "../../site";

type FaqItem = { q: string; a?: string; aHtml?: string };

export function FAQ() {
  const { t } = useTranslation();
  const items = t("content.faqItems", { returnObjects: true }) as FaqItem[];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section">
      <div className="container narrow">
        <h2>{t("content.faqPage.h2")}</h2>
        <div className="faq">
          {items.map((item, i) => {
            const isOpen = open === i;
            const aHtml =
              "aHtml" in item && item.aHtml
                ? item.aHtml.replace(/\{\{brand\}\}/g, SITE.name)
                : undefined;
            return (
              <div key={item.q} className={`faq-item ${isOpen ? "open" : ""}`}>
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  {item.q}
                </button>
                <div className="faq-a" hidden={!isOpen}>
                  {aHtml ? (
                    <div className="faq-a-html" dangerouslySetInnerHTML={{ __html: aHtml }} />
                  ) : (
                    <p>{item.a}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
