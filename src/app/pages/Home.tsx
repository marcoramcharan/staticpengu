import { Link } from "react-router-dom";
import { useStore } from "../store/store";
import "../styles/pages/home.css";

const steps = [
  {
    icon: "📦",
    title: "Zip your site",
    text: "Bundle your HTML, CSS and JavaScript into a single ZIP file (up to 50 MB).",
  },
  {
    icon: "🏷️",
    title: "Name it",
    text: "Pick a site name and get a clean, shareable URL on staticpengu.b-cdn.net.",
  },
  {
    icon: "🚀",
    title: "Go live",
    text: "We unpack it, deploy it and serve it from the BunnyCDN edge. That's it.",
  },
];

const features = [
  {
    icon: "⚡",
    title: "Fast delivery",
    text: "Assets are served through BunnyCDN, so your site loads quickly wherever your visitors are.",
  },
  {
    icon: "🔗",
    title: "Your own URL",
    text: "Every site gets its own path, built from the name you choose. No config needed.",
  },
  {
    icon: "🗂️",
    title: "Simple dashboard",
    text: "See all your sites in one place, with page count, size and how many days are left.",
  },
  {
    icon: "🔐",
    title: "Personal accounts",
    text: "Sign up, log in and keep every site you deploy tied to your own account.",
  },
  {
    icon: "🧹",
    title: "Auto cleanup",
    text: "Demo sites are removed after 3 days, so nothing sits around forever.",
  },
  {
    icon: "📖",
    title: "Step-by-step guide",
    text: "New to zipping a site for hosting? The deployment guide walks you through it.",
  },
];

const stack = [
  "React",
  "TypeScript",
  "ExpressJS",
  "MongoDB",
  "BunnyCDN",
  "Docker",
];

const Home = () => {
  const user = useStore((s) => s.user);
  const loggedIn = Boolean(user);

  const primaryTo = loggedIn ? `/dashboard/${user?.id}` : "/signup";
  const primaryLabel = loggedIn ? "Go to dashboard" : "Get started free";

  return (
    <div className="home-page">
      {/* ---------- HERO ---------- */}
      <section className="lp-hero">
        <div className="lp-hero-main">
          <div className="brand">
            static<span>pengu</span>
          </div>

          <h1>Zip it. Upload it. It's live.</h1>
          <p className="subtitle">
            🐧 Static website hosting for HTML, CSS and JavaScript.
          </p>
          <p className="lp-lead">
            Drop in a ZIP file, pick a name and get a live URL in seconds. No
            servers to set up, no config files, no fuss.
          </p>

          <div className="lp-cta-row">
            <Link className="lp-btn" to={primaryTo}>
              {primaryLabel}
            </Link>
            {loggedIn ? (
              <Link className="lp-btn ghost" to="/guide">
                Read the guide
              </Link>
            ) : (
              <Link className="lp-btn ghost" to="/login">
                Log in
              </Link>
            )}
          </div>

          <div className="lp-pills">
            <span>ZIP in, URL out</span>
            <span>Max 50 MB</span>
            <span>Free demo</span>
          </div>
        </div>

        <aside className="home-pengu-side">
          <div className="home-notice">
            ⏳ Sites are <strong>automatically deleted after 3 days</strong>.
            This is a demo project, so save anything you want to keep.
          </div>

          <div className="home-pengu-stage">
            <div className="lp-url-chip" aria-hidden="true">
              🌐 staticpengu.b-cdn.net/<strong>my-portfolio</strong>/
            </div>
            <svg
              viewBox="0 0 400 500"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Cartoon penguin"
            >
              <ellipse cx="200" cy="320" rx="150" ry="170" fill="#2b2b3a" stroke="#1e1a2b" strokeWidth="10" />
              <ellipse cx="200" cy="350" rx="100" ry="120" fill="#fef7e9" stroke="#1e1a2b" strokeWidth="10" />
              <circle cx="200" cy="140" r="100" fill="#2b2b3a" stroke="#1e1a2b" strokeWidth="10" />
              <ellipse cx="200" cy="155" rx="70" ry="60" fill="#fef7e9" stroke="#1e1a2b" strokeWidth="10" />
              <circle cx="165" cy="130" r="20" fill="#ffffff" stroke="#1e1a2b" strokeWidth="8" />
              <circle cx="235" cy="130" r="20" fill="#ffffff" stroke="#1e1a2b" strokeWidth="8" />
              <circle cx="172" cy="134" r="9" fill="#1e1a2b" />
              <circle cx="242" cy="134" r="9" fill="#1e1a2b" />
              <circle cx="175" cy="130" r="3" fill="#ffffff" />
              <circle cx="245" cy="130" r="3" fill="#ffffff" />
              <path d="M185 165 L200 195 L215 165 Z" fill="#ffb347" stroke="#1e1a2b" strokeWidth="8" strokeLinejoin="round" />
              <circle cx="140" cy="175" r="14" fill="#ffb3b3" opacity="0.8" />
              <circle cx="260" cy="175" r="14" fill="#ffb3b3" opacity="0.8" />
              <path d="M70 250 Q30 310 60 400" fill="#2b2b3a" stroke="#1e1a2b" strokeWidth="10" strokeLinecap="round" />
              <path d="M330 250 Q370 310 340 400" fill="#2b2b3a" stroke="#1e1a2b" strokeWidth="10" strokeLinecap="round" />
              <ellipse cx="140" cy="475" rx="50" ry="25" fill="#ffb347" stroke="#1e1a2b" strokeWidth="10" />
              <ellipse cx="260" cy="475" rx="50" ry="25" fill="#ffb347" stroke="#1e1a2b" strokeWidth="10" />
              <path d="M110 475 L110 490 M170 475 L170 490" stroke="#1e1a2b" strokeWidth="6" strokeLinecap="round" />
              <path d="M230 475 L230 490 M290 475 L290 490" stroke="#1e1a2b" strokeWidth="6" strokeLinecap="round" />
              <path d="M130 70 Q200 10 270 70" fill="#ff5e5e" stroke="#1e1a2b" strokeWidth="10" strokeLinecap="round" />
              <circle cx="200" cy="30" r="18" fill="#fef7e9" stroke="#1e1a2b" strokeWidth="8" />
              <path d="M120 230 Q200 260 280 230" fill="none" stroke="#ff5e5e" strokeWidth="18" strokeLinecap="round" />
              <path d="M280 230 L300 280" stroke="#ff5e5e" strokeWidth="18" strokeLinecap="round" />
            </svg>
          </div>

          <p className="home-pengu-note">
            🐧 Static website hosting · HTML, CSS and JavaScript
          </p>
        </aside>
      </section>

      {/* ---------- HOW IT WORKS ---------- */}
      <section className="lp-section" id="how-it-works">
        <h2 className="lp-title">How it works</h2>
        <p className="lp-section-sub">Three steps from folder to live website.</p>

        <div className="lp-steps">
          {steps.map((step, i) => (
            <article className="lp-card lp-step" key={step.title}>
              <span className="lp-step-num">{i + 1}</span>
              <div className="lp-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- FEATURES ---------- */}
      <section className="lp-section">
        <h2 className="lp-title">Everything you need</h2>
        <p className="lp-section-sub">
          Just enough features to get a static site online, nothing more.
        </p>

        <div className="lp-features">
          {features.map((f, i) => (
            <article className={`lp-card lp-feature tone-${i % 3}`} key={f.title}>
              <div className="lp-icon small">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- BUILT WITH ---------- */}
      <section className="lp-section">
        <div className="lp-built">
          <h2 className="lp-title left">Built from scratch</h2>
          <p>
            StaticPengu is a personal portfolio project, built end to end: a
            React frontend, an ExpressJS API, MongoDB for storage, BunnyCDN for
            delivery and Docker for shipping it.
          </p>
          <div className="lp-stack">
            {stack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FINAL CTA ---------- */}
      <section className="lp-section lp-final">
        <div className="lp-final-card">
          <h2>Ready to deploy your first site?</h2>
          <p>It takes about a minute. Your ZIP is waiting.</p>
          <div className="lp-cta-row center">
            <Link className="lp-btn" to={primaryTo}>
              {primaryLabel}
            </Link>
            <Link className="lp-btn ghost" to="/guide">
              Read the guide
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;