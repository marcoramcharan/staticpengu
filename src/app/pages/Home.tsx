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

const Check = () => (
  <svg
    viewBox="0 0 12 12"
    fill="none"
    stroke="#03102e"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2.5 6.5l2.3 2.3L9.5 3.8" />
  </svg>
);

/** Little glass card that loops an upload -> live animation. */
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

/** The hero penguin standing on his iceberg. Defines the shared artwork
 *  (#hp-penguin) that the closing call-to-action also re-uses. */
const PenguinScene = () => (
  <svg
    className="hp-pengu"
    viewBox="0 0 640 830"
    role="img"
    aria-label="Illustration of an emperor penguin standing on an iceberg"
  >
    <defs>
      <linearGradient id="hp-gBody" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#27396f" /><stop offset=".35" stopColor="#0f1b45" /><stop offset="1" stopColor="#040815" />
      </linearGradient>
      <linearGradient id="hp-gRim" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#7cc8ff" stopOpacity=".5" /><stop offset=".14" stopColor="#7cc8ff" stopOpacity="0" />
        <stop offset=".82" stopColor="#4fd8ff" stopOpacity="0" /><stop offset="1" stopColor="#9ee6ff" stopOpacity=".75" />
      </linearGradient>
      <radialGradient id="hp-gHeadShine" cx=".38" cy=".22" r=".5">
        <stop offset="0" stopColor="#8fb0ff" stopOpacity=".55" /><stop offset="1" stopColor="#8fb0ff" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="hp-gBelly" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffe9ae" /><stop offset=".2" stopColor="#fff6e0" /><stop offset=".42" stopColor="#ffffff" /><stop offset=".8" stopColor="#d6ebff" /><stop offset="1" stopColor="#a9cdef" />
      </linearGradient>
      <radialGradient id="hp-gBellyShade" cx=".5" cy=".5" r=".62">
        <stop offset=".5" stopColor="#2a56b8" stopOpacity="0" /><stop offset="1" stopColor="#1b3f9a" stopOpacity=".55" />
      </radialGradient>
      <radialGradient id="hp-gEar" cx=".5" cy=".5" r=".5">
        <stop offset="0" stopColor="#ff9a12" /><stop offset=".55" stopColor="#ffc247" /><stop offset="1" stopColor="#ffe08a" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="hp-gNeck" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffb52e" stopOpacity=".95" /><stop offset=".6" stopColor="#ffe08a" stopOpacity=".6" /><stop offset="1" stopColor="#ffe9ae" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="hp-gBeak" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#11162b" /><stop offset=".5" stopColor="#2a3150" /><stop offset="1" stopColor="#11162b" />
      </linearGradient>
      <linearGradient id="hp-gBeakStripe" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ff8a3d" /><stop offset="1" stopColor="#ff5f8a" />
      </linearGradient>
      <linearGradient id="hp-gFlip" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#050a1e" /><stop offset=".6" stopColor="#101d4a" /><stop offset="1" stopColor="#1e2f66" />
      </linearGradient>
      <linearGradient id="hp-gFoot" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffb347" /><stop offset="1" stopColor="#d9591a" />
      </linearGradient>
      <linearGradient id="hp-gIceTop" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#cfe9ff" />
      </linearGradient>
      <linearGradient id="hp-gIceFront" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#8fd0ff" /><stop offset=".55" stopColor="#3f93ec" /><stop offset="1" stopColor="#1646d9" />
      </linearGradient>
      <filter id="hp-blur6"><feGaussianBlur stdDeviation="6" /></filter>

      <path id="hp-bodyShape" d="M250,34 C302,34 334,72 336,122 C338,160 332,186 348,216 C404,272 412,430 394,542 C382,626 336,696 250,699 C164,696 118,626 106,542 C88,430 96,272 152,216 C168,186 162,160 164,122 C166,72 198,34 250,34 Z" />
      <clipPath id="hp-bodyClip"><use href="#hp-bodyShape" /></clipPath>

      <g id="hp-penguin">
        <ellipse cx="250" cy="702" rx="170" ry="20" fill="#021033" opacity=".55" filter="url(#hp-blur6)" />
        <g>
          <path d="M150,690 C150,668 190,664 224,672 C238,690 232,706 214,710 C190,714 160,708 150,690 Z" fill="url(#hp-gFoot)" />
          <path d="M350,690 C350,668 310,664 276,672 C262,690 268,706 286,710 C310,714 340,708 350,690 Z" fill="url(#hp-gFoot)" />
          <path d="M162,696 q10,8 24,8 M184,690 q8,8 22,10 M206,684 q6,8 16,12" stroke="#a63f0e" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity=".7" />
          <path d="M338,696 q-10,8 -24,8 M316,690 q-8,8 -22,10 M294,684 q-6,8 -16,12" stroke="#a63f0e" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity=".7" />
        </g>
        <use href="#hp-bodyShape" fill="url(#hp-gBody)" />
        <g clipPath="url(#hp-bodyClip)">
          <rect x="60" y="20" width="380" height="700" fill="url(#hp-gRim)" />
          <ellipse cx="205" cy="90" rx="95" ry="70" fill="url(#hp-gHeadShine)" />
        </g>
        <path d="M250,198 C318,198 358,262 358,366 C358,480 330,602 250,676 C170,602 142,480 144,366 C142,262 182,198 250,198 Z" fill="url(#hp-gBelly)" />
        <path d="M250,198 C318,198 358,262 358,366 C358,480 330,602 250,676 C170,602 142,480 144,366 C142,262 182,198 250,198 Z" fill="url(#hp-gBellyShade)" />
        <path d="M200,330 C216,420 214,520 232,610 M300,330 C284,420 286,520 268,610 M250,300 L250,640" stroke="#9ec3ee" strokeWidth="2" fill="none" opacity=".18" strokeLinecap="round" />
        <path d="M168,128 C150,200 188,236 250,246 C312,236 350,200 332,128 C318,186 292,214 250,214 C208,214 182,186 168,128 Z" fill="url(#hp-gNeck)" />
        <ellipse cx="184" cy="150" rx="26" ry="44" transform="rotate(-8 184 150)" fill="url(#hp-gEar)" />
        <ellipse cx="316" cy="150" rx="26" ry="44" transform="rotate(8 316 150)" fill="url(#hp-gEar)" />
        <g>
          <path d="M156,236 C104,262 70,350 66,468 C66,494 88,500 100,480 C134,420 172,340 182,262 Z" fill="url(#hp-gFlip)" />
          <path d="M156,238 C108,266 76,350 72,462" stroke="#7cc8ff" strokeOpacity=".5" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M344,236 C396,262 430,350 434,468 C434,494 412,500 400,480 C366,420 328,340 318,262 Z" fill="url(#hp-gFlip)" />
          <path d="M344,238 C392,266 424,350 428,462" stroke="#9ee6ff" strokeOpacity=".75" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
        <path d="M229,124 C235,114 265,114 271,124 L265,194 C261,210 239,210 235,194 Z" fill="url(#hp-gBeak)" />
        <path d="M229,126 L236,192 C237,198 242,202 247,203 L247,128 Z" fill="url(#hp-gBeakStripe)" />
        <path d="M271,126 L264,192 C263,198 258,202 253,203 L253,128 Z" fill="url(#hp-gBeakStripe)" />
        <path d="M244,122 L246,170" stroke="#fff" strokeOpacity=".5" strokeWidth="2.4" strokeLinecap="round" />
        <g>
          <ellipse cx="206" cy="102" rx="13" ry="14" fill="#05070f" />
          <ellipse cx="206" cy="102" rx="13" ry="14" fill="none" stroke="#3b4d86" strokeWidth="2" />
          <circle cx="202" cy="97" r="4.6" fill="#fff" /><circle cx="211" cy="108" r="2" fill="#bfe3ff" />
          <ellipse cx="294" cy="102" rx="13" ry="14" fill="#05070f" />
          <ellipse cx="294" cy="102" rx="13" ry="14" fill="none" stroke="#3b4d86" strokeWidth="2" />
          <circle cx="290" cy="97" r="4.6" fill="#fff" /><circle cx="299" cy="108" r="2" fill="#bfe3ff" />
        </g>
        <path d="M156,222 C100,280 94,430 112,540" stroke="#7cc8ff" strokeOpacity=".35" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M344,222 C402,280 408,430 390,540" stroke="#9ee6ff" strokeOpacity=".7" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    </defs>
    <g>
      <ellipse cx="320" cy="790" rx="280" ry="22" fill="#021033" opacity=".35" filter="url(#hp-blur6)" />
      <path d="M14,722 L100,700 L250,712 L400,698 L545,706 L626,730 L560,790 L330,816 L100,796 L20,760 Z" fill="url(#hp-gIceFront)" />
      <path d="M14,722 L100,700 L250,712 L400,698 L545,706 L626,730 L540,752 L330,764 L110,754 L20,740 Z" fill="url(#hp-gIceTop)" />
      <path d="M140,754 L170,800 L330,816 L300,764 Z" fill="#fff" opacity=".12" />
      <path d="M400,760 L430,806 L560,790 L585,744 Z" fill="#0a1d5c" opacity=".25" />
      <path d="M300,764 L330,816 L430,806 L400,760 Z" fill="#fff" opacity=".08" />
      <g fill="#fff" opacity=".85">
        <circle cx="90" cy="742" r="2.5" />
        <circle cx="480" cy="728" r="2" />
        <circle cx="560" cy="742" r="3" />
      </g>
    </g>
    <g transform="translate(66,12) scale(.97)">
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
      Array.from({ length: 42 }, () => {
        const size = 2 + Math.random() * 4;
        return {
          left: `${Math.random() * 100}%`,
          width: size,
          height: size,
          opacity: 0.25 + Math.random() * 0.55,
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
              <DeployCard />
              <PenguinScene />
            </aside>
          </div>
        </div>
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
      </section>

      {/* ---------- FEATURES ---------- */}
      <section className="hp-feat" id="features">
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
      </section>

      {/* ---------- FINAL CTA ---------- */}
      <section className="hp-final">
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
              <svg viewBox="0 0 500 720">
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