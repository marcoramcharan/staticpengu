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
.edit-page { position: relative; width: 100%; min-height: calc(100vh - 67px); color: #fff; font-family: var(--sp-body); background: radial-gradient(800px 560px at 90% 0%, rgba(47,139,255,.32), transparent 62%), radial-gradient(700px 500px at 0% 100%, rgba(22,70,217,.4), transparent 60%), linear-gradient(170deg, #030a22 0%, #061236 55%, #0a1d5c 100%); }
.edit-page h1, .edit-page h2 { font-family: var(--sp-display); text-shadow: none; -webkit-text-stroke: 0; }
.edit-wrap { max-width: 900px; margin: 0 auto; padding: 40px 24px 72px; display: flex; flex-direction: column; gap: 24px; }
.edit-card { padding: 28px 30px; border-radius: 28px; background: linear-gradient(160deg, rgba(255,255,255,.1), rgba(255,255,255,.03)); border: 1px solid rgba(191,227,255,.24); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); box-shadow: 0 40px 90px -40px rgba(2,8,30,.85), inset 0 1px 0 rgba(255,255,255,.18); }
.edit-back { align-self: flex-start; display: inline-block; font-family: var(--sp-display); font-size: 13px; font-weight: 600; color: var(--sp-pale); background: rgba(124,200,255,.1); padding: 8px 16px; border: 1px solid rgba(124,200,255,.25); border-radius: 999px; text-decoration: none; transition: background .2s, color .2s, border-color .2s; }
.edit-back:hover { background: rgba(124,200,255,.2); color: #fff; border-color: rgba(124,200,255,.5); }
.edit-back:focus-visible, .edit-url:focus-visible, .edit-btn:focus-visible { outline: 3px solid var(--sp-cyan); outline-offset: 3px; }
.edit-top { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 14px; }
.edit-card h1 { margin: 0 0 12px; font-weight: 800; font-size: clamp(28px, 4vw, 42px); line-height: 1.02; letter-spacing: -.04em; overflow-wrap: anywhere; background: linear-gradient(95deg, #fff 0%, var(--sp-pale) 45%, var(--sp-cyan) 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
.edit-card h2 { margin: 0 0 6px; font-weight: 700; font-size: 22px; letter-spacing: -.03em; color: #fff; }
.edit-desc { margin: 0 0 18px; font-size: 14.5px; color: #b9cdea; }
.edit-url { display: inline-block; max-width: 100%; font-size: 13.5px; font-weight: 600; color: var(--sp-cyan); text-decoration: none; background: rgba(3,10,34,.55); padding: 6px 14px; border: 1px solid rgba(124,200,255,.3); border-radius: 999px; overflow-wrap: anywhere; transition: background .2s, border-color .2s, color .2s; }
.edit-url:hover { background: rgba(79,216,255,.14); border-color: var(--sp-cyan); color: #fff; }
.edit-url.off { color: #6f88b3; pointer-events: none; text-decoration: line-through; }
.edit-badge { font-family: var(--sp-display); font-size: 12px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; padding: 6px 16px; border: 1px solid transparent; border-radius: 999px; }
.edit-badge.active { background: rgba(40,227,154,.14); color: #5df0b6; border-color: rgba(40,227,154,.4); }
.edit-badge.disabled { background: rgba(255,94,120,.14); color: #ffb4c0; border-color: rgba(255,94,120,.4); }
.edit-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 12px 24px; border: 1px solid transparent; border-radius: 999px; background: linear-gradient(135deg, #d4efff, #62c6ff 60%, #3aa4ff); color: var(--sp-night); font-family: var(--sp-display); font-size: 14px; font-weight: 700; letter-spacing: -.01em; cursor: pointer; box-shadow: 0 12px 40px -10px rgba(79,216,255,.7), inset 0 1px 0 rgba(255,255,255,.7); transition: transform .2s, box-shadow .2s, background .2s, border-color .2s, opacity .2s; }
.edit-btn:hover:not(:disabled) { transform: translateY(-3px); box-shadow: 0 18px 50px -10px rgba(79,216,255,.9), inset 0 1px 0 rgba(255,255,255,.7); }
.edit-btn:disabled { opacity: .45; cursor: not-allowed; }
.edit-btn.ghost { color: #fff; background: rgba(255,255,255,.05); border-color: rgba(191,227,255,.35); box-shadow: none; }
.edit-btn.ghost:hover:not(:disabled) { background: rgba(255,255,255,.12); border-color: rgba(191,227,255,.7); box-shadow: none; }
.edit-btn.warn { background: linear-gradient(135deg, #fff0c2, #ffd36b 60%, #ffb92e); color: #2b1c00; box-shadow: 0 12px 40px -12px rgba(255,185,46,.65), inset 0 1px 0 rgba(255,255,255,.7); }
.edit-btn.danger { background: linear-gradient(135deg, #ffc2cc, #ff7a90 60%, #ff4d6a); color: #2b0008; box-shadow: 0 12px 40px -12px rgba(255,77,106,.65), inset 0 1px 0 rgba(255,255,255,.6); }
.edit-btn.small { padding: 8px 16px; font-size: 13px; }
.edit-field { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
.edit-field label { font-family: var(--sp-display); font-size: 12px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--sp-sky); }
.edit-field input[type="text"] { width: 100%; padding: 13px 16px; font: inherit; font-size: 16px; font-weight: 500; color: #fff; background: rgba(3,10,34,.55); border: 1px solid rgba(124,200,255,.3); border-radius: 14px; outline: none; transition: border-color .2s, box-shadow .2s, background .2s; }
.edit-field input[type="text"]::placeholder { color: #6f88b3; }
.edit-field input[type="text"]:focus { border-color: var(--sp-cyan); background: rgba(3,10,34,.75); box-shadow: 0 0 0 4px rgba(79,216,255,.18); }
.edit-file { width: 100%; font: inherit; font-size: 14px; font-weight: 500; color: var(--sp-pale); background: rgba(124,200,255,.07); padding: 10px 12px; border: 1px dashed rgba(124,200,255,.45); border-radius: 14px; }
.edit-file::file-selector-button { margin-right: 12px; padding: 7px 14px; font: inherit; font-size: 13px; font-weight: 600; color: var(--sp-night); background: linear-gradient(135deg, #d4efff, #62c6ff 60%, #3aa4ff); border: 0; border-radius: 999px; cursor: pointer; }
.edit-error { margin-bottom: 14px; padding: 12px 16px; background: rgba(255,94,120,.12); color: #ffb4c0; border: 1px solid rgba(255,94,120,.4); border-radius: 14px; font-size: 14px; font-weight: 500; }
.edit-pages { list-style: none; margin: 20px 0 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
.edit-page-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; padding: 12px 16px; border-radius: 16px; background: rgba(3,10,34,.45); border: 1px solid rgba(124,200,255,.18); }
.edit-page-path { font-size: 15px; font-weight: 600; color: #fff; overflow-wrap: anywhere; }
.edit-page-size { display: inline-block; font-size: 12px; font-weight: 600; color: var(--sp-pale); background: rgba(255,255,255,.06); padding: 3px 11px; border: 1px solid rgba(124,200,255,.22); border-radius: 999px; margin-left: 10px; }
.edit-empty { text-align: center; font-weight: 600; color: var(--sp-pale); padding: 22px; background: rgba(124,200,255,.05); border: 2px dashed rgba(124,200,255,.35); border-radius: 16px; }
.edit-status-row { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 14px; }
.edit-danger-zone { background: linear-gradient(160deg, rgba(255,94,120,.14), rgba(255,94,120,.04)); border-color: rgba(255,94,120,.35); }
.edit-toast { padding: 12px 16px; background: rgba(255,196,71,.12); color: #ffd98a; border: 1px solid rgba(255,196,71,.35); border-radius: 14px; font-size: 14px; font-weight: 500; }
.edit-backdrop { position: fixed; inset: 0; z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px; background: rgba(3,10,34,.72); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); }
.edit-modal { width: 100%; max-width: 440px; padding: 28px; border-radius: 28px; color: #fff; background: radial-gradient(500px 300px at 100% 0%, rgba(47,139,255,.35), transparent 65%), linear-gradient(170deg, #0a1d5c, #061236 70%); border: 1px solid rgba(191,227,255,.3); box-shadow: 0 50px 100px -30px rgba(2,8,30,.9), inset 0 1px 0 rgba(255,255,255,.2); }
.edit-modal h2 { margin: 0 0 10px; font-family: var(--sp-display); font-weight: 800; font-size: 24px; letter-spacing: -.03em; color: #fff; overflow-wrap: anywhere; }
.edit-modal p { font-size: 14.5px; color: #b9cdea; margin: 0 0 22px; }
.edit-modal-actions { display: flex; gap: 12px; }
.edit-modal-actions .edit-btn { flex: 1; }
@media (max-width: 600px) {
  .edit-wrap { padding: 24px 16px 48px; }
  .edit-card { padding: 22px 18px; border-radius: 24px; }
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
                          background: "rgba(255,94,120,.14)",
                          color: "#ffb4c0",
                          borderColor: "rgba(255,94,120,.4)",
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