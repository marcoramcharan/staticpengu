import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore2 } from "../store/store2";

const API_URL = "http://localhost:3000";
const SIGNUP_ENDPOINT = `${API_URL}/api/auth/signup`;

const css = `
.auth-page, .auth-page * { box-sizing: border-box; }
.auth-page { position: relative; width: 100%; min-height: calc(100vh - 67px); display: flex; align-items: center; justify-content: center; padding: 48px 16px 64px; overflow: hidden; color: #fff; font-family: var(--sp-body); background: radial-gradient(800px 560px at 85% 20%, rgba(47,139,255,.4), transparent 62%), radial-gradient(700px 500px at 0% 100%, rgba(22,70,217,.45), transparent 60%), linear-gradient(160deg, #030a22 0%, #061236 50%, #0a1d5c 100%); }
.auth-page::before { content: ""; position: absolute; inset: 0; pointer-events: none; background-image: linear-gradient(rgba(124,200,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124,200,255,.05) 1px, transparent 1px); background-size: 64px 64px; -webkit-mask-image: radial-gradient(ellipse at 50% 40%, #000 0%, transparent 70%); mask-image: radial-gradient(ellipse at 50% 40%, #000 0%, transparent 70%); }
.auth-card { position: relative; width: 100%; max-width: 460px; padding: 40px 34px; border-radius: 28px; background: linear-gradient(160deg, rgba(255,255,255,.12), rgba(255,255,255,.04)); border: 1px solid rgba(191,227,255,.28); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); box-shadow: 0 40px 90px -30px rgba(2,8,30,.85), inset 0 1px 0 rgba(255,255,255,.22); }
.auth-brand { display: inline-flex; align-items: center; gap: 11px; margin-bottom: 26px; color: #fff; text-decoration: none; font-family: var(--sp-display); font-weight: 800; font-size: 22px; letter-spacing: -.04em; }
.auth-brand svg { width: 38px; height: 38px; flex: none; }
.auth-brand span span { background: linear-gradient(90deg, var(--sp-pale), var(--sp-cyan)); -webkit-background-clip: text; background-clip: text; color: transparent; }
.auth-card h1 { margin: 0 0 10px; font-family: var(--sp-display); font-weight: 800; font-size: clamp(32px, 5vw, 44px); line-height: 1.02; letter-spacing: -.04em; text-shadow: none; -webkit-text-stroke: 0; background: linear-gradient(95deg, #fff 0%, var(--sp-pale) 45%, var(--sp-cyan) 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
.auth-sub { margin: 0 0 28px; font-size: 15px; color: #b9cdea; }
.auth-form { display: flex; flex-direction: column; gap: 18px; }
.auth-field { display: flex; flex-direction: column; gap: 8px; }
.auth-field label { font-family: var(--sp-display); font-size: 12px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--sp-sky); }
.auth-field input { width: 100%; padding: 14px 16px; font: inherit; font-size: 16px; font-weight: 500; color: #fff; background: rgba(3,10,34,.55); border: 1px solid rgba(124,200,255,.3); border-radius: 14px; outline: none; transition: border-color .2s, box-shadow .2s, background .2s; }
.auth-field input::placeholder { color: #6f88b3; }
.auth-field input:focus { border-color: var(--sp-cyan); background: rgba(3,10,34,.75); box-shadow: 0 0 0 4px rgba(79,216,255,.18); }
.auth-field input:-webkit-autofill { -webkit-text-fill-color: #fff; -webkit-box-shadow: 0 0 0 100px #061236 inset; caret-color: #fff; }
.auth-hint { font-size: 12.5px; color: #8fa8d0; }
.auth-error { padding: 12px 16px; background: rgba(255,94,120,.12); color: #ffb4c0; border: 1px solid rgba(255,94,120,.4); border-radius: 14px; font-size: 14px; font-weight: 500; }
.auth-button { width: 100%; margin-top: 6px; padding: 16px 24px; border: 1px solid transparent; border-radius: 999px; background: linear-gradient(135deg, #d4efff, #62c6ff 60%, #3aa4ff); color: var(--sp-night); font-family: var(--sp-display); font-size: 15px; font-weight: 700; letter-spacing: -.01em; cursor: pointer; box-shadow: 0 12px 40px -10px rgba(79,216,255,.75), inset 0 1px 0 rgba(255,255,255,.7); transition: transform .2s, box-shadow .2s, opacity .2s; }
.auth-button:hover:not(:disabled) { transform: translateY(-3px); box-shadow: 0 18px 50px -10px rgba(79,216,255,.9), inset 0 1px 0 rgba(255,255,255,.7); }
.auth-button:disabled { opacity: .55; cursor: not-allowed; }
.auth-button:focus-visible, .auth-brand:focus-visible, .auth-switch a:focus-visible { outline: 3px solid var(--sp-cyan); outline-offset: 3px; }
.auth-switch { margin: 24px 0 0; text-align: center; font-size: 14.5px; color: #b9cdea; }
.auth-switch a { margin-left: 6px; color: var(--sp-cyan); font-weight: 600; text-decoration: none; border-bottom: 1px solid rgba(79,216,255,.4); transition: color .2s, border-color .2s; }
.auth-switch a:hover { color: #fff; border-color: #fff; }
@media (max-width: 500px) { .auth-card { padding: 30px 20px; border-radius: 24px; } }
@media (prefers-reduced-motion: reduce) { .auth-button, .auth-field input { transition: none; } }
`;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Signup = () => {
  const navigate = useNavigate();
  const login = useStore2((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setError(null);

    if (!EMAIL_RE.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(SIGNUP_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: email.trim(), password }),
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch {
        /* non-JSON response */
      }

      if (!res.ok) {
        setError(data.error || data.message || "Could not create your account.");
        return;
      }

      // Adjust these once the server shape is final.
      const userId = data.user?.id ?? data.userId ?? data.id;
      if (!userId) {
        setError("The server response is missing the user ID.");
        return;
      }
      login(
        { email: email.trim(), ...(data.user ?? {}), id: userId },
        data.token ?? null
      );

      navigate(`/dashboard/${userId}`);
    } catch {
      setError("Could not connect to the server. Is it running on localhost:3000?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <style>{css}</style>
      <div className="auth-card">
        <Link to="/" className="auth-brand" aria-label="StaticPengu home">
          <svg viewBox="0 0 64 64" aria-hidden="true">
            <rect width="64" height="64" rx="18" fill="#0f1b45" />
            <rect x=".75" y=".75" width="62.5" height="62.5" rx="17.25" fill="none" stroke="#7cc8ff" strokeOpacity=".5" strokeWidth="1.5" />
            <path d="M32,12 C42,12 46,20 46,28 C52,36 52,50 32,56 C12,50 12,36 18,28 C18,20 22,12 32,12 Z" fill="#0b1536" />
            <path d="M32,30 C41,30 45,38 45,44 C45,50 40,55 32,55 C24,55 19,50 19,44 C19,38 23,30 32,30 Z" fill="#fff" />
            <ellipse cx="25" cy="24" rx="3" ry="3.4" fill="#fff" />
            <ellipse cx="39" cy="24" rx="3" ry="3.4" fill="#fff" />
            <circle cx="25.4" cy="24.4" r="1.4" fill="#05070f" />
            <circle cx="38.6" cy="24.4" r="1.4" fill="#05070f" />
            <path d="M28.5,29 L35.5,29 L32,36 Z" fill="#ffb347" />
          </svg>
          <span>
            Static<span>Pengu</span>
          </span>
        </Link>
        <h1>Join the colony.</h1>
        <p className="auth-sub">Create an account to host sites.</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="auth-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="At least 8 characters"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="confirm">Confirm password</label>
            <input
              id="confirm"
              type="password"
              placeholder="Repeat your password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          {error && (
            <div className="auth-error" role="alert">
              {error}
            </div>
          )}

          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?<Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;