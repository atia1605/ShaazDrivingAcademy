import { Link } from "react-router-dom";
import { SITE } from "../site";

export function StickyMobileCta() {
  return (
    <div className="sticky-mobile-cta" role="navigation" aria-label="Quick actions">
      <a href={`tel:${SITE.phonePrimary.tel}`} className="sticky-btn sticky-btn-call">
        Call
      </a>
      <a href={`mailto:${SITE.email}`} className="sticky-btn sticky-btn-mail">
        Email
      </a>
      <Link to="/pay" className="sticky-btn sticky-btn-pay">
        Pay
      </Link>
      <Link to="/register" className="sticky-btn sticky-btn-reg">
        Register
      </Link>
    </div>
  );
}
