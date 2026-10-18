import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../lib/api";

type SiteStatus = "active" | "disabled";

type SitePage = {
  path: string;
  sizeBytes: number;
};

type Site = {
  id: string;
  name: string;
  url: string;
  status: SiteStatus;
  pages: SitePage[];
};

const formatBytes = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const extOf = (p: string): string => {
  const name = p.split("/").pop() || "";
  const i = name.lastIndexOf(".");
  return i > 0 ? name.slice(i + 1).toLowerCase() : "";
};

const sameExt = (a: string, b: string): boolean => {
  const norm = (e: string) => (e === "htm" ? "html" : e);
  return norm(a) === norm(b);
};

// No path -> file name. Folder-like path (no extension or trailing "/") ->
// folder + file name. Path with an extension -> used as typed, but the
// extension must match the uploaded file.
const resolvePagePath = (
  typed: string,
  fileName: string
): { path: string; error?: string } => {
  const clean = typed.trim().replace(/\\/g, "/").replace(/^\/+/, "");
  if (!clean) return { path: fileName };

  if (clean.endsWith("/") || !extOf(clean)) {
    return { path: `${clean.replace(/\/+$/, "")}/${fileName}` };
  }

  if (!sameExt(extOf(clean), extOf(fileName))) {
    const fileExt = extOf(fileName);
    return {
      path: clean,
      error: `The path ends in .${extOf(clean)} but the file is ${
        fileExt ? `.${fileExt}` : "a file with no extension"
      }.`,
    };
  }

  return { path: clean };
};

const css = `
.edit-page { width: 100%; }
.edit-wrap { max-width: 900px; margin: 0 auto; padding: 32px 24px 56px; display: flex; flex-direction: column; gap: 26px; }
.edit-card { background: #fffaee; border: 6px solid #1e1a2b; border-radius: 36px; box-shadow: 10px 10px 0 #1e1a2b, 0 10px 20px rgba(0,0,0,.12); padding: 28px 30px; }
.edit-back { align-self: flex-start; display: inline-block; font-size: 13px; font-weight: 900; text-transform: uppercase; color: #1e1a2b; background: #e0d7ff; padding: 6px 16px; border: 3px solid #1e1a2b; border-radius: 40px; box-shadow: 3px 3px 0 #1e1a2b; text-decoration: none; }
.edit-back:hover { background: #c9b8ff; }
.edit-top { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 14px; }
.edit-card h1 { margin: 0 0 10px; font-size: clamp(26px, 4vw, 38px); line-height: 1.05; letter-spacing: -2px; font-weight: 900; color: #1e1a2b; text-shadow: 3px 3px 0 #ffb347; -webkit-text-stroke: 1.5px #1e1a2b; }
.edit-card h2 { margin: 0 0 6px; font-size: 22px; font-weight: 900; letter-spacing: -1px; color: #1e1a2b; text-shadow: 2px 2px 0 #ffd966; }
.edit-desc { margin: 0 0 18px; font-size: 14px; font-weight: 600; color: #3d3552; }
.edit-url { display: inline-block; font-size: 13px; font-weight: 700; color: #1e1a2b; text-decoration: none; background: #ffdb7c; padding: 4px 14px; border: 3px solid #1e1a2b; border-radius: 40px; box-shadow: 2px 2px 0 #1e1a2b; overflow-wrap: anywhere; }
.edit-url:hover { background: #ffc107; }
.edit-url.off { background: #d9d4e4; pointer-events: none; text-decoration: line-through; }
.edit-badge { font-size: 12px; font-weight: 900; letter-spacing: .5px; text-transform: uppercase; padding: 5px 16px; border: 3px solid #1e1a2b; border-radius: 40px; box-shadow: 3px 3px 0 #1e1a2b; }
.edit-badge.active { background: #b9f6ca; color: #0b5d2a; }
.edit-badge.disabled { background: #ffc9c9; color: #9e1e1e; }
.edit-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 10px 22px; border: 4px solid #1e1a2b; border-radius: 50px; background: linear-gradient(145deg, #7fd1ff, #5aa9e6); color: #1e1a2b; font: inherit; font-size: 14px; font-weight: 900; letter-spacing: -.3px; text-transform: uppercase; cursor: pointer; box-shadow: 0 5px 0 #1e1a2b, 0 8px 14px rgba(0,0,0,.16); transition: all .08s linear; }
.edit-btn:hover:not(:disabled) { transform: translateY(-3px); box-shadow: 0 8px 0 #1e1a2b, 0 12px 16px rgba(0,0,0,.16); }
.edit-btn:active:not(:disabled) { transform: translateY(3px); box-shadow: 0 2px 0 #1e1a2b; }
.edit-btn:disabled { opacity: .55; cursor: not-allowed; background: #c0c0d0; }
.edit-btn.ghost { background: #f0ead8; }
.edit-btn.warn { background: linear-gradient(145deg, #ffe08a, #ffc233); }
.edit-btn.danger { background: linear-gradient(145deg, #ff9b9b, #ff5e5e); }
.edit-btn.small { padding: 6px 14px; font-size: 12px; box-shadow: 0 3px 0 #1e1a2b; }
.edit-field { display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px; }
.edit-field label { font-size: 12px; font-weight: 900; letter-spacing: .5px; color: #1e1a2b; background: #ffd966; align-self: flex-start; padding: 3px 14px; border: 3px solid #1e1a2b; border-radius: 40px; box-shadow: 3px 3px 0 #1e1a2b; text-transform: uppercase; }
.edit-field input[type="text"] { width: 100%; box-sizing: border-box; padding: 11px 16px; font: inherit; font-size: 16px; font-weight: 700; color: #1e1a2b; background: #fffaee; border: 5px solid #1e1a2b; border-radius: 20px; box-shadow: inset 0 0 0 3px #fff2d7, 4px 4px 0 #1e1a2b; outline: none; transition: .15s; }
.edit-field input[type="text"]:focus { background: #fff5da; box-shadow: inset 0 0 0 3px #fff6e6, 4px 4px 0 #ff5e5e; }
.edit-file { font: inherit; font-size: 13px; font-weight: 700; color: #3d3552; background: #f3e7fe; padding: 8px 12px; border: 3px solid #1e1a2b; border-radius: 20px; box-shadow: 2px 2px 0 #1e1a2b; }
.edit-error { margin-bottom: 14px; padding: 10px 16px; background: #ffc9c9; color: #9e1e1e; border: 4px solid #1e1a2b; border-radius: 18px; box-shadow: 4px 4px 0 #1e1a2b; font-size: 14px; font-weight: 700; }
.edit-pages { list-style: none; margin: 18px 0 0; padding: 0; display: flex; flex-direction: column; gap: 12px; }
.edit-page-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; background: #ffedc9; border: 4px solid #1e1a2b; border-radius: 22px; box-shadow: 4px 4px 0 #1e1a2b; padding: 10px 16px; }
.edit-page-path { font-size: 15px; font-weight: 900; color: #1e1a2b; overflow-wrap: anywhere; }
.edit-page-size { font-size: 12px; font-weight: 700; color: #3d3552; background: #f3e7fe; padding: 2px 10px; border: 2px solid #1e1a2b; border-radius: 30px; margin-left: 10px; }
.edit-empty { text-align: center; font-weight: 700; color: #3d3552; padding: 18px; background: #ffedc9; border: 4px dashed #1e1a2b; border-radius: 22px; }
.edit-status-row { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 14px; }
.edit-danger-zone { background: #ffe3e3; }
.edit-toast { padding: 10px 16px; background: #fff3b0; color: #6b4a00; border: 4px solid #1e1a2b; border-radius: 18px; box-shadow: 4px 4px 0 #1e1a2b; font-size: 13px; font-weight: 700; }
.edit-backdrop { position: fixed; inset: 0; background: rgba(30,26,43,.55); backdrop-filter: blur(2px); display: flex; align-items: center; justify-content: center; padding: 20px; z-index: 200; }
.edit-modal { width: 100%; max-width: 440px; background: #fffaee; border: 6px solid #1e1a2b; border-radius: 32px; box-shadow: 12px 12px 0 #1e1a2b; padding: 26px; }
.edit-modal p { font-size: 14px; font-weight: 600; color: #3d3552; margin: 0 0 18px; }
.edit-modal-actions { display: flex; gap: 12px; }
.edit-modal-actions .edit-btn { flex: 1; }
@media (max-width: 600px) {
  .edit-wrap { padding: 20px 16px 40px; }
  .edit-card { padding: 22px 18px; border-radius: 28px; }
  .edit-modal-actions { flex-direction: column-reverse; }
}
`;

const EditSite = () => {
  const { userId, siteId } = useParams<{ userId: string; siteId: string }>();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  const [site, setSite] = useState<Site | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const [newPath, setNewPath] = useState("");
  const [newFile, setNewFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const flash = (message: string) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    let alive = true;

    (async () => {
      const { ok, data } = await api(`/api/sites/${siteId}`);
      if (!alive) return;

      if (!ok) {
        setLoadError(data?.error || "Could not load this site.");
      } else {
        setSite(data.site);
      }
      setLoading(false);
    })();

    return () => {
      alive = false;
      window.clearTimeout(toastTimer.current);
    };
  }, [siteId]);

  const disabled = site?.status === "disabled";
  const resolved = newFile ? resolvePagePath(newPath, newFile.name) : null;

  const toggleStatus = async () => {
    if (!site || busy) return;
    setError(null);
    setBusy(true);

    const next: SiteStatus = disabled ? "active" : "disabled";
    const { ok, data } = await api(`/api/sites/${site.id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: next }),
    });

    setBusy(false);
    if (!ok) {
      setError(data?.error || "Could not update the site.");
      return;
    }
    setSite(data.site);
    flash(next === "disabled" ? "Site disabled." : "Site enabled.");
  };

  const addPage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!site || busy) return;
    setError(null);

    if (!newFile) {
      setError("Choose a file to upload.");
      return;
    }

    const result = resolvePagePath(newPath, newFile.name);
    if (result.error) {
      setError(result.error);
      return;
    }
    const path = result.path;
    const form = new FormData();
    form.append("path", path);
    form.append("file", newFile);

    setBusy(true);
    const { ok, data } = await api(`/api/sites/${site.id}/pages`, {
      method: "POST",
      body: form,
    });
    setBusy(false);

    if (!ok) {
      setError(data?.error || "Could not add the page.");
      return;
    }

    setSite(data.site);
    setNewPath("");
    setNewFile(null);
    if (fileRef.current) fileRef.current.value = "";
    flash(`Added ${path}.`);
  };

  const deletePage = async (path: string) => {
    if (!site || busy) return;
    setError(null);
    setBusy(true);

    const { ok, data } = await api(
      `/api/sites/${site.id}/pages?path=${encodeURIComponent(path)}`,
      { method: "DELETE" }
    );

    setBusy(false);
    if (!ok) {
      setError(data?.error || "Could not delete the page.");
      return;
    }
    setSite(data.site);
    flash("Page deleted.");
  };

  const deleteSite = async () => {
    if (!site || busy) return;
    setBusy(true);

    const { ok, data } = await api(`/api/sites/${site.id}`, { method: "DELETE" });

    setBusy(false);
    setConfirmDelete(false);
    if (!ok) {
      setError(data?.error || "Could not delete the site.");
      return;
    }
    navigate(`/dashboard/${userId}`);
  };

  if (loading || !site) {
    return (
      <div className="edit-page">
        <style>{css}</style>
        <div className="edit-wrap">
          <Link className="edit-back" to={`/dashboard/${userId}`}>
            ← Back to dashboard
          </Link>
          {loadError ? (
            <div className="edit-error" role="alert">
              {loadError}
            </div>
          ) : (
            <div className="edit-empty">Loading site...</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="edit-page">
      <style>{css}</style>
      <div className="edit-wrap">
        <Link className="edit-back" to={`/dashboard/${userId}`}>
          ← Back to dashboard
        </Link>

        {toast && <div className="edit-toast">{toast}</div>}

        {/* ---------- SITE HEADER ---------- */}
        <section className="edit-card">
          <div className="edit-top">
            <div>
              <h1>Edit {site.name}</h1>
              <a
                className={`edit-url${disabled ? " off" : ""}`}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {site.url}
              </a>
            </div>
            <span className={`edit-badge ${site.status}`}>{site.status}</span>
          </div>
        </section>

        {/* ---------- PAGES ---------- */}
        <section className="edit-card">
          <h2>Pages ({site.pages.length})</h2>
          <p className="edit-desc">Add new files to your site or remove existing ones.</p>

          <form onSubmit={addPage} noValidate>
            <div className="edit-field">
              <label htmlFor="pageFile">File</label>
              <input
                ref={fileRef}
                id="pageFile"
                className="edit-file"
                type="file"
                onChange={(e) => setNewFile(e.target.files?.[0] ?? null)}
              />
            </div>
            <div className="edit-field">
              <label htmlFor="pagePath">Page path (optional)</label>
              <input
                id="pagePath"
                type="text"
                placeholder={newFile?.name ?? "blog/post-1.html"}
                autoComplete="off"
                spellCheck={false}
                value={newPath}
                onChange={(e) => setNewPath(e.target.value)}
              />
              {resolved && (
                <span
                  className="edit-page-size"
                  style={{
                    marginLeft: 0,
                    alignSelf: "flex-start",
                    ...(resolved.error ? { background: "#ffc9c9", color: "#9e1e1e" } : {}),
                  }}
                >
                  {resolved.error ?? `Will be saved as /${resolved.path}`}
                </span>
              )}
            </div>
            {error && (
              <div className="edit-error" role="alert">
                {error}
              </div>
            )}
            <button
              className="edit-btn"
              type="submit"
              disabled={busy || !!resolved?.error}
            >
              {busy ? "Working..." : "+ Add page"}
            </button>
          </form>

          {site.pages.length === 0 ? (
            <div className="edit-empty" style={{ marginTop: 18 }}>
              This site has no pages.
            </div>
          ) : (
            <ul className="edit-pages">
              {site.pages.map((page) => (
                <li key={page.path} className="edit-page-row">
                  <span>
                    <span className="edit-page-path">/{page.path}</span>
                    {page.sizeBytes > 0 && (
                      <span className="edit-page-size">{formatBytes(page.sizeBytes)}</span>
                    )}
                  </span>
                  <button
                    type="button"
                    className="edit-btn small danger"
                    disabled={busy}
                    onClick={() => deletePage(page.path)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* ---------- STATUS ---------- */}
        <section className="edit-card">
          <div className="edit-status-row">
            <div>
              <h2>{disabled ? "Site is disabled" : "Site is live"}</h2>
              <p className="edit-desc" style={{ marginBottom: 0 }}>
                {disabled
                  ? "Visitors can't see your site until you enable it again."
                  : "Disable your site to take it offline without deleting it."}
              </p>
            </div>
            <button
              type="button"
              className="edit-btn warn"
              disabled={busy}
              onClick={toggleStatus}
            >
              {busy ? "Working..." : disabled ? "Enable site" : "Disable site"}
            </button>
          </div>
        </section>

        {/* ---------- DANGER ZONE ---------- */}
        <section className="edit-card edit-danger-zone">
          <div className="edit-status-row">
            <div>
              <h2>Delete site</h2>
              <p className="edit-desc" style={{ marginBottom: 0 }}>
                Permanently removes the site and all of its pages.
              </p>
            </div>
            <button
              type="button"
              className="edit-btn danger"
              disabled={busy}
              onClick={() => setConfirmDelete(true)}
            >
              Delete site
            </button>
          </div>
        </section>
      </div>

      {/* ---------- DELETE CONFIRM ---------- */}
      {confirmDelete && (
        <div className="edit-backdrop" onClick={() => !busy && setConfirmDelete(false)}>
          <div
            className="edit-modal"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Delete {site.name}?</h2>
            <p>This can't be undone. All pages will be removed.</p>
            <div className="edit-modal-actions">
              <button
                type="button"
                className="edit-btn ghost"
                disabled={busy}
                onClick={() => setConfirmDelete(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="edit-btn danger"
                disabled={busy}
                onClick={deleteSite}
              >
                {busy ? "Deleting..." : "Yes, delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditSite;