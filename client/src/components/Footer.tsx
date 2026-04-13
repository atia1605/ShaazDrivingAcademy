import { Link } from "react-router-dom";
import { LogoImagePreview } from "./LogoImagePreview";
import { TikTokIcon } from "./TikTokIcon";
import { WebDesignerCredit } from "./WebDesignerCredit";
import { SITE, SITE_LANGUAGES_DISPLAY, SITE_PHONE_LIST } from "../site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-col footer-brand">
          <div className="footer-brand-head">
            <LogoImagePreview imgClassName="footer-brand-logo" width={52} height={52} />
            <strong className="footer-title">{SITE.name}</strong>
          </div>
          <p className="footer-blurb">
            Ministry-approved driver education for {SITE.serviceArea} and the GTA. Your safety and success on the road
            come first. Lessons explained in {SITE_LANGUAGES_DISPLAY}.
          </p>
          <div className="footer-social">
            <span className="footer-social-label">Follow us</span>
            <a
              href={SITE.tiktok.url}
              className="footer-social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TikTokIcon className="footer-social-icon" />
              <span>TikTok {SITE.tiktok.handle}</span>
            </a>
          </div>
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
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/courses">Courses</Link>
            </li>
            <li>
              <Link to="/locations">Locations</Link>
            </li>
            <li>
              <Link to="/vehicle">Vehicle for hire (PTC)</Link>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <span className="footer-heading">Contact</span>
          <ul className="footer-links">
            <li>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            {SITE_PHONE_LIST.map((p) => (
              <li key={p.tel}>
                <a href={`tel:${p.tel}`}>
                  {p.contactName}: {p.display}
                </a>
              </li>
            ))}
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
          <WebDesignerCredit />
        </div>
      </div>
    </footer>
  );
}
