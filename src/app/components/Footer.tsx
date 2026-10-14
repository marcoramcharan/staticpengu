import { Link } from "react-router-dom";
import "../styles/components/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-brand-mark">
              <span className="footer-brand-icon" aria-hidden="true">🐧</span>
              <span className="footer-brand-text">
                static<span>pengu</span>
              </span>
            </div>
            <p className="footer-tagline">
              Free static site hosting — upload, share, done.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-link-group">
              <h3 className="footer-group-title">Product</h3>
              <ul>
                <li><Link to="/">Upload</Link></li>
                <li><Link to="/guide">Guide</Link></li>
              </ul>
            </div>

            <div className="footer-link-group">
              <h3 className="footer-group-title">Resources</h3>
              <ul>
                <li><Link to="/guide">Deployment guide</Link></li>
                <li><Link to="/guide">FAQ</Link></li>
              </ul>
            </div>

            <div className="footer-link-group">
              <h3 className="footer-group-title">Legal</h3>
              <ul>
                <li><a href="/legal">Privacy Policy</a></li>
                <li><a href="/legal">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} StaticPengu. All rights reserved.
          </p>
          <p className="footer-note">
            Sites auto-delete after 3 days 🐧 — save what you love.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;