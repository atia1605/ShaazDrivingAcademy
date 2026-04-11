import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "nav-link active" : "nav-link";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark" aria-hidden />
          Shaaz Driving Academy
        </Link>
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
              <Link to="/#about" onClick={() => setMenuOpen(false)}>
                About
              </Link>
            </li>
            <li className="has-dropdown">
              <span className="dropdown-trigger">
                Courses <span className="caret" aria-hidden />
              </span>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/#certification-courses" onClick={() => setMenuOpen(false)}>
                    Certification
                  </Link>
                </li>
                <li>
                  <Link to="/#individual-lessons" onClick={() => setMenuOpen(false)}>
                    Individual lessons
                  </Link>
                </li>
                <li>
                  <Link to="/#classroom-training" onClick={() => setMenuOpen(false)}>
                    Classroom training
                  </Link>
                </li>
                <li>
                  <Link to="/#senior-courses" onClick={() => setMenuOpen(false)}>
                    Seniors
                  </Link>
                </li>
                <li>
                  <Link to="/#immigrant-courses" onClick={() => setMenuOpen(false)}>
                    New immigrants
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#locations" onClick={() => setMenuOpen(false)}>
                Locations
              </Link>
            </li>
            <li>
              <Link to="/#vehicle" onClick={() => setMenuOpen(false)}>
                Vehicle for hire
              </Link>
            </li>
            <li>
              <Link to="/#faq" onClick={() => setMenuOpen(false)}>
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/#contact" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
            </li>
            <li>
              <NavLink to="/pay" className={navClass} onClick={() => setMenuOpen(false)}>
                Pay online
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) => `nav-link nav-cta${isActive ? " active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                Register
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
