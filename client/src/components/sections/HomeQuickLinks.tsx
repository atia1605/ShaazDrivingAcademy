import { Link } from "react-router-dom";
import {
  IconBook,
  IconCar,
  IconHelp,
  IconInfo,
  IconMail,
  IconMapPin,
} from "../NavIcons";

const links = [
  { to: "/about", label: "About us", Icon: IconInfo, desc: "Who we are" },
  { to: "/courses", label: "Courses", Icon: IconBook, desc: "BDE & lessons" },
  { to: "/locations", label: "Locations", Icon: IconMapPin, desc: "Visit us" },
  { to: "/vehicle", label: "Vehicle for hire", Icon: IconCar, desc: "PTC program" },
  { to: "/faq", label: "FAQ", Icon: IconHelp, desc: "Common questions" },
  { to: "/contact", label: "Contact", Icon: IconMail, desc: "Get in touch" },
] as const;

export function HomeQuickLinks() {
  return (
    <section className="section section-quicklinks" aria-labelledby="quicklinks-heading">
      <div className="container">
        <h2 id="quicklinks-heading" className="quicklinks-title">
          Explore
        </h2>
        <p className="section-intro">Jump to a topic — each section has its own page.</p>
        <ul className="quicklinks-grid">
          {links.map(({ to, label, Icon, desc }) => (
            <li key={to}>
              <Link to={to} className="quicklink-card">
                <span className="quicklink-icon" aria-hidden>
                  <Icon />
                </span>
                <span className="quicklink-label">{label}</span>
                <span className="quicklink-desc">{desc}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
