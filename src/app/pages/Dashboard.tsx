import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api, API_URL } from "../lib/api";
import { useStore2 } from "../store/store2";

type SiteStatus = "active" | "disabled";

type Site = {
  id: string;
  name: string;
  url: string;
  status: SiteStatus;
  pageCount: number;
  sizeBytes: number;
  expiresAt: string;
};

const formatBytes = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const daysLeft = (expiresAt: string): number =>
  Math.max(0, Math.ceil((new Date(expiresAt).getTime() - Date.now()) / 86400000));

const MAX_FILE_SIZE = 50 * 1024 * 1024;

const slugify = (input: string): string =>
  String(input || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 40);

const css = `
.dash-page, .dash-page * { box-sizing: border-box; }
.dash-page { position: relative; width: 100%; min-height: calc(100vh - 67px); color: var(--sp-ink); font-family: var(--sp-body); font-weight: 700; background: radial-gradient(circle, rgba(92,200,255,.3) 2px, transparent 2.5px) 0 0 / 28px 28px, var(--sp-ice); }
.dash-page h1, .dash-page h2, .dash-page h3 { font-family: var(--sp-display); font-weight: 800; letter-spacing: -.01em; }
.dash-wrap { position: relative; max-width: 1100px; margin: 0 auto; padding: 40px 24px 72px; display: flex; flex-direction: column; gap: 30px; }
.dash-header { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; padding: 26px 30px; border-radius: 30px; color: #fff; background: radial-gradient(circle at 90% 20%, #3f8cff 0, transparent 45%), linear-gradient(160deg, #12307f, #1a46b8); border: 5px solid var(--sp-ink); box-shadow: 0 10px 0 var(--sp-ink); }
.dash-header h1 { margin: 0 0 12px; font-size: clamp(34px, 5vw, 56px); line-height: 1; color: #fff; -webkit-text-stroke: 2.5px var(--sp-ink); paint-order: stroke fill; text-shadow: 0 5px 0 var(--sp-ink); }
.dash-sub { display: inline-block; font-size: 14px; font-weight: 800; color: var(--sp-ink); background: var(--sp-sky); padding: 4px 14px; border: 3px solid var(--sp-ink); border-radius: 999px; box-shadow: 0 3px 0 var(--sp-ink); overflow-wrap: anywhere; }
.dash-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 11px 26px; border: 4px solid var(--sp-ink); border-radius: 999px; background: var(--sp-sun); color: var(--sp-ink); font-family: var(--sp-display); font-size: 19px; font-weight: 800; text-decoration: none; cursor: pointer; box-shadow: 0 6px 0 var(--sp-ink); transition: transform .12s, box-shadow .12s, opacity .2s; }
.dash-btn:hover:not(:disabled) { transform: translateY(3px); box-shadow: 0 3px 0 var(--sp-ink); }
.dash-btn:active:not(:disabled) { transform: translateY(6px); box-shadow: 0 0 0 var(--sp-ink); }
.dash-btn.small { padding: 7px 20px; font-size: 16px; border-width: 3px; box-shadow: 0 4px 0 var(--sp-ink); }
.dash-btn.small:hover:not(:disabled) { transform: translateY(2px); box-shadow: 0 2px 0 var(--sp-ink); }
.dash-btn.small:active:not(:disabled) { transform: translateY(4px); box-shadow: 0 0 0 var(--sp-ink); }
.dash-btn.ghost { background: #fff; }
.dash-btn:disabled { opacity: .5; cursor: not-allowed; box-shadow: 0 3px 0 var(--sp-ink); transform: translateY(3px); }
.dash-btn:focus-visible, .dash-site-url:focus-visible, .dash-drop:focus-within { outline: 3px solid var(--sp-royal); outline-offset: 3px; }
.dash-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 22px; }
.dash-stat { display: flex; flex-direction: column; gap: 6px; padding: 20px 24px 22px; border-radius: 26px; background: #fff; border: 5px solid var(--sp-ink); box-shadow: 0 8px 0 var(--sp-ink); }
.dash-stat:nth-child(1) { transform: rotate(-1deg); }
.dash-stat:nth-child(3) { transform: rotate(1deg); }
.dash-stat.blue { background: var(--sp-sky); }
.dash-stat.purple { background: var(--sp-sun); }
.dash-stat-label { font-family: var(--sp-display); font-size: 14px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; color: #35508f; }
.dash-stat.blue .dash-stat-label, .dash-stat.purple .dash-stat-label { color: var(--sp-ink); }
.dash-stat-value { font-family: var(--sp-display); font-size: 58px; font-weight: 800; line-height: 1; color: var(--sp-deep); }
.dash-stat.blue .dash-stat-value, .dash-stat.purple .dash-stat-value { color: var(--sp-ink); }
.dash-section-title { margin: 0; font-size: 34px; line-height: 1; color: var(--sp-deep); }
.dash-list { display: flex; flex-direction: column; gap: 22px; }
.dash-site { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; padding: 22px 26px; border-radius: 26px; background: #fff; border: 5px solid var(--sp-ink); box-shadow: 0 8px 0 var(--sp-ink); transition: transform .15s; }
.dash-site:hover { transform: translateY(-5px) rotate(-.4deg); }
.dash-site.is-disabled { opacity: .65; background: #e4ecf7; }
.dash-site.is-disabled .dash-site-name { text-decoration: line-through; }
.dash-site-info { display: flex; flex-direction: column; gap: 12px; min-width: 0; flex: 1 1 320px; }
.dash-site-top { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
.dash-site-name { margin: 0; font-size: 28px; line-height: 1.05; color: var(--sp-deep); }
.dash-badge { font-family: var(--sp-display); font-size: 12px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; padding: 2px 12px; border: 3px solid var(--sp-ink); border-radius: 999px; color: var(--sp-ink); }
.dash-badge.active { background: var(--sp-mint); }
.dash-badge.disabled { background: #ff9fb4; }
.dash-site-url { align-self: flex-start; max-width: 100%; font-size: 14px; font-weight: 800; color: var(--sp-pale); text-decoration: none; background: var(--sp-deep); padding: 5px 14px; border: 3px solid var(--sp-ink); border-radius: 999px; overflow-wrap: anywhere; transition: background .2s, color .2s; }
.dash-site-url:hover { background: var(--sp-royal); color: #fff; }
.dash-site-url.off { color: #8aa0cf; background: #cbd8ee; pointer-events: none; text-decoration: line-through; }
.dash-meta { display: flex; flex-wrap: wrap; gap: 8px; }
.dash-chip { font-size: 13px; font-weight: 800; color: var(--sp-ink); background: var(--sp-pale); padding: 3px 12px; border: 3px solid var(--sp-ink); border-radius: 999px; }
.dash-chip.warn { background: #ffe29a; }
.dash-site-actions { display: flex; gap: 12px; }
.dash-empty { display: flex; flex-direction: column; align-items: center; gap: 14px; text-align: center; padding: 44px 20px; border-radius: 28px; border: 4px dashed var(--sp-ink); background: rgba(255,255,255,.75); font-size: 17px; font-weight: 800; color: var(--sp-deep); }
.dash-note { position: relative; font-size: 14.5px; line-height: 1.45; color: var(--sp-ink); background: #fff; border: 4px solid var(--sp-ink); padding: 12px 18px; border-radius: 20px; box-shadow: 0 6px 0 var(--sp-ink); }
.dash-error { font-size: 14.5px; font-weight: 800; color: var(--sp-ink); background: #ffc4d0; padding: 12px 16px; border: 4px solid var(--sp-ink); border-radius: 18px; box-shadow: 0 4px 0 var(--sp-ink); }
.dash-backdrop { position: fixed; inset: 0; z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px; background: rgba(7,20,69,.78); backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); }
.dash-modal { width: 100%; max-width: 480px; max-height: 92vh; overflow-y: auto; padding: 30px 28px 28px; border-radius: 32px; color: var(--sp-ink); font-family: var(--sp-body); font-weight: 700; background: #fff; border: 5px solid var(--sp-ink); box-shadow: 0 12px 0 var(--sp-ink); }
.dash-modal h2 { margin: 0 0 8px; font-size: 36px; line-height: 1; color: var(--sp-deep); }
.dash-modal-desc { margin: 0 0 20px; font-size: 15.5px; color: #35508f; }
.dash-drop { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; min-height: 140px; margin-bottom: 18px; padding: 18px; border: 4px dashed var(--sp-ink); border-radius: 22px; background: var(--sp-pale); text-align: center; cursor: pointer; font-weight: 800; color: var(--sp-ink); transition: background .2s, transform .15s; }
.dash-drop:hover, .dash-drop.dragging { background: var(--sp-sky); transform: rotate(-1deg) scale(1.01); }
.dash-drop small { font-size: 13px; font-weight: 700; color: #35508f; overflow-wrap: anywhere; }
.dash-file-input { display: none; }
.dash-field { display: flex; flex-direction: column; gap: 8px; margin-bottom: 18px; }
.dash-field label { font-family: var(--sp-display); font-size: 14px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; color: var(--sp-deep); }
.dash-field input { width: 100%; padding: 12px 16px; font: inherit; font-size: 17px; font-weight: 800; color: var(--sp-ink); background: #fff; border: 4px solid var(--sp-ink); border-radius: 16px; outline: none; transition: box-shadow .2s, background .2s; }
.dash-field input::placeholder { color: #8aa0cf; }
.dash-field input:focus { background: var(--sp-ice); box-shadow: 0 4px 0 var(--sp-royal); }
.dash-preview { align-self: flex-start; font-size: 13.5px; font-weight: 700; color: var(--sp-pale); background: var(--sp-deep); padding: 4px 14px; border: 3px solid var(--sp-ink); border-radius: 999px; overflow-wrap: anywhere; }
.dash-preview strong { font-weight: 800; color: #fff; }
.dash-preview span { color: var(--sp-sun); font-weight: 800; }
.dash-progress-track { height: 18px; overflow: hidden; border-radius: 999px; background: var(--sp-pale); border: 3px solid var(--sp-ink); }
.dash-progress-bar { height: 100%; background: repeating-linear-gradient(45deg, var(--sp-royal) 0 10px, var(--sp-sky) 10px 20px); background-size: 28px 28px; animation: dash-stripes 1s linear infinite; transition: width .2s ease; }
@keyframes dash-stripes { to { background-position: 28px 0; } }
.dash-progress-text { display: block; margin: 10px 0 18px; font-size: 15px; font-weight: 800; color: var(--sp-deep); text-align: center; }
.dash-modal-actions { display: flex; gap: 14px; margin-top: 8px; }
.dash-modal-actions .dash-btn { flex: 1; }
.dash-success { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 14px; }
@media (max-width: 600px) {
  .dash-modal-actions { flex-direction: column-reverse; }
  .dash-wrap { padding: 24px 16px 48px; }
  .dash-header { padding: 22px 20px; border-radius: 26px; }
  .dash-stat:nth-child(n) { transform: none; }
  .dash-site-actions { width: 100%; }
  .dash-site-actions .dash-btn { flex: 1; }
}
@media (prefers-reduced-motion: reduce) { .dash-btn, .dash-site, .dash-drop, .dash-progress-bar { transition: none; animation: none; } }
`;

const Dashboard = () => {
  const { userId } = useParams<{ userId: string }>();
  const user = useStore2((s) => s.user);

  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ---------- Add-site popup ----------
  const fileRef = useRef<HTMLInputElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [siteName, setSiteName] = useState("");
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("Ready to upload");
  const [modalError, setModalError] = useState<string | null>(null);
  const [created, setCreated] = useState<{ name: string; url: string } | null>(null);

  const slug = slugify(siteName);

  const openModal = () => {
    setFile(null);
    setSiteName("");
    setProgress(0);
    setProgressText("Ready to upload");
    setModalError(null);
    setCreated(null);
    setShowModal(true);
  };

  const closeModal = () => {
    if (uploading) return;
    setShowModal(false);
  };

  const pickFile = (f: File | undefined | null) => {
    if (!f || uploading) return;
    setModalError(null);

    if (!f.name.toLowerCase().endsWith(".zip")) {
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
      setModalError("Please select a ZIP archive.");
      return;
    }
    if (f.size === 0 || f.size > MAX_FILE_SIZE) {
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
      setModalError(
        f.size === 0
          ? "The selected file is empty."
          : "The ZIP file exceeds the 50 MB upload limit."
      );
      return;
    }

    setFile(f);
    if (!siteName) setSiteName(slugify(f.name.replace(/\.zip$/i, "")));
  };

  const refreshSites = async () => {
    const { ok, data } = await api("/api/sites");
    if (ok) setSites(Array.isArray(data.sites) ? data.sites : []);
  };

  const deploy = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || uploading) return;

    if (slug.length < 3) {
      setModalError("Site name must be at least 3 characters (letters and numbers only).");
      return;
    }

    setUploading(true);
    setModalError(null);
    setProgress(0);

    const body = new FormData();
    body.append("name", slug);
    body.append("file", file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_URL}/api/sites`);
    xhr.withCredentials = true;

    // CHANGED: send the auth token with the upload (XHR bypasses api()).
    const token = useStore2.getState().token;
    if (token) xhr.setRequestHeader("Authorization", `Bearer ${token}`);

    xhr.upload.addEventListener("progress", (event) => {
      if (!event.lengthComputable) return;
      const percent = Math.round((event.loaded / event.total) * 100);
      setProgress(percent);
      setProgressText(`Uploading: ${percent}%`);
    });

    xhr.addEventListener("load", () => {
      setUploading(false);

      let result: any = {};
      try {
        result = JSON.parse(xhr.responseText);
      } catch {
        setProgressText("Upload failed");
        setModalError("The server returned an invalid response.");
        return;
      }

      if (xhr.status === 401) {
        useStore2.getState().logout();
        return;
      }

      if (xhr.status < 200 || xhr.status >= 300) {
        setProgressText("Upload failed");
        setModalError(result.error || result.message || "Upload failed.");
        return;
      }

      setProgress(100);
      setProgressText("Website deployed");
      setCreated({ name: result.name, url: result.url });
      refreshSites();
    });

    xhr.addEventListener("error", () => {
      setUploading(false);
      setProgressText("Upload failed");
      setModalError("Could not connect to the server.");
    });

    xhr.send(body);
  };

  useEffect(() => {
    let alive = true;

    (async () => {
      const { ok, data } = await api("/api/sites");
      if (!alive) return;

      if (!ok) {
        setError(data?.error || "Could not load your sites.");
      } else {
        setSites(Array.isArray(data.sites) ? data.sites : []);
      }
      setLoading(false);
    })();

    return () => {
      alive = false;
    };
  }, []);

  const activeCount = sites.filter((s) => s.status === "active").length;
  const totalPages = sites.reduce((sum, s) => sum + s.pageCount, 0);

  return (
    <div className="dash-page">
      <style>{css}</style>
      <div className="dash-wrap">
        <header className="dash-header">
          <div>
            <h1>Your sites</h1>
            <span className="dash-sub">🐧 {user?.email ?? `User #${userId}`}</span>
          </div>
          <button type="button" className="dash-btn" onClick={openModal}>
            + Add a site
          </button>
        </header>

        <section className="dash-stats">
          <div className="dash-stat">
            <span className="dash-stat-label">Total sites</span>
            <span className="dash-stat-value">{loading ? "…" : sites.length}</span>
          </div>
          <div className="dash-stat blue">
            <span className="dash-stat-label">Active</span>
            <span className="dash-stat-value">{loading ? "…" : activeCount}</span>
          </div>
          <div className="dash-stat purple">
            <span className="dash-stat-label">Total pages</span>
            <span className="dash-stat-value">{loading ? "…" : totalPages}</span>
          </div>
        </section>

        <div className="dash-note">
          ⏳ Sites are automatically deleted after 3 days. This is a demo project.
        </div>

        {error && (
          <div className="dash-error" role="alert">
            {error}
          </div>
        )}

        <h2 className="dash-section-title">
          All sites{loading ? "" : ` (${sites.length})`}
        </h2>

        {loading ? (
          <div className="dash-empty">
            <span style={{ fontSize: 48 }}>🐧</span>
            <span>Loading your sites...</span>
          </div>
        ) : sites.length === 0 && !error ? (
          <div className="dash-empty">
            <span style={{ fontSize: 48 }}>📦</span>
            <span>You haven't deployed any sites yet.</span>
            <button type="button" className="dash-btn small" onClick={openModal}>
              Deploy your first site
            </button>
          </div>
        ) : (
          <div className="dash-list">
            {sites.map((site) => {
              const days = daysLeft(site.expiresAt);
              const off = site.status === "disabled";
              return (
                <article
                  key={site.id}
                  className={`dash-site${off ? " is-disabled" : ""}`}
                >
                  <div className="dash-site-info">
                    <div className="dash-site-top">
                      <h3 className="dash-site-name">{site.name}</h3>
                      <span className={`dash-badge ${site.status}`}>{site.status}</span>
                    </div>
                    <a
                      className={`dash-site-url${off ? " off" : ""}`}
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {site.url}
                    </a>
                    <div className="dash-meta">
                      <span className="dash-chip">
                        {site.pageCount} {site.pageCount === 1 ? "page" : "pages"}
                      </span>
                      <span className="dash-chip">{formatBytes(site.sizeBytes)}</span>
                      <span className="dash-chip warn">
                        ⏳ {days} {days === 1 ? "day" : "days"} left
                      </span>
                    </div>
                  </div>

                  <div className="dash-site-actions">
                    <Link
                      className="dash-btn small ghost"
                      to={`/dashboard/${userId}/sites/${site.id}/edit`}
                    >
                      Edit
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* ---------- ADD SITE POPUP ---------- */}
      {showModal && (
        <div className="dash-backdrop" onClick={closeModal}>
          <div
            className="dash-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-site-title"
            onClick={(e) => e.stopPropagation()}
          >
            {created ? (
              <div className="dash-success">
                <div style={{ fontSize: 56 }}>🎉</div>
                <h2 id="add-site-title">Your site is live!</h2>
                <a
                  className="dash-site-url"
                  href={created.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {created.url}
                </a>
                <span className="dash-chip warn">⏳ This site will be deleted in 3 days.</span>
                <div className="dash-modal-actions" style={{ width: "100%" }}>
                  <button type="button" className="dash-btn small ghost" onClick={openModal}>
                    Add another
                  </button>
                  <button type="button" className="dash-btn small" onClick={closeModal}>
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={deploy} noValidate>
                <h2 id="add-site-title">Add a site</h2>
                <p className="dash-modal-desc">Upload a ZIP and name your site.</p>

                <label
                  className={`dash-drop${dragging ? " dragging" : ""}`}
                  htmlFor="dashZip"
                  onDragEnter={(e) => {
                    e.preventDefault();
                    if (!uploading) setDragging(true);
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    if (!uploading) setDragging(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    setDragging(false);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragging(false);
                    pickFile(e.dataTransfer.files?.[0]);
                  }}
                >
                  <span style={{ fontSize: 36 }}>📦</span>
                  {file ? (
                    <>
                      <strong>{file.name}</strong>
                      <small>{formatBytes(file.size)} · click to change</small>
                    </>
                  ) : (
                    <>
                      <strong>Drop your ZIP here or click to browse</strong>
                      <small>ZIP archives only · Max 50 MB</small>
                    </>
                  )}
                </label>
                <input
                  ref={fileRef}
                  id="dashZip"
                  className="dash-file-input"
                  type="file"
                  accept=".zip,application/zip,application/x-zip-compressed"
                  onChange={(e) => pickFile(e.target.files?.[0])}
                />

                <div className="dash-field">
                  <label htmlFor="dashSiteName">Site name</label>
                  <input
                    id="dashSiteName"
                    type="text"
                    maxLength={40}
                    placeholder="my-portfolio"
                    autoComplete="off"
                    spellCheck={false}
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                  />
                  <span className="dash-preview">
                    URL: <strong>staticpengu.b-cdn.net/<span>{slug || "your-name"}</span>/</strong>
                  </span>
                </div>

                {uploading && (
                  <div>
                    <div className="dash-progress-track">
                      <div className="dash-progress-bar" style={{ width: `${progress}%` }} />
                    </div>
                    <span className="dash-progress-text">{progressText}</span>
                  </div>
                )}

                {modalError && (
                  <div className="dash-error" role="alert" style={{ marginBottom: 12 }}>
                    {modalError}
                  </div>
                )}

                <div className="dash-modal-actions">
                  <button
                    type="button"
                    className="dash-btn small ghost"
                    onClick={closeModal}
                    disabled={uploading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="dash-btn small"
                    disabled={!file || slug.length < 3 || uploading}
                  >
                    {uploading ? "Uploading..." : "Deploy website"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;