import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getJson, postJson } from "../api";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { SITE } from "../site";

type PaymentOption = {
  key: string;
  name: string;
  description: string;
  amountDisplay: string;
};

type PaymentOptionsResponse = {
  items: PaymentOption[];
  payOnlineEnabled: boolean;
};

export function Pay() {
  const { t } = useTranslation();
  useDocumentTitle(t("meta.pay", { brand: SITE.name }));

  const [data, setData] = useState<PaymentOptionsResponse | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    getJson<PaymentOptionsResponse>("/api/payment-options")
      .then(setData)
      .catch(() => setLoadError(t("pay.loadError")));
  }, [t]);

  async function startCheckout(key: string) {
    setErr(null);
    setLoadingKey(key);
    try {
      const { url } = await postJson<{ url: string }>("/api/checkout-session", {
        productKey: key,
        customerEmail: email.trim() || undefined,
      });
      window.location.href = url;
    } catch (e) {
      setErr(e instanceof Error ? e.message : t("content.payPage.payErr"));
    } finally {
      setLoadingKey(null);
    }
  }

  return (
    <div className="page-pay">
      <section className="pay-hero">
        <div className="container">
          <p className="breadcrumb">
            <Link to="/">{t("breadcrumb.home")}</Link> / {t("content.payPage.breadcrumb")}
          </p>
          <h1>{t("content.payPage.h1")}</h1>
          <p className="lead pay-lead">{t("content.payPage.lead")}</p>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          {loadError && (
            <div className="callout callout-warn" role="alert">
              <p>{loadError}</p>
            </div>
          )}

          {data && !data.payOnlineEnabled && (
            <div className="callout callout-info">
              <p>
                {t("content.payPage.stripeDisabledIntro")}
                <a href={`tel:${SITE.phonePrimary.tel}`}>{SITE.phonePrimary.display}</a>
                {t("content.payPage.stripeDisabledMid")}
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                {t("content.payPage.stripeDisabledEnd")}
              </p>
            </div>
          )}

          <label className="field pay-email-field">
            <span>{t("content.payPage.receiptEmail")}</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </label>

          {err && (
            <p className="form-error" role="alert">
              {err}
            </p>
          )}

          <div className="pay-grid">
            {data?.items.map((item) => (
              <article key={item.key} className="card pay-card">
                <div className="pay-card-top">
                  <h2>{item.name}</h2>
                  <p className="pay-amount">{item.amountDisplay}</p>
                </div>
                <p className="muted pay-desc">{item.description}</p>
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  disabled={!data.payOnlineEnabled || loadingKey !== null}
                  onClick={() => startCheckout(item.key)}
                >
                  {loadingKey === item.key ? t("content.payPage.redirecting") : t("content.payPage.payCard")}
                </button>
              </article>
            ))}
          </div>

          <p className="small muted pay-footnote">
            {t("content.payPage.footnoteBefore")} <Link to="/register">{t("content.payPage.footnoteLink")}</Link>
            {t("content.payPage.footnoteAfter")}
          </p>
        </div>
      </section>
    </div>
  );
}
