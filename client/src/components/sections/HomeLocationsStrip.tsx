import { Link } from "react-router-dom";
import { SITE, SITE_LANGUAGES_DISPLAY, SITE_PHONE_LIST } from "../../site";

export function HomeLocationsStrip() {
  return (
    <section
      className="section section-alt home-locations-strip section-home-last"
      aria-labelledby="home-locations-strip-heading"
    >
      <div className="container">
        <h2 id="home-locations-strip-heading">Visit us — Toronto &amp; Scarborough</h2>
        <p className="section-intro">
          One <strong>Danforth</strong> location serving <strong>Toronto</strong>, <strong>Scarborough</strong>, and the
          wider <strong>GTA</strong>. Reach any of our lines below. Support in <strong>{SITE_LANGUAGES_DISPLAY}</strong>.
        </p>
        <div className="home-locations-grid home-locations-grid--single">
          <article className="home-location-card">
            <h3>{SITE.serviceArea}</h3>
            <p className="home-location-address">{SITE.address}</p>
            <ul className="home-location-phone-list">
              {SITE_PHONE_LIST.map((p) => (
                <li key={p.tel}>
                  <span className="home-location-phone-name">{p.contactName}</span>
                  <a href={`tel:${p.tel}`}>{p.display}</a>
                </li>
              ))}
            </ul>
          </article>
        </div>
        <p className="home-locations-more">
          <Link to="/locations" className="btn btn-primary">
            Location &amp; details
          </Link>
        </p>
      </div>
    </section>
  );
}
