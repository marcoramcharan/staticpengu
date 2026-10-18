import { Link, useLocation } from "react-router-dom";
import "../styles/components/navbar.css";

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand" aria-label="StaticPengu home">
        <span className="navbar-brand-icon" aria-hidden="true">
          🐧
        </span>
        <span className="navbar-brand-text">
          static<span>pengu</span>
        </span>
      </Link>

      <div className="navbar-links">
        <Link
          to="/login"
          className={`navbar-link${pathname === "/login" ? " active" : ""}`}
        >
          Login
        </Link>
        <Link
          to="/signup"
          className={`navbar-link${pathname === "/signup" ? " active" : ""}`}
        >
          Signup
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;