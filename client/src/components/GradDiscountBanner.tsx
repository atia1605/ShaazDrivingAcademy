import { useTranslation } from "react-i18next";
import { SITE } from "../site";

export function GradDiscountBanner() {
  const { t } = useTranslation();
  const { tel, display } = SITE.phonePrimary;
  const line = t("promoBanner.line");

  return (
    <aside className="grad-discount-banner" aria-label={t("promoBanner.aria")}>
      <p className="sr-only">
        {line}. {t("promoBanner.cta")}: {display}.
      </p>
      <div className="grad-discount-banner__shine" aria-hidden />
      <div className="grad-discount-banner__inner container">
        <div className="grad-discount-banner__marquee">
          <div className="grad-discount-banner__track">
            <div className="grad-discount-banner__group">
              <span className="grad-discount-banner__star" aria-hidden>
                ✦
              </span>
              <span>{line}</span>
              <span className="grad-discount-banner__sep" aria-hidden>
                ·
              </span>
              <span>{display}</span>
              <span className="grad-discount-banner__sep" aria-hidden>
                ·
              </span>
            </div>
            <div className="grad-discount-banner__group" aria-hidden="true">
              <span className="grad-discount-banner__star">✦</span>
              <span>{line}</span>
              <span className="grad-discount-banner__sep">·</span>
              <span>{display}</span>
              <span className="grad-discount-banner__sep">·</span>
            </div>
          </div>
        </div>
        <a href={`tel:${tel}`} className="grad-discount-banner__cta">
          <span className="grad-discount-banner__cta-glow" aria-hidden />
          {t("promoBanner.cta")}
        </a>
      </div>
    </aside>
  );
}
