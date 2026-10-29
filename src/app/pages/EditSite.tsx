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
.edit-page, .edit-page * { box-sizing: border-box; }
.edit-page { position: relative; width: 100%; min-height: calc(100vh - 67px); color: var(--sp-ink); font-family: var(--sp-body); font-weight: 700; background: radial-gradient(circle, rgba(92,200,255,.3) 2px, transparent 2.5px) 0 0 / 28px 28px, var(--sp-ice); }
.edit-page h1, .edit-page h2 { font-family: var(--sp-display); font-weight: 800; letter-spacing: -.01em; }
.edit-wrap { max-width: 900px; margin: 0 auto; padding: 40px 24px 72px; display: flex; flex-direction: column; gap: 28px; }
.edit-card { padding: 26px 28px 30px; border-radius: 28px; background: #fff; border: 5px solid var(--sp-ink); box-shadow: 0 8px 0 var(--sp-ink); }
.edit-card:first-of-type { color: #fff; background: radial-gradient(circle at 90% 15%, #3f8cff 0, transparent 45%), linear-gradient(160deg, #12307f, #1a46b8); box-shadow: 0 10px 0 var(--sp-ink); }
.edit-back { align-self: flex-start; display: inline-block; font-family: var(--sp-display); font-size: 17px; font-weight: 800; color: var(--sp-ink); background: #fff; padding: 5px 18px; border: 3px solid var(--sp-ink); border-radius: 999px; box-shadow: 0 4px 0 var(--sp-ink); text-decoration: none; transition: transform .12s, box-shadow .12s; }
.edit-back:hover { transform: translateY(2px); box-shadow: 0 2px 0 var(--sp-ink); }
.edit-back:active { transform: translateY(4px); box-shadow: 0 0 0 var(--sp-ink); }
.edit-back:focus-visible, .edit-url:focus-visible, .edit-btn:focus-visible { outline: 3px solid var(--sp-royal); outline-offset: 3px; }
.edit-top { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 14px; }
.edit-card h1 { margin: 0 0 14px; font-size: clamp(32px, 5vw, 52px); line-height: 1; overflow-wrap: anywhere; color: #fff; -webkit-text-stroke: 2.5px var(--sp-ink); paint-order: stroke fill; text-shadow: 0 5px 0 var(--sp-ink); }
.edit-card h2 { margin: 0 0 6px; font-size: 30px; line-height: 1.05; color: var(--sp-deep); }
.edit-desc { margin: 0 0 18px; font-size: 15px; color: #35508f; }
.edit-url { display: inline-block; max-width: 100%; font-size: 14px; font-weight: 800; color: var(--sp-ink); text-decoration: none; background: var(--sp-sky); padding: 4px 14px; border: 3px solid var(--sp-ink); border-radius: 999px; box-shadow: 0 3px 0 var(--sp-ink); overflow-wrap: anywhere; transition: background .2s; }
.edit-url:hover { background: #fff; }
.edit-url.off { color: #6f86b3; background: #cbd8ee; box-shadow: none; pointer-events: none; text-decoration: line-through; }
.edit-badge { font-family: var(--sp-display); font-size: 14px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; padding: 3px 16px; color: var(--sp-ink); border: 3px solid var(--sp-ink); border-radius: 999px; box-shadow: 0 3px 0 var(--sp-ink); transform: rotate(3deg); }
.edit-badge.active { background: var(--sp-mint); }
.edit-badge.disabled { background: #ff9fb4; }
.edit-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 8px 24px; border: 4px solid var(--sp-ink); border-radius: 999px; background: var(--sp-sun); color: var(--sp-ink); font-family: var(--sp-display); font-size: 18px; font-weight: 800; cursor: pointer; box-shadow: 0 5px 0 var(--sp-ink); transition: transform .12s, box-shadow .12s, opacity .2s; }
.edit-btn:hover:not(:disabled) { transform: translateY(3px); box-shadow: 0 2px 0 var(--sp-ink); }
.edit-btn:active:not(:disabled) { transform: translateY(5px); box-shadow: 0 0 0 var(--sp-ink); }
.edit-btn:disabled { opacity: .5; cursor: not-allowed; transform: translateY(3px); box-shadow: 0 2px 0 var(--sp-ink); }
.edit-btn.ghost { background: #fff; }
.edit-btn.warn { background: var(--sp-orange); }
.edit-btn.danger { background: #ff6b86; }
.edit-btn.small { padding: 4px 16px; font-size: 15px; border-width: 3px; box-shadow: 0 3px 0 var(--sp-ink); }
.edit-btn.small:hover:not(:disabled) { transform: translateY(2px); box-shadow: 0 1px 0 var(--sp-ink); }
.edit-field { display: flex; flex-direction: column; gap: 8px; margin-bottom: 18px; }
.edit-field label { font-family: var(--sp-display); font-size: 14px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; color: var(--sp-deep); }
.edit-field input[type="text"] { width: 100%; padding: 12px 16px; font: inherit; font-size: 17px; font-weight: 800; color: var(--sp-ink); background: #fff; border: 4px solid var(--sp-ink); border-radius: 16px; outline: none; transition: box-shadow .2s, background .2s; }
.edit-field input[type="text"]::placeholder { color: #8aa0cf; }
.edit-field input[type="text"]:focus { background: var(--sp-ice); box-shadow: 0 4px 0 var(--sp-royal); }
.edit-file { width: 100%; font: inherit; font-size: 14.5px; font-weight: 800; color: var(--sp-ink); background: var(--sp-pale); padding: 12px; border: 4px dashed var(--sp-ink); border-radius: 16px; }
.edit-file::file-selector-button { margin-right: 12px; padding: 5px 16px; font-family: var(--sp-display); font-size: 15px; font-weight: 800; color: var(--sp-ink); background: var(--sp-sun); border: 3px solid var(--sp-ink); border-radius: 999px; cursor: pointer; }
.edit-error { margin-bottom: 16px; padding: 12px 16px; background: #ffc4d0; color: var(--sp-ink); border: 4px solid var(--sp-ink); border-radius: 18px; box-shadow: 0 4px 0 var(--sp-ink); font-size: 14.5px; font-weight: 800; }
.edit-pages { list-style: none; margin: 24px 0 0; padding: 0; display: flex; flex-direction: column; gap: 12px; }
.edit-page-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; padding: 10px 16px; border-radius: 18px; background: var(--sp-ice); border: 4px solid var(--sp-ink); }
.edit-page-path { font-size: 16px; font-weight: 800; color: var(--sp-deep); overflow-wrap: anywhere; }
.edit-page-size { display: inline-block; font-size: 13px; font-weight: 800; color: var(--sp-ink); background: var(--sp-pale); padding: 2px 11px; border: 3px solid var(--sp-ink); border-radius: 999px; margin-left: 10px; }
.edit-empty { text-align: center; font-size: 16px; font-weight: 800; color: var(--sp-deep); padding: 24px; background: rgba(255,255,255,.75); border: 4px dashed var(--sp-ink); border-radius: 22px; }
.edit-status-row { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; }
.edit-danger-zone { background: #ffd9e0; }
.edit-toast { padding: 12px 18px; background: #ffe29a; color: var(--sp-ink); border: 4px solid var(--sp-ink); border-radius: 18px; box-shadow: 0 5px 0 var(--sp-ink); font-size: 15px; font-weight: 800; }
.edit-backdrop { position: fixed; inset: 0; z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px; background: rgba(7,20,69,.78); backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); }
.edit-modal { width: 100%; max-width: 440px; padding: 28px; border-radius: 30px; color: var(--sp-ink); background: #fff; border: 5px solid var(--sp-ink); box-shadow: 0 12px 0 var(--sp-ink); }
.edit-modal h2 { margin: 0 0 10px; font-family: var(--sp-display); font-weight: 800; font-size: 32px; line-height: 1.05; color: var(--sp-deep); overflow-wrap: anywhere; }
.edit-modal p { font-size: 15.5px; color: #35508f; margin: 0 0 22px; }
.edit-modal-actions { display: flex; gap: 14px; }
.edit-modal-actions .edit-btn { flex: 1; }
@media (max-width: 600px) {
  .edit-wrap { padding: 24px 16px 48px; }
  .edit-card { padding: 22px 18px 26px; border-radius: 24px; }
  .edit-modal-actions { flex-direction: column-reverse; }
}
@media (prefers-reduced-motion: reduce) { .edit-btn, .edit-back, .edit-url { transition: none; } }
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
                    ...(resolved.error
                      ? {
                          background: "#ffc4d0",
                          color: "#0a1a4f",
                          borderColor: "#0a1a4f",
                        }
                      : {}),
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