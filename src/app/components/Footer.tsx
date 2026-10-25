import { Link } from "react-router-dom";
import "../styles/components/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-brand-mark">
              <svg
                className="footer-brand-icon"
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
              <span className="footer-brand-text">
                Static<span>Pengu</span>
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
      </div>

      <div className="footer-wordmark" aria-hidden="true">
        StaticPengu
      </div>

      <div className="footer-container">
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