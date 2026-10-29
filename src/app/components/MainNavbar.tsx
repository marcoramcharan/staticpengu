import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { useStore2 } from "../store/store2";
import "../styles/components/navbar.css";

const SECTION_LINKS = [
  { id: "how-it-works", label: "How it works" },
  { id: "features", label: "Features" },
];

// Styles for the logged-in bits (kept here so navbar.css doesn't need editing).
const css = `
.navbar-user { display: inline-flex; align-items: center; max-width: 220px; padding: 5px 14px; border-radius: 999px; font-size: 13px; font-weight: 800; color: var(--sp-ink); background: var(--sp-pale); border: 3px solid var(--sp-ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.navbar-logout { padding: 6px 18px; border-radius: 999px; font-family: var(--sp-display); font-size: 16px; font-weight: 800; color: var(--sp-ink); background: #fff; border: 3px solid var(--sp-ink); box-shadow: 0 4px 0 var(--sp-ink); cursor: pointer; transition: transform .12s, box-shadow .12s, opacity .2s; }
.navbar-logout:hover:not(:disabled) { transform: translateY(2px); box-shadow: 0 2px 0 var(--sp-ink); }
.navbar-logout:active:not(:disabled) { transform: translateY(4px); box-shadow: 0 0 0 var(--sp-ink); }
.navbar-logout:disabled { opacity: .5; cursor: not-allowed; }
.navbar-logout:focus-visible { outline: 3px solid var(--sp-sun); outline-offset: 3px; }
.navbar-menu-user { margin: 0 0 4px; font-size: 14px; font-weight: 800; color: var(--sp-pale); text-align: center; overflow-wrap: anywhere; }
button.navbar-menu-btn { font: inherit; font-family: var(--sp-display); font-weight: 800; cursor: pointer; }
@media (max-width: 860px) { .navbar-user, .navbar-logout { display: none; } }
`;

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = useStore2((s) => s.user);
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const dashboardPath = user?.id ? `/dashboard/${user.id}` : "/login";

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

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    setOpen(false);
    try {
      // clear the server cookie; even if this fails we still log out locally
      await api("/api/auth/logout", { method: "POST" });
    } finally {
      useStore2.getState().logout();
      setLoggingOut(false);
      navigate("/login", { replace: true });
    }
  };

  const linkClass = (to: string) =>
    `navbar-link${pathname === to ? " active" : ""}`;

  return (
    <>
      <style>{css}</style>
      <nav className="navbar">
        <div className="navbar-in">
          <Link to="/" className="navbar-brand" aria-label="StaticPengu home">
            <svg
              className="navbar-brand-icon"
              viewBox="0 0 64 64"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="58" height="58" rx="18" fill="#5cc8ff" stroke="#0a1a4f" strokeWidth="4" />
              <path d="M32 12 C43 12 49 21 49 31 C49 46 42 54 32 54 C22 54 15 46 15 31 C15 21 21 12 32 12Z" fill="#12307f" stroke="#0a1a4f" strokeWidth="3" />
              <path d="M32 28 C40 29 44 36 43 43 C42 50 38 53 32 53 C26 53 22 50 21 43 C20 36 24 29 32 28Z" fill="#fff" stroke="#0a1a4f" strokeWidth="2.5" />
              <ellipse cx="25.5" cy="24" rx="4.4" ry="5.2" fill="#fff" stroke="#0a1a4f" strokeWidth="2.5" />
              <ellipse cx="38.5" cy="24" rx="4.4" ry="5.2" fill="#fff" stroke="#0a1a4f" strokeWidth="2.5" />
              <circle cx="26.4" cy="25" r="2.2" fill="#0a1a4f" />
              <circle cx="37.6" cy="25" r="2.2" fill="#0a1a4f" />
              <path d="M28 29.5 Q32 27.5 36 29.5 Q35 34.5 32 35.5 Q29 34.5 28 29.5Z" fill="#ffb629" stroke="#0a1a4f" strokeWidth="2.2" strokeLinejoin="round" />
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
            {user && (
              <Link
                to={dashboardPath}
                className={`navbar-link${pathname.startsWith("/dashboard") ? " active" : ""}`}
              >
                Dashboard
              </Link>
            )}
          </div>

          <div className="navbar-actions">
            {user ? (
              <>
                <span className="navbar-user" title={user.email}>
                  {user.email ?? `User #${user.id}`}
                </span>
                <button
                  type="button"
                  className="navbar-logout"
                  onClick={handleLogout}
                  disabled={loggingOut}
                >
                  {loggingOut ? "Logging out..." : "Log out"}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={linkClass("/login")}>
                  Login
                </Link>
                <Link to="/signup" className="navbar-cta">
                  Signup
                </Link>
              </>
            )}

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
          {user ? (
            <>
              <p className="navbar-menu-user">{user.email ?? `User #${user.id}`}</p>
              <Link to={dashboardPath} className="navbar-menu-btn">
                Dashboard
              </Link>
              <button
                type="button"
                className="navbar-menu-btn ghost"
                onClick={handleLogout}
                disabled={loggingOut}
              >
                {loggingOut ? "Logging out..." : "Log out"}
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="navbar-menu-btn">
                Get started free
              </Link>
              <Link to="/login" className="navbar-menu-btn ghost">
                Log in
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;