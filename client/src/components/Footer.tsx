import { Link } from "react-router-dom";
import { SITE } from "../site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-col footer-brand">
          <strong className="footer-title">{SITE.name}</strong>
          <p className="footer-blurb">
            Ministry-approved driver education in the GTA. Your safety and success on the road come first.
          </p>
        </div>
        <div className="footer-col">
          <span className="footer-heading">Quick links</span>
          <ul className="footer-links">
            <li>
              <Link to="/register">Register online</Link>
            </li>
            <li>
              <Link to="/pay">Pay online</Link>
            </li>
            <li>
              <Link to="/#faq">FAQ</Link>
            </li>
            <li>
              <Link to="/#contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <span className="footer-heading">Contact</span>
          <ul className="footer-links">
            <li>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li>
              <a href={`tel:${SITE.phonePrimary.tel}`}>{SITE.phonePrimary.display}</a>
            </li>
            <li>
              <a href={`tel:${SITE.phoneSecondary.tel}`}>{SITE.phoneSecondary.display}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="footer-copy">© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p className="footer-address">{SITE.address}</p>
          <p className="footer-meta">
            Licensed by Province of Ontario, Ministry of Transportation (MTO). Your safety is our priority.
          </p>
        </div>
      </div>
    </footer>
  );
}
