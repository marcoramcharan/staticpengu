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
                <rect x="3" y="3" width="58" height="58" rx="18" fill="#5cc8ff" stroke="#0a1a4f" strokeWidth="4" />
                <path d="M32 12 C43 12 49 21 49 31 C49 46 42 54 32 54 C22 54 15 46 15 31 C15 21 21 12 32 12Z" fill="#12307f" stroke="#0a1a4f" strokeWidth="3" />
                <path d="M32 28 C40 29 44 36 43 43 C42 50 38 53 32 53 C26 53 22 50 21 43 C20 36 24 29 32 28Z" fill="#fff" stroke="#0a1a4f" strokeWidth="2.5" />
                <ellipse cx="25.5" cy="24" rx="4.4" ry="5.2" fill="#fff" stroke="#0a1a4f" strokeWidth="2.5" />
                <ellipse cx="38.5" cy="24" rx="4.4" ry="5.2" fill="#fff" stroke="#0a1a4f" strokeWidth="2.5" />
                <circle cx="26.4" cy="25" r="2.2" fill="#0a1a4f" />
                <circle cx="37.6" cy="25" r="2.2" fill="#0a1a4f" />
                <path d="M28 29.5 Q32 27.5 36 29.5 Q35 34.5 32 35.5 Q29 34.5 28 29.5Z" fill="#ffb629" stroke="#0a1a4f" strokeWidth="2.2" strokeLinejoin="round" />
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