import { Link } from "react-router-dom";
import "../styles/pages/guide.css";

const Guide = () => {
  return (
    <div className="guide-page">
      {/* ---------- HERO ---------- */}
      <header className="guide-hero">
        <div className="guide-hero-inner">
          <span className="guide-eyebrow">StaticPengu docs</span>
          <h1 className="guide-title">Deployment Guide</h1>
          <p className="guide-subtitle">
            Read this before you upload — it'll save you pain. Everything you
            need to know about hosting a site on StaticPengu, in one place.
          </p>

          <div className="guide-hero-actions">
            <Link to="/" className="guide-cta primary">
              ← Back to upload
            </Link>
            <a href="#rules" className="guide-cta ghost">
              Jump to rules ↓
            </a>
          </div>
        </div>

        <div className="guide-hero-pengu" aria-hidden="true">
          <svg viewBox="-10 0 280 310">
            <ellipse cx="85" cy="288" rx="32" ry="13" fill="#ff8a1f" stroke="#0a1a4f" strokeWidth="6" />
            <ellipse cx="175" cy="288" rx="32" ry="13" fill="#ff8a1f" stroke="#0a1a4f" strokeWidth="6" />
            <path d="M38 150 C-5 190 5 240 38 245 C55 215 60 180 55 150Z" fill="#1a46b8" stroke="#0a1a4f" strokeWidth="6" strokeLinejoin="round" />
            <path d="M222 150 C265 190 255 240 222 245 C205 215 200 180 205 150Z" fill="#1a46b8" stroke="#0a1a4f" strokeWidth="6" strokeLinejoin="round" />
            <path d="M130 20 C60 20 32 90 32 170 C32 250 70 290 130 290 C190 290 228 250 228 170 C228 90 200 20 130 20Z" fill="#1a46b8" stroke="#0a1a4f" strokeWidth="7" />
            <path d="M130 90 C85 100 68 160 72 205 C76 258 100 280 130 280 C160 280 184 258 188 205 C192 160 175 100 130 90Z" fill="#f4fbff" stroke="#0a1a4f" strokeWidth="5" />
            <path d="M130 60 C90 50 70 85 85 115 C100 105 118 108 130 120 C142 108 160 105 175 115 C190 85 170 50 130 60Z" fill="#f4fbff" stroke="#0a1a4f" strokeWidth="5" />
            <ellipse cx="102" cy="88" rx="17" ry="21" fill="#fff" stroke="#0a1a4f" strokeWidth="5" />
            <ellipse cx="158" cy="88" rx="17" ry="21" fill="#fff" stroke="#0a1a4f" strokeWidth="5" />
            <circle cx="106" cy="92" r="10" fill="#0a1a4f" />
            <circle cx="154" cy="92" r="10" fill="#0a1a4f" />
            <circle cx="110" cy="87" r="4" fill="#fff" />
            <circle cx="158" cy="87" r="4" fill="#fff" />
            <path d="M86 62 Q102 54 116 64" stroke="#0a1a4f" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M144 64 Q158 54 174 62" stroke="#0a1a4f" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M112 108 Q130 98 148 108 Q146 134 130 138 Q114 134 112 108Z" fill="#ffb629" stroke="#0a1a4f" strokeWidth="5" strokeLinejoin="round" />
            <path d="M118 114 Q130 118 142 114" stroke="#0a1a4f" strokeWidth="3" fill="none" strokeLinecap="round" />
            <ellipse cx="80" cy="118" rx="10" ry="6" fill="#ff9fb4" opacity=".7" />
            <ellipse cx="180" cy="118" rx="10" ry="6" fill="#ff9fb4" opacity=".7" />
            <path d="M96 170 Q92 200 100 226" stroke="#c9efff" strokeWidth="7" fill="none" strokeLinecap="round" />
          </svg>
        </div>

        <div className="guide-wave" aria-hidden="true">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path
              d="M0 60 C240 0 400 120 640 60 C880 0 1060 110 1260 50 C1350 25 1410 50 1440 45 L1440 126 L0 126 Z"
              fill="#eefaff"
            />
            <path
              d="M0 60 C240 0 400 120 640 60 C880 0 1060 110 1260 50 C1350 25 1410 50 1440 45"
              fill="none"
              stroke="#0a1a4f"
              strokeWidth="5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </header>

      {/* ---------- TOC ---------- */}
      <nav className="guide-toc" aria-label="On this page">
        <span className="guide-toc-label">On this page</span>
        <ul>
          <li><a href="#rules">Relative links</a></li>
          <li><a href="#structure">Folder structure</a></li>
          <li><a href="#example">Example ZIP</a></li>
          <li><a href="#spa">Single-page apps</a></li>
          <li><a href="#limits">Upload limits</a></li>
          <li><a href="#checklist">Checklist</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
      </nav>

      {/* ---------- RULES ---------- */}
      <section className="card" id="rules">
        <h2>⚠️ Rule #1: Use relative links only</h2>
        <p>
          Your site is served from a <strong>subfolder</strong> of our domain,
          not from the root. That means any link starting with <code>/</code>{" "}
          will break — it points to the root of the whole domain, not to your
          site.
        </p>

        <div className="callout warn">
          <span className="label">❌ Broken — don't do this</span>
          <pre>
            <code>{`<a href="/about">About</a>
<img src="/images/logo.png">
<link rel="stylesheet" href="/style.css">
<script src="/app.js"></script>`}</code>
          </pre>
          <p>
            When a visitor clicks <code>/about</code>, the browser goes to{" "}
            <code>ourdomain.com/about</code> — completely outside your site —
            and gets a 404.
          </p>
        </div>

        <div className="callout good">
          <span className="label">✅ Correct — do this instead</span>
          <pre>
            <code>{`<a href="about/">About</a>
<img src="images/logo.png">
<link rel="stylesheet" href="style.css">
<script src="app.js"></script>`}</code>
          </pre>
          <p>
            <strong>Rule of thumb:</strong> never start a link with{" "}
            <code>/</code>. Use bare relative paths.
          </p>
        </div>
      </section>

      {/* ---------- STRUCTURE ---------- */}
      <section className="card" id="structure">
        <h2>📁 Rule #2: One folder per page</h2>
        <p>
          Every "page" should be a folder with an <code>index.html</code>{" "}
          inside it. That's how you get clean URLs like <code>/about/</code>{" "}
          instead of <code>/about.html</code>.
        </p>

        <table>
          <thead>
            <tr>
              <th>You want this URL</th>
              <th>Put this file on disk</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><code>/</code> (homepage)</td><td><code>index.html</code></td></tr>
            <tr><td><code>/about/</code></td><td><code>about/index.html</code></td></tr>
            <tr><td><code>/blog/</code></td><td><code>blog/index.html</code></td></tr>
            <tr><td><code>/blog/post-1/</code></td><td><code>blog/post-1/index.html</code></td></tr>
            <tr><td><code>/images/logo.png</code></td><td><code>images/logo.png</code></td></tr>
            <tr><td><code>/style.css</code></td><td><code>style.css</code></td></tr>
          </tbody>
        </table>

        <div className="callout warn">
          <span className="label">❌ Does NOT work</span>
          <pre>
            <code>{`index.html
about.html      ← page sitting loose at top level
contact.html`}</code>
          </pre>
          <p>
            If <code>about.html</code> is at the top level, there's no way to
            reach it by typing <code>/about</code>. Either rename it to{" "}
            <code>about/index.html</code>, or link to it as{" "}
            <code>about.html</code> directly.
          </p>
        </div>
      </section>

      {/* ---------- EXAMPLE ZIP ---------- */}
      <section className="card" id="example">
        <h2>🐧 A valid example ZIP</h2>
        <p>Here's what a well-structured upload looks like:</p>

        <div className="tree">{`my-website.zip
├── index.html
├── style.css
├── app.js
├── images/
│   └── logo.png
├── about/
│   └── index.html
└── contact/
    └── index.html`}</div>

        <p>And <code>index.html</code> looking like this:</p>

        <pre>
          <code>{`<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <nav>
    <a href="about/">About</a>
    <a href="contact/">Contact</a>
  </nav>
  <img src="images/logo.png" alt="Logo">
  <script src="app.js"></script>
</body>
</html>`}</code>
        </pre>

        <p>
          Notice every <code>href</code> and <code>src</code> is relative — no
          leading slashes.
        </p>
      </section>

      {/* ---------- SPA ---------- */}
      <section className="card" id="spa">
        <h2>🚫 Single-page apps (React, Vue, Svelte)</h2>
        <p>
          If your site uses a client-side router, <strong>use hash routing</strong>.
          We don't do SPA fallback — we won't silently serve{" "}
          <code>index.html</code> for unknown routes.
        </p>

        <div className="callout warn">
          <span className="label">❌ Won't work</span>
          <pre>
            <code>{`<BrowserRouter>
  <Route path="/about" element={<About />} />
</BrowserRouter>`}</code>
          </pre>
          <p>
            Navigating to <code>/about</code> asks our CDN for{" "}
            <code>/about</code>, which doesn't exist → 404.
          </p>
        </div>

        <div className="callout good">
          <span className="label">✅ Will work</span>
          <pre>
            <code>{`<HashRouter>
  <Route path="/about" element={<About />} />
</HashRouter>`}</code>
          </pre>
          <p>
            URLs become <code>#/about</code>, which never hit the server, so
            nothing breaks.
          </p>
        </div>
      </section>

      {/* ---------- LIMITS ---------- */}
      <section className="card" id="limits">
        <h2>📦 Upload limits</h2>

        <table>
          <thead>
            <tr><th>Limit</th><th>Value</th></tr>
          </thead>
          <tbody>
            <tr><td>ZIP file size</td><td>50 MB</td></tr>
            <tr><td>Extracted size</td><td>200 MB</td></tr>
            <tr><td>Files per site</td><td>2,000</td></tr>
            <tr><td>Single file inside the ZIP</td><td>50 MB</td></tr>
          </tbody>
        </table>

        <h3>❌ Don't zip these</h3>
        <ul>
          <li><code>node_modules/</code></li>
          <li><code>.git/</code></li>
          <li><code>.DS_Store</code>, <code>__MACOSX/</code> — we ignore these automatically</li>
          <li><code>Thumbs.db</code></li>
          <li>Cache folders, IDE configs</li>
        </ul>

        <h3>✅ Do zip these</h3>
        <ul>
          <li>Your <code>index.html</code></li>
          <li>CSS, JS, images, fonts</li>
          <li>Any other asset your page loads</li>
        </ul>
      </section>

      {/* ---------- CHECKLIST ---------- */}
      <section className="card" id="checklist">
        <h2>📝 Pre-upload checklist</h2>
        <ul className="checklist">
          <li>Every internal link uses a <strong>relative path</strong> (no leading <code>/</code>)</li>
          <li>Homepage is <code>index.html</code> at the ZIP root (or inside one wrapper folder)</li>
          <li>Every sub-page is its own folder with an <code>index.html</code> inside</li>
          <li>No <code>node_modules</code>, <code>.git</code>, or cache folders in the ZIP</li>
          <li>ZIP is under 50 MB</li>
          <li>All assets load when you open <code>index.html</code> locally in your browser</li>
        </ul>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="card" id="faq">
        <h2>❓ FAQ</h2>
        <div className="faq">
          <details>
            <summary>Why can't I use <code>/about</code> links?</summary>
            <p>
              Because your site lives at a subpath of our domain, not at the
              domain root. <code>/about</code> would send visitors to a
              completely different site.
            </p>
          </details>

          <details>
            <summary>My site works locally but breaks after upload. Why?</summary>
            <p>
              Almost always the leading-slash problem. Open DevTools → Network
              tab, click a broken link, and look at the URL it tried to load.
              If it starts with the bare domain instead of your site's folder,
              that's the bug.
            </p>
          </details>

          <details>
            <summary>Can I use absolute URLs to my own domain?</summary>
            <p>
              No — you don't have your own domain, you have a subpath of ours.
              Use relative URLs for everything internal.
            </p>
          </details>

          <details>
            <summary>Can I link to external sites?</summary>
            <p>
              Yes, of course. <code>https://google.com</code> or{" "}
              <code>https://cdn.jsdelivr.net/...</code> work fine, as long as
              they're fully qualified with <code>https://</code>.
            </p>
          </details>

          <details>
            <summary>Can I update my site after uploading?</summary>
            <p>
              Re-upload a new ZIP and you'll get a new URL. Bookmark or share
              the new one — old uploads are not automatically redirected.
            </p>
          </details>

          <details>
            <summary>How do I get clean URLs like <code>/about/</code> instead of <code>/about.html</code>?</summary>
            <p>
              Put the page in its own folder with an <code>index.html</code>.
              See the structure rules above.
            </p>
          </details>
        </div>
      </section>

      {/* ---------- BOTTOM CTA ---------- */}
      <section className="guide-cta-bottom">
        <h2>Ready to deploy? 🐧</h2>
        <p>Upload your ZIP and grab a live URL in seconds.</p>
        <Link to="/" className="guide-cta primary big">
          Upload a website →
        </Link>
      </section>
    </div>
  );
};

export default Guide;