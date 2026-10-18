import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api, API_URL } from "../lib/api";
import { useStore } from "../store/store";

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
.dash-page { width: 100%; }
.dash-wrap { max-width: 1100px; margin: 0 auto; padding: 32px 24px 56px; display: flex; flex-direction: column; gap: 28px; }
.dash-header { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; background: #fffaee; border: 6px solid #1e1a2b; border-radius: 40px; box-shadow: 10px 10px 0 #1e1a2b, 0 10px 20px rgba(0,0,0,.12); padding: 28px 32px; }
.dash-header h1 { margin: 0 0 8px; font-size: clamp(28px, 4vw, 42px); line-height: 1.05; letter-spacing: -2px; font-weight: 900; color: #1e1a2b; text-shadow: 3px 3px 0 #ffb347; -webkit-text-stroke: 1.5px #1e1a2b; }
.dash-sub { display: inline-block; font-size: 14px; font-weight: 700; color: #3d3552; background: #e0d7ff; padding: 5px 16px; border-radius: 40px; border: 3px solid #1e1a2b; box-shadow: 3px 3px 0 #1e1a2b; overflow-wrap: anywhere; }
.dash-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 12px 24px; border: 4px solid #1e1a2b; border-radius: 50px; background: linear-gradient(145deg, #7fd1ff, #5aa9e6); color: #1e1a2b; font: inherit; font-size: 15px; font-weight: 900; letter-spacing: -.3px; text-transform: uppercase; text-decoration: none; cursor: pointer; box-shadow: 0 6px 0 #1e1a2b, 0 10px 16px rgba(0,0,0,.18); transition: all .08s linear; }
.dash-btn:hover { transform: translateY(-3px); box-shadow: 0 9px 0 #1e1a2b, 0 13px 18px rgba(0,0,0,.18); }
.dash-btn:active { transform: translateY(4px); box-shadow: 0 2px 0 #1e1a2b; }
.dash-btn.small { padding: 8px 18px; font-size: 13px; box-shadow: 0 4px 0 #1e1a2b; }
.dash-btn.ghost { background: #f0ead8; }
.dash-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
.dash-stat { background: #ffedc9; border: 5px solid #1e1a2b; border-radius: 30px; box-shadow: 6px 6px 0 #1e1a2b; padding: 20px 22px; display: flex; flex-direction: column; gap: 4px; }
.dash-stat.blue { background: #d6f0ff; }
.dash-stat.purple { background: #e7d9ff; }
.dash-stat-label { font-size: 12px; font-weight: 900; letter-spacing: .5px; text-transform: uppercase; color: #3d3552; }
.dash-stat-value { font-size: 40px; font-weight: 900; letter-spacing: -2px; color: #1e1a2b; line-height: 1; }
.dash-section-title { margin: 0; font-size: 24px; font-weight: 900; letter-spacing: -1px; color: #1e1a2b; text-shadow: 2px 2px 0 #ffd966; }
.dash-list { display: flex; flex-direction: column; gap: 18px; }
.dash-site { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; background: #fffaee; border: 5px solid #1e1a2b; border-radius: 30px; box-shadow: 6px 6px 0 #1e1a2b; padding: 20px 24px; }
.dash-site.is-disabled { background: #ece8f2; }
.dash-site.is-disabled .dash-site-name { text-decoration: line-through; }
.dash-site-info { display: flex; flex-direction: column; gap: 8px; min-width: 0; flex: 1 1 320px; }
.dash-site-top { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
.dash-site-name { margin: 0; font-size: 22px; font-weight: 900; letter-spacing: -1px; color: #1e1a2b; }
.dash-badge { font-size: 11px; font-weight: 900; letter-spacing: .5px; text-transform: uppercase; padding: 3px 12px; border: 3px solid #1e1a2b; border-radius: 40px; box-shadow: 2px 2px 0 #1e1a2b; }
.dash-badge.active { background: #b9f6ca; color: #0b5d2a; }
.dash-badge.disabled { background: #ffc9c9; color: #9e1e1e; }
.dash-site-url { font-size: 13px; font-weight: 700; color: #1e1a2b; text-decoration: none; background: #ffdb7c; padding: 4px 14px; border: 3px solid #1e1a2b; border-radius: 40px; box-shadow: 2px 2px 0 #1e1a2b; align-self: flex-start; overflow-wrap: anywhere; max-width: 100%; }
.dash-site-url:hover { background: #ffc107; }
.dash-site-url.off { background: #d9d4e4; pointer-events: none; text-decoration: line-through; }
.dash-meta { display: flex; flex-wrap: wrap; gap: 8px; }
.dash-chip { font-size: 12px; font-weight: 700; color: #3d3552; background: #f3e7fe; padding: 3px 12px; border: 2px solid #1e1a2b; border-radius: 30px; box-shadow: 2px 2px 0 #1e1a2b; }
.dash-chip.warn { background: #fff3b0; color: #6b4a00; }
.dash-site-actions { display: flex; gap: 12px; }
.dash-empty { text-align: center; background: #ffedc9; border: 5px dashed #1e1a2b; border-radius: 30px; padding: 40px 20px; font-weight: 700; color: #3d3552; display: flex; flex-direction: column; align-items: center; gap: 14px; }
.dash-note { font-size: 13px; font-weight: 700; color: #6b4a00; background: #fff3b0; padding: 10px 16px; border: 4px solid #1e1a2b; border-radius: 22px; box-shadow: 4px 4px 0 #1e1a2b; }
.dash-error { font-size: 14px; font-weight: 700; color: #9e1e1e; background: #ffc9c9; padding: 12px 18px; border: 4px solid #1e1a2b; border-radius: 20px; box-shadow: 4px 4px 0 #1e1a2b; }
.dash-btn:disabled { opacity: .55; cursor: not-allowed; background: #c0c0d0; transform: translateY(3px); box-shadow: 0 3px 0 #1e1a2b; }
.dash-backdrop { position: fixed; inset: 0; background: rgba(30,26,43,.55); backdrop-filter: blur(2px); display: flex; align-items: center; justify-content: center; padding: 20px; z-index: 200; }
.dash-modal { width: 100%; max-width: 480px; max-height: 92vh; overflow-y: auto; background: #fffaee; border: 6px solid #1e1a2b; border-radius: 36px; box-shadow: 12px 12px 0 #1e1a2b, 0 20px 40px rgba(0,0,0,.3); padding: 28px 26px 26px; }
.dash-modal h2 { margin: 0 0 6px; font-size: 26px; font-weight: 900; letter-spacing: -1px; color: #1e1a2b; text-shadow: 2px 2px 0 #ffd966; }
.dash-modal-desc { margin: 0 0 18px; font-size: 14px; font-weight: 600; color: #3d3552; }
.dash-drop { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; min-height: 130px; padding: 18px; border: 5px dashed #1e1a2b; border-radius: 26px; background: #ffedc9; text-align: center; cursor: pointer; transition: all .15s ease; font-weight: 700; color: #1e1a2b; margin-bottom: 16px; }
.dash-drop:hover, .dash-drop.dragging { background: #ffe0a8; border-color: #ff5e5e; }
.dash-drop small { font-size: 12px; font-weight: 600; color: #3d3552; overflow-wrap: anywhere; }
.dash-file-input { display: none; }
.dash-field { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
.dash-field label { font-size: 12px; font-weight: 900; letter-spacing: .5px; color: #1e1a2b; background: #ffd966; align-self: flex-start; padding: 3px 14px; border: 3px solid #1e1a2b; border-radius: 40px; box-shadow: 3px 3px 0 #1e1a2b; text-transform: uppercase; }
.dash-field input { width: 100%; box-sizing: border-box; padding: 11px 16px; font: inherit; font-size: 17px; font-weight: 700; color: #1e1a2b; background: #fffaee; border: 5px solid #1e1a2b; border-radius: 20px; box-shadow: inset 0 0 0 3px #fff2d7, 4px 4px 0 #1e1a2b; outline: none; transition: .15s; }
.dash-field input:focus { background: #fff5da; box-shadow: inset 0 0 0 3px #fff6e6, 4px 4px 0 #ff5e5e; }
.dash-preview { font-size: 13px; font-weight: 600; color: #3d3552; background: #f3e7fe; padding: 5px 12px; border: 2px solid #1e1a2b; border-radius: 30px; box-shadow: 2px 2px 0 #1e1a2b; align-self: flex-start; overflow-wrap: anywhere; }
.dash-preview span { color: #b3306a; font-weight: 900; }
.dash-progress-track { height: 20px; overflow: hidden; border-radius: 40px; background: #beb3d6; border: 4px solid #1e1a2b; }
.dash-progress-bar { height: 100%; background: linear-gradient(90deg, #ffb347, #ff8c42); border-right: 4px solid #1e1a2b; transition: width .2s ease; }
.dash-progress-text { display: block; margin: 8px 0 16px; font-size: 14px; font-weight: 700; color: #1e1a2b; text-align: center; }
.dash-modal-actions { display: flex; gap: 12px; margin-top: 8px; }
.dash-modal-actions .dash-btn { flex: 1; }
.dash-success { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 12px; }
@media (max-width: 600px) {
  .dash-modal-actions { flex-direction: column-reverse; }
  .dash-wrap { padding: 20px 16px 40px; }
  .dash-header { padding: 22px 20px; border-radius: 30px; }
  .dash-site-actions { width: 100%; }
  .dash-site-actions .dash-btn { flex: 1; }
}
`;

const Dashboard = () => {
  const { userId } = useParams<{ userId: string }>();
  const user = useStore((s) => s.user);

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
        useStore.getState().logout();
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