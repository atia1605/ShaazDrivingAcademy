import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getJson, postJson } from "../api";
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
  const [data, setData] = useState<PaymentOptionsResponse | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    getJson<PaymentOptionsResponse>("/api/payment-options")
      .then(setData)
      .catch(() => setLoadError("Could not load payment options. Is the API running?"));
  }, []);

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
      setErr(e instanceof Error ? e.message : "Payment could not start.");
    } finally {
      setLoadingKey(null);
    }
  }

  return (
    <div className="page-pay">
      <section className="pay-hero">
        <div className="container">
          <p className="breadcrumb">
            <Link to="/">Home</Link> / Pay online
          </p>
          <h1>Pay securely online</h1>
          <p className="lead pay-lead">
            Pay deposits and fees with <strong>Stripe</strong> — the same trusted checkout used by thousands of
            businesses. You will receive a receipt by email after payment.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          {loadError && (
            <div className="callout callout-warn" role="alert">
              <p>{loadError}</p>
              <p className="small muted">
                For local testing, run <code>npm run dev</code> from the project root so the API is available. For
                production, set <code>VITE_API_URL</code> to your API URL.
              </p>
            </div>
          )}

          {data && !data.payOnlineEnabled && (
            <div className="callout callout-info">
              <p>
                <strong>Payments are being set up.</strong> Add a Stripe secret key on the server to enable checkout.
                Until then, call <a href={`tel:${SITE.phonePrimary.tel}`}>{SITE.phonePrimary.display}</a> or email{" "}
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a> to pay.
              </p>
            </div>
          )}

          <label className="field pay-email-field">
            <span>Email for receipt (recommended)</span>
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
                  {loadingKey === item.key ? "Redirecting…" : "Pay with card"}
                </button>
              </article>
            ))}
          </div>

          <p className="small muted pay-footnote">
            Questions about which fee to choose?{" "}
            <Link to="/register">Register online</Link> or call us — we are happy to help before you pay.
          </p>
        </div>
      </section>
    </div>
  );
}
