import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/components/navbar.css";

const SECTION_LINKS = [
  { id: "how-it-works", label: "How it works" },
  { id: "features", label: "Features" },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  // close the menu whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // lock page scroll + Escape to close while the menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // if the window grows past the mobile breakpoint, drop the menu
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 861px)");
    const onChange = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // already on the homepage -> smooth-scroll instead of navigating
  const goSection = (e: MouseEvent, id: string) => {
    setOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const linkClass = (to: string) =>
    `navbar-link${pathname === to ? " active" : ""}`;

  return (
    <>
      <nav className="navbar">
        <div className="navbar-in">
          <Link to="/" className="navbar-brand" aria-label="StaticPengu home">
            <svg
              className="navbar-brand-icon"
              viewBox="0 0 64 64"
              aria-hidden="true"
            >
              <rect width="64" height="64" rx="18" fill="#0f1b45" />
              <rect x=".75" y=".75" width="62.5" height="62.5" rx="17.25" fill="none" stroke="#7cc8ff" strokeOpacity=".5" strokeWidth="1.5" />
              <path d="M32,12 C42,12 46,20 46,28 C52,36 52,50 32,56 C12,50 12,36 18,28 C18,20 22,12 32,12 Z" fill="#0b1536" />
              <path d="M32,30 C41,30 45,38 45,44 C45,50 40,55 32,55 C24,55 19,50 19,44 C19,38 23,30 32,30 Z" fill="#fff" />
              <ellipse cx="25" cy="24" rx="3" ry="3.4" fill="#fff" />
              <ellipse cx="39" cy="24" rx="3" ry="3.4" fill="#fff" />
              <circle cx="25.4" cy="24.4" r="1.4" fill="#05070f" />
              <circle cx="38.6" cy="24.4" r="1.4" fill="#05070f" />
              <path d="M28.5,29 L35.5,29 L32,36 Z" fill="#ffb347" />
            </svg>
            <span className="navbar-brand-text">
              Static<span>Pengu</span>
            </span>
          </Link>

          <div className="navbar-links">
            {SECTION_LINKS.map((l) => (
              <Link
                key={l.id}
                to={{ pathname: "/", hash: `#${l.id}` }}
                className="navbar-link"
                onClick={(e) => goSection(e, l.id)}
              >
                {l.label}
              </Link>
            ))}
            <Link to="/guide" className={linkClass("/guide")}>
              Guide
            </Link>
            <Link to="/guide" className="navbar-link">
              FAQ
            </Link>
          </div>

          <div className="navbar-actions">
            <Link to="/login" className={linkClass("/login")}>
              Login
            </Link>
            <Link to="/signup" className="navbar-cta">
              Signup
            </Link>

            <button
              type="button"
              className={`navbar-burger${open ? " open" : ""}`}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="navbar-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <div
        id="navbar-menu"
        className={`navbar-menu${open ? " open" : ""}`}
        aria-hidden={!open}
      >
        <div className="navbar-menu-links">
          {SECTION_LINKS.map((l, i) => (
            <Link
              key={l.id}
              to={{ pathname: "/", hash: `#${l.id}` }}
              onClick={(e) => goSection(e, l.id)}
            >
              <small>0{i + 1}</small>
              {l.label}
            </Link>
          ))}
          <Link to="/guide">
            <small>03</small>Guide
          </Link>
          <Link to="/guide">
            <small>04</small>FAQ
          </Link>
        </div>

        <div className="navbar-menu-bottom">
          <Link to="/signup" className="navbar-menu-btn">
            Get started free
          </Link>
          <Link to="/login" className="navbar-menu-btn ghost">
            Log in
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;