import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { LogoImagePreview } from "./LogoImagePreview";
import {
  IconBook,
  IconCard,
  IconCar,
  IconHelp,
  IconHome,
  IconInfo,
  IconMail,
  IconMapPin,
  IconUserPlus,
} from "./NavIcons";

const navClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "nav-link nav-link-icon active" : "nav-link nav-link-icon";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand">
          <LogoImagePreview imgClassName="brand-logo" width={44} height={44} />
          <Link to="/" className="brand-text-link" onClick={() => setMenuOpen(false)}>
            Shaaz Driving Academy
          </Link>
        </div>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`main-nav ${menuOpen ? "open" : ""}`}>
          <ul className="nav-list">
            <li>
              <NavLink to="/" className={navClass} end onClick={() => setMenuOpen(false)}>
                <IconHome /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navClass} onClick={() => setMenuOpen(false)}>
                <IconInfo /> About
              </NavLink>
            </li>
            <li className="has-dropdown">
              <NavLink
                to="/courses"
                className={({ isActive }) =>
                  `nav-link nav-link-icon dropdown-trigger${isActive ? " active" : ""}`
                }
                onClick={() => setMenuOpen(false)}
              >
                <IconBook /> Courses <span className="caret" aria-hidden />
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/courses#certification-courses" onClick={() => setMenuOpen(false)}>
                    Certification
                  </Link>
                </li>
                <li>
                  <Link to="/courses#individual-lessons" onClick={() => setMenuOpen(false)}>
                    Individual lessons
                  </Link>
                </li>
                <li>
                  <Link to="/courses#classroom-training" onClick={() => setMenuOpen(false)}>
                    Classroom training
                  </Link>
                </li>
                <li>
                  <Link to="/courses#senior-courses" onClick={() => setMenuOpen(false)}>
                    Seniors
                  </Link>
                </li>
                <li>
                  <Link to="/courses#immigrant-courses" onClick={() => setMenuOpen(false)}>
                    New immigrants
                  </Link>
                </li>
                <li>
                  <Link to="/courses" onClick={() => setMenuOpen(false)}>
                    View all courses
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <NavLink to="/locations" className={navClass} onClick={() => setMenuOpen(false)}>
                <IconMapPin /> Locations
              </NavLink>
            </li>
            <li>
              <NavLink to="/vehicle" className={navClass} onClick={() => setMenuOpen(false)}>
                <IconCar /> Vehicle
              </NavLink>
            </li>
            <li>
              <NavLink to="/faq" className={navClass} onClick={() => setMenuOpen(false)}>
                <IconHelp /> FAQ
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={navClass} onClick={() => setMenuOpen(false)}>
                <IconMail /> Contact
              </NavLink>
            </li>
            <li>
              <NavLink to="/pay" className={navClass} onClick={() => setMenuOpen(false)}>
                <IconCard /> Pay
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `nav-link nav-link-icon nav-cta${isActive ? " active" : ""}`
                }
                onClick={() => setMenuOpen(false)}
              >
                <IconUserPlus /> Register
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
