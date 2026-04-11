import { Link } from "react-router-dom";
import { SITE } from "../../site";

export function HomeLocationsStrip() {
  return (
    <section
      className="section section-alt home-locations-strip section-home-last"
      aria-labelledby="home-locations-strip-heading"
    >
      <div className="container">
        <h2 id="home-locations-strip-heading">Our locations</h2>
        <p className="section-intro">
          Ministry-approved training with convenient <strong>GTA</strong> access — Toronto (Danforth) and Scarborough.
        </p>
        <div className="home-locations-grid">
          <article className="home-location-card">
            <h3>Toronto</h3>
            <p className="home-location-address">{SITE.address}</p>
            <p>
              <a href={`tel:${SITE.phonePrimary.tel}`}>{SITE.phonePrimary.display}</a>
            </p>
          </article>
          <article className="home-location-card">
            <h3>Scarborough</h3>
            <p className="home-location-address">{SITE.locationScarborough}</p>
            <p>
              <a href={`tel:${SITE.phoneSecondary.tel}`}>{SITE.phoneSecondary.display}</a>
            </p>
          </article>
        </div>
        <p className="home-locations-more">
          <Link to="/locations" className="btn btn-primary">
            Locations &amp; details
          </Link>
        </p>
      </div>
    </section>
  );
}
