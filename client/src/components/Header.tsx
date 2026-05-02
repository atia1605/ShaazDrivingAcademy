import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import { LogoImagePreview } from "./LogoImagePreview";
import {
  IconBook,
  IconCard,
  IconHelp,
  IconHome,
  IconInfo,
  IconMail,
  IconMapPin,
  IconUserPlus,
} from "./NavIcons";
import { SITE } from "../site";

const navClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "nav-link nav-link-icon active" : "nav-link nav-link-icon";

export function Header() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand">
          <LogoImagePreview imgClassName="brand-logo" width={44} height={44} />
          <Link to="/" className="brand-text-link" onClick={() => setMenuOpen(false)}>
            {SITE.name}
          </Link>
        </div>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-label={t("nav.toggle")}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`main-nav ${menuOpen ? "open" : ""}`}>
          <div className="main-nav-scroll">
            <ul className="nav-list">
              <li>
                <NavLink to="/" className={navClass} end onClick={() => setMenuOpen(false)}>
                  <IconHome /> {t("nav.home")}
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={navClass} onClick={() => setMenuOpen(false)}>
                  <IconInfo /> {t("nav.about")}
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
                  <IconBook /> {t("nav.courses")} <span className="caret" aria-hidden />
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/courses#certification-courses" onClick={() => setMenuOpen(false)}>
                      {t("nav.certification")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/courses#individual-lessons" onClick={() => setMenuOpen(false)}>
                      {t("nav.individualLessons")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/courses#classroom-training" onClick={() => setMenuOpen(false)}>
                      {t("nav.classroomTraining")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/courses#senior-courses" onClick={() => setMenuOpen(false)}>
                      {t("nav.seniors")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/courses#immigrant-courses" onClick={() => setMenuOpen(false)}>
                      {t("nav.newImmigrants")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/courses" onClick={() => setMenuOpen(false)}>
                      {t("nav.viewAllCourses")}
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <NavLink to="/locations" className={navClass} onClick={() => setMenuOpen(false)}>
                  <IconMapPin /> {t("nav.locations")}
                </NavLink>
              </li>
              <li>
                <NavLink to="/faq" className={navClass} onClick={() => setMenuOpen(false)}>
                  <IconHelp /> {t("nav.faq")}
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={navClass} onClick={() => setMenuOpen(false)}>
                  <IconMail /> {t("nav.contact")}
                </NavLink>
              </li>
              <li>
                <NavLink to="/pay" className={navClass} onClick={() => setMenuOpen(false)}>
                  <IconCard /> {t("nav.pay")}
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
                  <IconUserPlus /> {t("nav.register")}
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
