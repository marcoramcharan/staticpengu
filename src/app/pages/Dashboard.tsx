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
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 40);

const css = `
.dash-page, .dash-page * { box-sizing: border-box; }
.dash-page { position: relative; width: 100%; min-height: calc(100vh - 67px); color: #fff; font-family: var(--sp-body); background: radial-gradient(800px 560px at 90% 0%, rgba(47,139,255,.32), transparent 62%), radial-gradient(700px 500px at 0% 100%, rgba(22,70,217,.4), transparent 60%), linear-gradient(170deg, #030a22 0%, #061236 55%, #0a1d5c 100%); }
.dash-page h1, .dash-page h2, .dash-page h3 { font-family: var(--sp-display); text-shadow: none; -webkit-text-stroke: 0; }
.dash-wrap { position: relative; max-width: 1100px; margin: 0 auto; padding: 40px 24px 72px; display: flex; flex-direction: column; gap: 28px; }
.dash-header { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; padding: 28px 32px; border-radius: 28px; background: linear-gradient(160deg, rgba(255,255,255,.12), rgba(255,255,255,.04)); border: 1px solid rgba(191,227,255,.28); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); box-shadow: 0 40px 90px -40px rgba(2,8,30,.85), inset 0 1px 0 rgba(255,255,255,.2); }
.dash-header h1 { margin: 0 0 10px; font-weight: 800; font-size: clamp(30px, 4.4vw, 46px); line-height: 1.02; letter-spacing: -.04em; background: linear-gradient(95deg, #fff 0%, var(--sp-pale) 45%, var(--sp-cyan) 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
.dash-sub { display: inline-block; font-size: 13.5px; font-weight: 600; color: var(--sp-pale); background: rgba(124,200,255,.1); padding: 6px 14px; border-radius: 999px; border: 1px solid rgba(124,200,255,.25); overflow-wrap: anywhere; }
.dash-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 14px 26px; border: 1px solid transparent; border-radius: 999px; background: linear-gradient(135deg, #d4efff, #62c6ff 60%, #3aa4ff); color: var(--sp-night); font-family: var(--sp-display); font-size: 15px; font-weight: 700; letter-spacing: -.01em; text-decoration: none; cursor: pointer; box-shadow: 0 12px 40px -10px rgba(79,216,255,.75), inset 0 1px 0 rgba(255,255,255,.7); transition: transform .2s, box-shadow .2s, background .2s, border-color .2s, opacity .2s; }
.dash-btn:hover:not(:disabled) { transform: translateY(-3px); box-shadow: 0 18px 50px -10px rgba(79,216,255,.9), inset 0 1px 0 rgba(255,255,255,.7); }
.dash-btn.small { padding: 10px 20px; font-size: 14px; }
.dash-btn.ghost { color: #fff; background: rgba(255,255,255,.05); border-color: rgba(191,227,255,.35); box-shadow: none; }
.dash-btn.ghost:hover:not(:disabled) { background: rgba(255,255,255,.12); border-color: rgba(191,227,255,.7); box-shadow: none; }
.dash-btn:disabled { opacity: .45; cursor: not-allowed; }
.dash-btn:focus-visible, .dash-site-url:focus-visible, .dash-drop:focus-within { outline: 3px solid var(--sp-cyan); outline-offset: 3px; }
.dash-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
.dash-stat { display: flex; flex-direction: column; gap: 6px; padding: 22px 24px; border-radius: 24px; background: linear-gradient(160deg, rgba(255,255,255,.08), rgba(255,255,255,.02)); border: 1px solid rgba(124,200,255,.2); }
.dash-stat.blue { background: linear-gradient(135deg, var(--sp-royal), #0e2f9a 60%, #0a1d5c); border-color: rgba(124,200,255,.35); }
.dash-stat.purple { background: linear-gradient(160deg, #e8f5ff, #a9d8ff); border-color: transparent; color: var(--sp-navy); }
.dash-stat-label { font-family: var(--sp-display); font-size: 12px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--sp-sky); }
.dash-stat.purple .dash-stat-label { color: var(--sp-royal); }
.dash-stat-value { font-family: var(--sp-display); font-size: 46px; font-weight: 800; letter-spacing: -.05em; line-height: 1; }
.dash-section-title { margin: 0; font-weight: 800; font-size: 26px; letter-spacing: -.03em; color: #fff; }
.dash-list { display: flex; flex-direction: column; gap: 16px; }
.dash-site { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; padding: 22px 26px; border-radius: 24px; background: linear-gradient(160deg, rgba(255,255,255,.08), rgba(255,255,255,.02)); border: 1px solid rgba(124,200,255,.2); transition: transform .25s, border-color .25s, box-shadow .25s; }
.dash-site:hover { transform: translateY(-3px); border-color: rgba(124,200,255,.5); box-shadow: 0 30px 60px -34px rgba(47,139,255,.7); }
.dash-site.is-disabled { opacity: .6; }
.dash-site.is-disabled .dash-site-name { text-decoration: line-through; }
.dash-site-info { display: flex; flex-direction: column; gap: 10px; min-width: 0; flex: 1 1 320px; }
.dash-site-top { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
.dash-site-name { margin: 0; font-weight: 700; font-size: 22px; letter-spacing: -.03em; color: #fff; }
.dash-badge { font-family: var(--sp-display); font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; padding: 4px 12px; border-radius: 999px; border: 1px solid transparent; }
.dash-badge.active { background: rgba(40,227,154,.14); color: #5df0b6; border-color: rgba(40,227,154,.4); }
.dash-badge.disabled { background: rgba(255,94,120,.14); color: #ffb4c0; border-color: rgba(255,94,120,.4); }
.dash-site-url { align-self: flex-start; max-width: 100%; font-size: 13.5px; font-weight: 600; color: var(--sp-cyan); text-decoration: none; background: rgba(3,10,34,.55); padding: 6px 14px; border: 1px solid rgba(124,200,255,.3); border-radius: 999px; overflow-wrap: anywhere; transition: background .2s, border-color .2s, color .2s; }
.dash-site-url:hover { background: rgba(79,216,255,.14); border-color: var(--sp-cyan); color: #fff; }
.dash-site-url.off { color: #6f88b3; pointer-events: none; text-decoration: line-through; }
.dash-meta { display: flex; flex-wrap: wrap; gap: 8px; }
.dash-chip { font-size: 12.5px; font-weight: 600; color: var(--sp-pale); background: rgba(255,255,255,.06); padding: 4px 12px; border: 1px solid rgba(124,200,255,.2); border-radius: 999px; }
.dash-chip.warn { background: rgba(255,196,71,.12); color: #ffd98a; border-color: rgba(255,196,71,.35); }
.dash-site-actions { display: flex; gap: 12px; }
.dash-empty { display: flex; flex-direction: column; align-items: center; gap: 14px; text-align: center; padding: 44px 20px; border-radius: 24px; border: 2px dashed rgba(124,200,255,.35); background: rgba(124,200,255,.05); font-weight: 600; color: var(--sp-pale); }
.dash-note { position: relative; font-size: 13.5px; font-weight: 500; line-height: 1.5; color: var(--sp-pale); background: rgba(124,200,255,.08); border: 1px solid rgba(124,200,255,.22); padding: 12px 18px; border-radius: 14px; }
.dash-error { font-size: 14px; font-weight: 500; color: #ffb4c0; background: rgba(255,94,120,.12); padding: 12px 16px; border: 1px solid rgba(255,94,120,.4); border-radius: 14px; }
.dash-backdrop { position: fixed; inset: 0; z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px; background: rgba(3,10,34,.72); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); }
.dash-modal { width: 100%; max-width: 480px; max-height: 92vh; overflow-y: auto; padding: 30px 28px 28px; border-radius: 28px; color: #fff; background: radial-gradient(500px 300px at 100% 0%, rgba(47,139,255,.35), transparent 65%), linear-gradient(170deg, #0a1d5c, #061236 70%); border: 1px solid rgba(191,227,255,.3); box-shadow: 0 50px 100px -30px rgba(2,8,30,.9), inset 0 1px 0 rgba(255,255,255,.2); }
.dash-modal h2 { margin: 0 0 8px; font-weight: 800; font-size: 28px; letter-spacing: -.03em; color: #fff; }
.dash-modal-desc { margin: 0 0 20px; font-size: 14.5px; color: #b9cdea; }
.dash-drop { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; min-height: 140px; margin-bottom: 18px; padding: 18px; border: 2px dashed rgba(124,200,255,.45); border-radius: 20px; background: rgba(124,200,255,.07); text-align: center; cursor: pointer; font-weight: 600; color: #fff; transition: background .2s, border-color .2s; }
.dash-drop:hover, .dash-drop.dragging { background: rgba(79,216,255,.15); border-color: var(--sp-cyan); }
.dash-drop small { font-size: 12.5px; font-weight: 500; color: var(--sp-pale); overflow-wrap: anywhere; }
.dash-file-input { display: none; }
.dash-field { display: flex; flex-direction: column; gap: 8px; margin-bottom: 18px; }
.dash-field label { font-family: var(--sp-display); font-size: 12px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--sp-sky); }
.dash-field input { width: 100%; padding: 13px 16px; font: inherit; font-size: 16px; font-weight: 500; color: #fff; background: rgba(3,10,34,.55); border: 1px solid rgba(124,200,255,.3); border-radius: 14px; outline: none; transition: border-color .2s, box-shadow .2s, background .2s; }
.dash-field input::placeholder { color: #6f88b3; }
.dash-field input:focus { border-color: var(--sp-cyan); background: rgba(3,10,34,.75); box-shadow: 0 0 0 4px rgba(79,216,255,.18); }
.dash-preview { align-self: flex-start; font-size: 13px; font-weight: 500; color: var(--sp-pale); background: rgba(255,255,255,.06); padding: 6px 14px; border: 1px solid rgba(124,200,255,.22); border-radius: 999px; overflow-wrap: anywhere; }
.dash-preview strong { font-weight: 600; color: #fff; }
.dash-preview span { color: var(--sp-cyan); font-weight: 700; }
.dash-progress-track { height: 10px; overflow: hidden; border-radius: 999px; background: rgba(255,255,255,.12); }
.dash-progress-bar { height: 100%; border-radius: 999px; background: linear-gradient(90deg, var(--sp-azure), var(--sp-cyan)); transition: width .2s ease; }
.dash-progress-text { display: block; margin: 10px 0 18px; font-size: 14px; font-weight: 600; color: var(--sp-pale); text-align: center; }
.dash-modal-actions { display: flex; gap: 12px; margin-top: 8px; }
.dash-modal-actions .dash-btn { flex: 1; }
.dash-success { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 14px; }
@media (max-width: 600px) {
  .dash-modal-actions { flex-direction: column-reverse; }
  .dash-wrap { padding: 24px 16px 48px; }
  .dash-header { padding: 22px 20px; border-radius: 24px; }
  .dash-site-actions { width: 100%; }
  .dash-site-actions .dash-btn { flex: 1; }
}
@media (prefers-reduced-motion: reduce) { .dash-btn, .dash-site, .dash-progress-bar { transition: none; } }
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
      setModalError("Could not connect to the server. Is it running on localhost:3000?");
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