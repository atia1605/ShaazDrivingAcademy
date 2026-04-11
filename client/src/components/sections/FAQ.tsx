import { useState } from "react";
import { faqItems } from "../../data/content";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section">
      <div className="container narrow">
        <h2>Frequently asked questions</h2>
        <div className="faq">
          {faqItems.map((item, i) => {
            const isOpen = open === i;
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
                  {"aHtml" in item ? (
                    <p dangerouslySetInnerHTML={{ __html: item.aHtml }} />
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
