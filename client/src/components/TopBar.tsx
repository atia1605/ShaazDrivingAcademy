import { SITE } from "../site";

export function TopBar() {
  return (
    <div className="top-bar">
      <div className="container top-bar-inner">
        <span className="top-bar-tag">GTA · MTO-approved BDE</span>
        <div className="top-bar-links">
          <a className="top-bar-link" href={`mailto:${SITE.email}`}>
            <span className="sr-only">Email </span>
            {SITE.email}
          </a>
          <span className="top-bar-sep" aria-hidden>
            ·
          </span>
          <a className="top-bar-link" href={`tel:${SITE.phonePrimary.tel}`}>
            {SITE.phonePrimary.display}
          </a>
        </div>
      </div>
    </div>
  );
}
