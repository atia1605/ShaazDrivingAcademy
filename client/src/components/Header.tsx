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
              <a href="#about" onClick={() => setMenuOpen(false)}>
                About
              </a>
            </li>
            <li className="has-dropdown">
              <span className="dropdown-trigger">
                Courses <span className="caret" aria-hidden />
              </span>
              <ul className="dropdown-menu">
                <li>
                  <a href="#certification-courses" onClick={() => setMenuOpen(false)}>
                    Certification
                  </a>
                </li>
                <li>
                  <a href="#individual-lessons" onClick={() => setMenuOpen(false)}>
                    Individual lessons
                  </a>
                </li>
                <li>
                  <a href="#classroom-training" onClick={() => setMenuOpen(false)}>
                    Classroom training
                  </a>
                </li>
                <li>
                  <a href="#senior-courses" onClick={() => setMenuOpen(false)}>
                    Seniors
                  </a>
                </li>
                <li>
                  <a href="#immigrant-courses" onClick={() => setMenuOpen(false)}>
                    New immigrants
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#locations" onClick={() => setMenuOpen(false)}>
                Locations
              </a>
            </li>
            <li>
              <a href="#vehicle" onClick={() => setMenuOpen(false)}>
                Vehicle for hire
              </a>
            </li>
            <li>
              <a href="#faq" onClick={() => setMenuOpen(false)}>
                FAQ
              </a>
            </li>
            <li>
              <a href="#contact" onClick={() => setMenuOpen(false)}>
                Contact
              </a>
            </li>
            <li>
              <NavLink to="/register" className={navClass} onClick={() => setMenuOpen(false)}>
                Register online
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
