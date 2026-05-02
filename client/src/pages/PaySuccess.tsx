import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { usePageSeo } from "../hooks/usePageSeo";
import { SITE } from "../site";

export function PaySuccess() {
  const { t } = useTranslation();
  usePageSeo({
    title: t("meta.paySuccess", { brand: SITE.name }),
    description: t("metaDesc.paySuccess"),
    robots: "noindex, follow",
  });

  return (
    <div className="page-pay">
      <section className="pay-success section">
        <div className="container narrow">
          <div className="success-panel">
            <div className="success-icon" aria-hidden>
              ✓
            </div>
            <h1>{t("paySuccessPage.heading")}</h1>
            <p className="lead">{t("paySuccessPage.lead")}</p>
            <p className="muted">
              {t("paySuccessPage.helpPrefix")}{" "}
              <a href={`tel:${SITE.phonePrimary.tel}`}>{SITE.phonePrimary.display}</a> {t("paySuccessPage.helpMid")}{" "}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            </p>
            <div className="form-actions" style={{ marginTop: "1.5rem" }}>
              <Link to="/" className="btn btn-primary">
                {t("paySuccessPage.home")}
              </Link>
              <Link to="/register" className="btn btn-ghost">
                {t("paySuccessPage.register")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
