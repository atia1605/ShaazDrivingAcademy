import { SITE, SITE_PHONE_LIST } from "../../site";

export function Locations() {
  return (
    <section id="locations" className="section section-alt">
      <div className="container">
        <h2>Location &amp; contact</h2>
        <p className="section-intro">
          One convenient <strong>Danforth</strong> address — we serve students from <strong>Toronto</strong>,{" "}
          <strong>Scarborough</strong>, and across the GTA. Call for current rates and availability.
        </p>
        <div className="grid-locations">
          <article className="card location-card">
            <h3>Toronto &amp; Scarborough</h3>
            <p>{SITE.address}</p>
            <p className="location-phones">
              {SITE_PHONE_LIST.map((p) => (
                <span key={p.tel} className="location-phone-line">
                  <span className="location-phone-name">{p.contactName}: </span>
                  <a href={`tel:${p.tel}`}>{p.display}</a>
                </span>
              ))}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
