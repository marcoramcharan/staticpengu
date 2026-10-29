import { useEffect, useMemo, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useStore } from "../store/store";
import "../styles/pages/home.css";

const steps = [
  {
    title: "Zip your site",
    text: "Bundle your HTML, CSS and JavaScript into a single ZIP file (up to 50 MB).",
  },
  {
    title: "Name it",
    text: "Pick a site name and get a clean, shareable URL on staticpengu.b-cdn.net.",
  },
  {
    title: "Go live",
    text: "We unpack it, deploy it and serve it from the BunnyCDN edge. That's it.",
  },
];

type Feature = {
  icon: ReactNode;
  title: string;
  text: string;
  variant?: "big" | "light" | "wide";
};

const features: Feature[] = [
  {
    variant: "big",
    icon: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />,
    title: "Fast delivery",
    text: "Assets are served through BunnyCDN, so your site loads quickly wherever your visitors are.",
  },
  {
    icon: (
      <path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3A4 4 0 0011 18.7l1-1" />
    ),
    title: "Your own URL",
    text: "Every site gets its own path, built from the name you choose. No config needed.",
  },
  {
    variant: "light",
    icon: (
      <>
        <rect x="3" y="3" width="7.5" height="7.5" rx="2" />
        <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" />
        <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" />
        <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" />
      </>
    ),
    title: "Simple dashboard",
    text: "See all your sites in one place, with page count, size and how many days are left.",
  },
  {
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
      </>
    ),
    title: "Personal accounts",
    text: "Sign up, log in and keep every site you deploy tied to your own account.",
  },
  {
    icon: <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6" />,
    title: "Auto cleanup",
    text: "Demo sites are removed after 3 days, so nothing sits around forever.",
  },
  {
    variant: "wide",
    icon: (
      <path d="M4 5.5C4 4.7 4.7 4 5.5 4H11v16H5.5C4.7 20 4 19.3 4 18.5v-13zM20 5.5c0-.8-.7-1.5-1.5-1.5H13v16h5.5c.8 0 1.5-.7 1.5-1.5v-13z" />
    ),
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

const STEPS = ["Zip uploaded", "Unpacked", "Deployed to the BunnyCDN edge"];
const PROGRESS = [0, 34, 68, 100, 100];

/* twinkly cartoon stars scattered in the dark sections */
const STARS = [
  { left: "5%", top: "12%", size: 22, delay: "0s" },
  { left: "44%", top: "7%", size: 18, delay: ".6s" },
  { left: "91%", top: "16%", size: 24, delay: "1.2s" },
  { left: "52%", top: "58%", size: 14, delay: ".3s" },
  { left: "3%", top: "62%", size: 16, delay: "1.6s" },
  { left: "70%", top: "80%", size: 18, delay: ".9s" },
];

/* wavy section edges: [open top curve] — the fill is closed off below it */
const WAVE_PATHS = [
  "M0 70 C180 10 320 120 520 70 C720 20 860 120 1060 70 C1220 30 1340 60 1440 40",
  "M0 50 C200 110 360 0 580 50 C800 100 980 10 1200 60 C1320 85 1400 60 1440 70",
  "M0 60 C240 0 400 120 640 60 C880 0 1060 110 1260 50 C1350 25 1410 50 1440 45",
  "M0 40 C220 100 420 0 660 55 C900 110 1100 20 1300 60 C1380 76 1420 60 1440 55",
];

/** Cartoon wave that sits at the bottom of a section and takes the colour
 *  of the section underneath it. */
const Wave = ({ fill, variant }: { fill: string; variant: number }) => {
  const d = WAVE_PATHS[variant % WAVE_PATHS.length];
  return (
    <div className="hp-wave" aria-hidden="true">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d={`${d} L1440 126 L0 126 Z`} fill={fill} />
        <path
          d={d}
          fill="none"
          stroke="#0a1a4f"
          strokeWidth="5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
};

const Cloud = ({
  className,
  fill = "#fff",
}: {
  className: string;
  fill?: string;
}) => (
  <svg className={`hp-cloud ${className}`} viewBox="0 0 180 70" aria-hidden="true">
    <path
      d="M20 62 C-4 62 -4 32 22 32 C26 8 62 4 72 24 C84 6 120 10 124 34 C152 30 164 62 138 62Z"
      fill={fill}
      stroke="#0a1a4f"
      strokeWidth="5"
      strokeLinejoin="round"
    />
  </svg>
);

const Check = () => (
  <svg
    viewBox="0 0 12 12"
    fill="none"
    stroke="#0a1a4f"
    strokeWidth="2.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2.5 6.5l2.3 2.3L9.5 3.8" />
  </svg>
);

/** Little cartoon card that loops an upload -> live animation. */
const DeployCard = () => {
  // 0 = idle, 1..3 = steps done, 4 = live
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(4);
      return;
    }

    const timers: number[] = [];
    const later = (fn: () => void, ms: number) =>
      timers.push(window.setTimeout(fn, ms));

    const run = () => {
      setStep(0);
      later(() => setStep(1), 700);
      later(() => setStep(2), 1900);
      later(() => setStep(3), 3100);
      later(() => setStep(4), 4100);
      later(run, 9500);
    };

    run();
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  return (
    <div
      className={`hp-deploy${step >= 4 ? " is-done" : ""}`}
      aria-label="Deployment preview"
    >
      <div className="hp-row">
        <div className="hp-file">ZIP</div>
        <div>
          <div className="hp-nm">my-portfolio.zip</div>
          <div className="hp-sz">
            Static website hosting · HTML, CSS and JavaScript
          </div>
        </div>
      </div>

      <div className="hp-bar">
        <i style={{ width: `${PROGRESS[step]}%` }} />
      </div>

      <ul>
        {STEPS.map((label, i) => (
          <li key={label} className={step > i ? "is-on" : ""}>
            <span className="hp-ck">
              <Check />
            </span>
            {label}
          </li>
        ))}
      </ul>

      <div className="hp-url">
        <span>
          staticpengu.b-cdn.net/<b>my-portfolio/</b>
        </span>
        <span className="hp-live">LIVE</span>
      </div>
    </div>
  );
};

/** The hero penguin standing on his ice floe. Defines the shared artwork
 *  (#hp-penguin) that the closing call-to-action also re-uses. */
const PenguinScene = () => (
  <svg
    className="hp-pengu"
    viewBox="0 0 380 380"
    role="img"
    aria-label="Illustration of a cartoon penguin standing on an ice floe"
  >
    <defs>
      <g id="hp-penguin">
        {/* feet */}
        <ellipse cx="85" cy="288" rx="32" ry="13" fill="#ff8a1f" stroke="#0a1a4f" strokeWidth="6" />
        <ellipse cx="175" cy="288" rx="32" ry="13" fill="#ff8a1f" stroke="#0a1a4f" strokeWidth="6" />
        {/* flippers */}
        <path d="M38 150 C-5 190 5 240 38 245 C55 215 60 180 55 150Z" fill="#1a46b8" stroke="#0a1a4f" strokeWidth="6" strokeLinejoin="round" />
        <path d="M222 150 C265 190 255 240 222 245 C205 215 200 180 205 150Z" fill="#1a46b8" stroke="#0a1a4f" strokeWidth="6" strokeLinejoin="round" />
        {/* body */}
        <path d="M130 20 C60 20 32 90 32 170 C32 250 70 290 130 290 C190 290 228 250 228 170 C228 90 200 20 130 20Z" fill="#1a46b8" stroke="#0a1a4f" strokeWidth="7" />
        {/* belly */}
        <path d="M130 90 C85 100 68 160 72 205 C76 258 100 280 130 280 C160 280 184 258 188 205 C192 160 175 100 130 90Z" fill="#f4fbff" stroke="#0a1a4f" strokeWidth="5" />
        {/* face patch */}
        <path d="M130 60 C90 50 70 85 85 115 C100 105 118 108 130 120 C142 108 160 105 175 115 C190 85 170 50 130 60Z" fill="#f4fbff" stroke="#0a1a4f" strokeWidth="5" />
        {/* eyes */}
        <ellipse cx="102" cy="88" rx="17" ry="21" fill="#fff" stroke="#0a1a4f" strokeWidth="5" />
        <ellipse cx="158" cy="88" rx="17" ry="21" fill="#fff" stroke="#0a1a4f" strokeWidth="5" />
        <circle cx="106" cy="92" r="10" fill="#0a1a4f" />
        <circle cx="154" cy="92" r="10" fill="#0a1a4f" />
        <circle cx="110" cy="87" r="4" fill="#fff" />
        <circle cx="158" cy="87" r="4" fill="#fff" />
        {/* brows */}
        <path d="M86 62 Q102 54 116 64" stroke="#0a1a4f" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M144 64 Q158 54 174 62" stroke="#0a1a4f" strokeWidth="5" fill="none" strokeLinecap="round" />
        {/* beak */}
        <path d="M112 108 Q130 98 148 108 Q146 134 130 138 Q114 134 112 108Z" fill="#ffb629" stroke="#0a1a4f" strokeWidth="5" strokeLinejoin="round" />
        <path d="M118 114 Q130 118 142 114" stroke="#0a1a4f" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* blush */}
        <ellipse cx="80" cy="118" rx="10" ry="6" fill="#ff9fb4" opacity=".7" />
        <ellipse cx="180" cy="118" rx="10" ry="6" fill="#ff9fb4" opacity=".7" />
        {/* belly shine */}
        <path d="M96 170 Q92 200 100 226" stroke="#c9efff" strokeWidth="7" fill="none" strokeLinecap="round" />
      </g>
    </defs>

    {/* ice floe */}
    <g transform="translate(20,300)">
      <path d="M10 30 L70 8 L270 8 L330 30 L290 60 L50 60Z" fill="#c9efff" stroke="#0a1a4f" strokeWidth="6" strokeLinejoin="round" />
      <path d="M70 8 L110 30 L50 60 M270 8 L230 30 L290 60 M110 30 L230 30" fill="none" stroke="#0a1a4f" strokeWidth="4" strokeLinejoin="round" />
    </g>

    {/* penguin */}
    <g transform="translate(60,22)">
      <use href="#hp-penguin" />
    </g>
  </svg>
);

const Home = () => {
  const user = useStore((s) => s.user);
  const { hash } = useLocation();
  const loggedIn = Boolean(user);

  const primaryTo = loggedIn ? `/dashboard/${user?.id}` : "/signup";
  const primaryLabel = loggedIn ? "Go to dashboard" : "Get started free";

  // arriving from another page via /#features etc.
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (!el) return;
    const t = window.setTimeout(
      () => el.scrollIntoView({ behavior: "smooth" }),
      50
    );
    return () => window.clearTimeout(t);
  }, [hash]);

  // falling snow (generated once)
  const flakes = useMemo(
    () =>
      Array.from({ length: 34 }, () => {
        const size = 4 + Math.random() * 7;
        return {
          left: `${Math.random() * 100}%`,
          width: size,
          height: size,
          opacity: 0.35 + Math.random() * 0.55,
          animationDuration: `${9 + Math.random() * 14}s`,
          animationDelay: `-${Math.random() * 20}s`,
          "--dx": `${Math.random() * 80 - 40}px`,
        } as CSSProperties;
      }),
    []
  );

  return (
    <div className="home-page">
      {/* ---------- HERO ---------- */}
      <header className="hp-hero">
        <div className="hp-hero-bg" />
        <div className="hp-snow" aria-hidden="true">
          {flakes.map((style, i) => (
            <i key={i} style={style} />
          ))}
        </div>
        {STARS.map((s, i) => (
          <span
            key={i}
            className="hp-star"
            aria-hidden="true"
            style={{
              left: s.left,
              top: s.top,
              fontSize: s.size,
              animationDelay: s.delay,
            }}
          >
            ✦
          </span>
        ))}
        <Cloud className="hp-cloud--a" />
        <Cloud className="hp-cloud--b" fill="#c9efff" />

        <div className="lp-wrap">
          <div className="hp-hero-in">
            <div>
              <span className="hp-eyebrow">
                <i />
                Free demo · Max 50 MB
              </span>

              <h1>
                <span>Zip it.</span>
                <span>Upload it.</span>
                <span className="hp-grad">It's live.</span>
              </h1>

              <p className="hp-tag">
                Static website hosting for HTML, CSS and JavaScript.
              </p>
              <p className="hp-lead">
                Drop in a ZIP file, pick a name and get a live URL in seconds.
                No servers to set up, no config files, no fuss.
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

              <div className="hp-pills">
                <span>ZIP in, URL out</span>
                <span>Max 50 MB</span>
                <span>Free demo</span>
              </div>

              <div className="hp-note">
                Sites are <strong>automatically deleted after 3 days</strong>.
                This is a demo project, so save anything you want to keep.
              </div>
            </div>

            <aside className="hp-stage">
              <div className="hp-glow" />
              <div className="hp-disc" />
              <PenguinScene />
              <DeployCard />
            </aside>
          </div>
        </div>

        <Wave fill="#eefaff" variant={0} />
      </header>

      {/* ---------- HOW IT WORKS ---------- */}
      <section className="hp-how" id="how-it-works">
        <div className="lp-wrap">
          <div className="hp-head">
            <span className="hp-kicker">Simple by design</span>
            <h2>How it works</h2>
            <p>Three steps from folder to live website.</p>
          </div>

          <div className="hp-steps">
            {steps.map((step, i) => (
              <article className="hp-step" key={step.title}>
                <span className="hp-step-n">{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>

        <Wave fill="#12307f" variant={1} />
      </section>

      {/* ---------- FEATURES ---------- */}
      <section className="hp-feat" id="features">
        <span className="hp-bubble hp-bubble--a" aria-hidden="true" />
        <span className="hp-bubble hp-bubble--b" aria-hidden="true" />
        <span className="hp-bubble hp-bubble--c" aria-hidden="true" />

        <div className="lp-wrap">
          <div className="hp-head">
            <h2>Everything you need</h2>
            <p>Just enough features to get a static site online, nothing more.</p>
          </div>

          <div className="hp-grid">
            {features.map((f) => (
              <article
                className={`hp-card${f.variant ? ` hp-card--${f.variant}` : ""}`}
                key={f.title}
              >
                <div className="hp-card-ic">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    {f.icon}
                  </svg>
                </div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </article>
            ))}
          </div>
        </div>

        <Wave fill="#c9efff" variant={2} />
      </section>

      {/* ---------- BUILT WITH ---------- */}
      <section className="hp-built">
        <div className="lp-wrap">
          <div className="hp-built-box">
            <h2>
              Built from <span>scratch</span>
            </h2>
            <p>
              StaticPengu is a personal portfolio project, built end to end: a
              React frontend, an ExpressJS API, MongoDB for storage, BunnyCDN
              for delivery and Docker for shipping it.
            </p>
            <div className="hp-stack">
              {stack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </div>
        </div>

        <Wave fill="#1a46b8" variant={3} />
      </section>

      {/* ---------- FINAL CTA ---------- */}
      <section className="hp-final">
        {STARS.slice(0, 3).map((s, i) => (
          <span
            key={i}
            className="hp-star"
            aria-hidden="true"
            style={{
              left: s.left,
              top: s.top,
              fontSize: s.size,
              animationDelay: s.delay,
            }}
          >
            ✦
          </span>
        ))}

        <div className="lp-wrap">
          <div className="hp-final-in">
            <div>
              <h2>
                Ready to deploy <span>your first site?</span>
              </h2>
              <p>It takes about a minute. Your ZIP is waiting.</p>
              <div className="lp-cta-row">
                <Link className="lp-btn" to={primaryTo}>
                  {primaryLabel}
                </Link>
                <Link className="lp-btn ghost" to="/guide">
                  Read the guide
                </Link>
              </div>
            </div>

            <div className="hp-peek" aria-hidden="true">
              <svg viewBox="-10 0 280 310">
                <use href="#hp-penguin" />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;