import { Link } from "react-router-dom";
import { SITE } from "../site";

export function PaySuccess() {
  return (
    <div className="page-pay">
      <section className="pay-success section">
        <div className="container narrow">
          <div className="success-panel">
            <div className="success-icon" aria-hidden>
              ✓
            </div>
            <h1>Thank you for your payment</h1>
            <p className="lead">
              Your card was charged successfully. Stripe will email a receipt to the address you entered at checkout.
            </p>
            <p className="muted">
              If you have questions about your course or next steps, call{" "}
              <a href={`tel:${SITE.phonePrimary.tel}`}>{SITE.phonePrimary.display}</a> or email{" "}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            </p>
            <div className="form-actions" style={{ marginTop: "1.5rem" }}>
              <Link to="/" className="btn btn-primary">
                Back to home
              </Link>
              <Link to="/register" className="btn btn-ghost">
                Complete registration
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
