import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/pages/home.css";

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

const isValidSlug = (slug: string): boolean => slug.length >= 3;

const formatBytes = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

type StatusType = "error" | "success";

type Status = {
  type: StatusType;
  message: string;
  url?: string;
  siteLabel?: string;
};

const Home = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [siteName, setSiteName] = useState("");
  const [showNameModal, setShowNameModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("Ready to upload");
  const [status, setStatus] = useState<Status | null>(null);

  const slug = slugify(siteName);

  const showError = (message: string) =>
    setStatus({ type: "error", message });

  const resetFileInput = () => {
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const selectFile = (file: File | undefined | null) => {
    if (!file || uploading) return;
    setStatus(null);

    if (!file.name.toLowerCase().endsWith(".zip")) {
      setSelectedFile(null);
      resetFileInput();
      showError("Please select a ZIP archive.");
      return;
    }

    if (file.size === 0 || file.size > MAX_FILE_SIZE) {
      setSelectedFile(null);
      resetFileInput();
      showError(
        file.size === 0
          ? "The selected file is empty."
          : "The ZIP file exceeds the 50 MB upload limit."
      );
      return;
    }

    setSelectedFile(file);
    setProgress(0);
    setProgressText("Ready to upload");
    setShowNameModal(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    selectFile(e.dataTransfer.files?.[0]);
  };

  const cancelModal = () => {
    if (uploading) return;
    setShowNameModal(false);
    setSelectedFile(null);
    resetFileInput();
    setSiteName("");
    setStatus(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile || uploading) return;

    if (!isValidSlug(slug)) {
      showError(
        "Site name must be at least 3 characters (letters and numbers only)."
      );
      return;
    }

    setUploading(true);
    setStatus(null);

    const data = new FormData();
    data.append("name", slug);
    data.append("file", selectedFile);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://mc-lxcrvq0y7t.b-cdn.net/api/sites");

    xhr.upload.addEventListener("progress", (event) => {
      if (!event.lengthComputable) return;
      const percent = Math.round((event.loaded / event.total) * 100);
      setProgress(percent);
      setProgressText(`Uploading: ${percent}%`);
    });

    xhr.addEventListener("load", () => {
      setUploading(false);

      let result: any;
      try {
        result = JSON.parse(xhr.responseText);
      } catch {
        setProgressText("Upload failed");
        showError("The server returned an invalid response.");
        return;
      }

      if (xhr.status < 200 || xhr.status >= 300) {
        setProgressText("Upload failed");
        showError(result.error || result.message || "Upload failed.");
        return;
      }

      if (!result.id || !result.url) {
        showError("The server response is missing the website ID or URL.");
        return;
      }

      setProgress(100);
      setProgressText("Website deployed");
      setShowNameModal(false);
      setStatus({
        type: "success",
        message: "Website uploaded successfully!",
        url: result.url,
        siteLabel: result.name
          ? `Site: ${result.name}`
          : `Website ID: ${result.id}`,
      });
    });

    xhr.addEventListener("error", () => {
      setUploading(false);
      setProgressText("Upload failed");
      showError(
        "Could not connect to the server. Check that the backend is running."
      );
    });

    xhr.send(data);
  };

  const resetAll = () => {
    setSelectedFile(null);
    setSiteName("");
    setStatus(null);
    setProgress(0);
    setProgressText("Ready to upload");
    resetFileInput();
  };

  return (
    <div className="home-page">
      <div className="home-wrap">
        {/* ---------- LEFT: UPLOAD ---------- */}
        <section className="home-form-side">
          <div className="brand">
            static<span>pengu</span>
          </div>

          <h1>Deploy your website.</h1>
          <p className="subtitle">🐧 Upload a ZIP — we'll handle the rest.</p>

          {/* ---------- SUCCESS STATE ---------- */}
          {status?.type === "success" && status.url ? (
            <div className="home-success">
              <div className="home-success-icon">🎉</div>
              <h2>Your site is live!</h2>
              <a
                className="home-success-url"
                href={status.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {status.url}
              </a>
              {status.siteLabel && (
                <p className="home-success-meta">{status.siteLabel}</p>
              )}
              <p className="home-success-note">
                ⏳ This site will be deleted in 3 days.
              </p>
              <button className="button" onClick={resetAll} type="button">
                Deploy another site
              </button>
            </div>
          ) : (
            <>
              {/* ---------- STEP 1: PICK ZIP ---------- */}
              <label
                className={`dropzone${dragging ? " dragging" : ""}`}
                htmlFor="zipFile"
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
                onDrop={handleDrop}
              >
                <div className="upload-icon">📦</div>
                <strong>Drop your ZIP file here</strong>
                <span>or click to browse your files</span>
                <span className="dropzone-hint">
                  ZIP archives only · Max 50 MB
                </span>
              </label>

              <input
                ref={fileInputRef}
                className="file-input"
                id="zipFile"
                name="file"
                type="file"
                accept=".zip,application/zip,application/x-zip-compressed"
                onChange={(e) => selectFile(e.target.files?.[0])}
              />

              {status?.type === "error" && (
                <div className="home-inline-error" role="alert">
                  {status.message}
                </div>
              )}

              <Link className="guide-link" to="/guide">
                Read the deployment guide
              </Link>
            </>
          )}
        </section>

        {/* ---------- RIGHT: PENGUIN + NOTICE ---------- */}
        <aside className="home-pengu-side">
          <div className="home-notice">
            ⏳ Sites are <strong>automatically deleted after 3 days</strong>.
            This is a demo project — save anything you want to keep.
          </div>

          <div className="home-pengu-stage">
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
      </div>

      {/* ---------- STEP 2: NAME MODAL ---------- */}
      {showNameModal && selectedFile && (
        <div className="modal-backdrop" onClick={cancelModal}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="modal-header">
              <span className="modal-step">Step 2 of 2</span>
              <h2 id="modal-title">Name your site</h2>
              <p className="modal-file">
                📦 <strong>{selectedFile.name}</strong>{" "}
                <span>({formatBytes(selectedFile.size)})</span>
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="name-field">
                <label htmlFor="siteName">Site name</label>
                <input
                  id="siteName"
                  type="text"
                  maxLength={40}
                  placeholder="my-portfolio"
                  autoComplete="off"
                  spellCheck={false}
                  autoFocus
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                />
                <span className="name-preview">
                  URL:{" "}
                  <strong>
                    staticpengu.b-cdn.net/
                    <span>{slug || "your-name"}</span>/
                  </strong>
                </span>
              </div>

              {uploading && (
                <div className="modal-progress">
                  <div className="progress-track">
                    <div
                      className="progress-bar"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="progress-text">{progressText}</span>
                </div>
              )}

              {status?.type === "error" && (
                <div className="home-inline-error" role="alert">
                  {status.message}
                </div>
              )}

              <div className="modal-actions">
                <button
                  type="button"
                  className="button ghost"
                  onClick={cancelModal}
                  disabled={uploading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="button"
                  disabled={!isValidSlug(slug) || uploading}
                >
                  {uploading ? "Uploading..." : "Deploy website"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;