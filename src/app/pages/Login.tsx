import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore2 } from "../store/store2";

const API_URL = "https://mc-lxcrvq0y7t.b-cdn.net";
const LOGIN_ENDPOINT = `${API_URL}/api/auth/login`;

const css = `
.auth-page, .auth-page * { box-sizing: border-box; }
.auth-page { position: relative; width: 100%; min-height: calc(100vh - 67px); display: flex; align-items: center; justify-content: center; padding: 48px 16px 64px; overflow: hidden; color: var(--sp-ink); font-family: var(--sp-body); font-weight: 700; background: radial-gradient(circle at 80% 25%, #3f8cff 0, transparent 40%), linear-gradient(180deg, #0f2a78 0%, #1a46b8 60%, #2f7cf0 100%); }
.auth-page::before { content: ""; position: absolute; inset: 0; pointer-events: none; background: radial-gradient(circle, rgba(255,255,255,.55) 2.5px, transparent 3px) 0 0 / 90px 90px, radial-gradient(circle, rgba(201,239,255,.4) 2px, transparent 2.5px) 45px 45px / 90px 90px; }
.auth-card { position: relative; width: 100%; max-width: 460px; padding: 38px 34px 40px; border-radius: 32px; background: #fff; border: 5px solid var(--sp-ink); box-shadow: 0 12px 0 var(--sp-ink); transform: rotate(-.6deg); }
.auth-brand { display: inline-flex; align-items: center; gap: 10px; margin-bottom: 22px; color: var(--sp-deep); text-decoration: none; font-family: var(--sp-display); font-weight: 800; font-size: 26px; line-height: 1; }
.auth-brand svg { width: 42px; height: 42px; flex: none; filter: drop-shadow(0 3px 0 var(--sp-ink)); transform: rotate(-6deg); transition: transform .2s; }
.auth-brand:hover svg { transform: rotate(6deg) scale(1.06); }
.auth-brand span span { color: var(--sp-orange); }
.auth-card h1 { margin: 0 0 8px; font-family: var(--sp-display); font-weight: 800; font-size: clamp(38px, 6vw, 54px); line-height: 1; color: #fff; -webkit-text-stroke: 2.5px var(--sp-ink); paint-order: stroke fill; text-shadow: 0 5px 0 var(--sp-ink); }
.auth-sub { margin: 0 0 26px; font-size: 16px; color: #35508f; }
.auth-form { display: flex; flex-direction: column; gap: 18px; }
.auth-field { display: flex; flex-direction: column; gap: 8px; }
.auth-field label { font-family: var(--sp-display); font-size: 14px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; color: var(--sp-deep); }
.auth-field input { width: 100%; padding: 12px 16px; font: inherit; font-size: 17px; font-weight: 800; color: var(--sp-ink); background: #fff; border: 4px solid var(--sp-ink); border-radius: 16px; outline: none; transition: box-shadow .2s, background .2s; }
.auth-field input::placeholder { color: #8aa0cf; }
.auth-field input:focus { background: var(--sp-ice); box-shadow: 0 4px 0 var(--sp-royal); }
.auth-field input:-webkit-autofill { -webkit-text-fill-color: #0a1a4f; -webkit-box-shadow: 0 0 0 100px #eefaff inset; caret-color: #0a1a4f; }
.auth-hint { font-size: 13px; color: #35508f; }
.auth-error { padding: 12px 16px; background: #ffc4d0; color: var(--sp-ink); border: 4px solid var(--sp-ink); border-radius: 18px; box-shadow: 0 4px 0 var(--sp-ink); font-size: 14.5px; font-weight: 800; }
.auth-button { width: 100%; margin-top: 8px; padding: 11px 24px; border: 4px solid var(--sp-ink); border-radius: 999px; background: var(--sp-sun); color: var(--sp-ink); font-family: var(--sp-display); font-size: 21px; font-weight: 800; cursor: pointer; box-shadow: 0 6px 0 var(--sp-ink); transition: transform .12s, box-shadow .12s, opacity .2s; }
.auth-button:hover:not(:disabled) { transform: translateY(3px); box-shadow: 0 3px 0 var(--sp-ink); }
.auth-button:active:not(:disabled) { transform: translateY(6px); box-shadow: 0 0 0 var(--sp-ink); }
.auth-button:disabled { opacity: .55; cursor: not-allowed; transform: translateY(3px); box-shadow: 0 3px 0 var(--sp-ink); }
.auth-button:focus-visible, .auth-brand:focus-visible, .auth-switch a:focus-visible { outline: 3px solid var(--sp-royal); outline-offset: 3px; }
.auth-switch { margin: 26px 0 0; text-align: center; font-size: 15.5px; color: #35508f; }
.auth-switch a { margin-left: 6px; color: var(--sp-royal); font-weight: 800; text-decoration: none; border-bottom: 3px solid var(--sp-sun); transition: color .2s, border-color .2s; }
.auth-switch a:hover { color: var(--sp-deep); border-color: var(--sp-orange); }
@media (max-width: 500px) { .auth-card { padding: 30px 20px 32px; border-radius: 26px; transform: none; } }
@media (prefers-reduced-motion: reduce) { .auth-button, .auth-field input, .auth-brand svg { transition: none; } }
`;

const Login = () => {
  const navigate = useNavigate();
  const login = useStore2((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setError(null);

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(LOGIN_ENDPOINT, {
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
        setError(data.error || data.message || "Invalid email or password.");
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
            <rect x="3" y="3" width="58" height="58" rx="18" fill="#5cc8ff" stroke="#0a1a4f" strokeWidth="4" />
            <path d="M32 12 C43 12 49 21 49 31 C49 46 42 54 32 54 C22 54 15 46 15 31 C15 21 21 12 32 12Z" fill="#12307f" stroke="#0a1a4f" strokeWidth="3" />
            <path d="M32 28 C40 29 44 36 43 43 C42 50 38 53 32 53 C26 53 22 50 21 43 C20 36 24 29 32 28Z" fill="#fff" stroke="#0a1a4f" strokeWidth="2.5" />
            <ellipse cx="25.5" cy="24" rx="4.4" ry="5.2" fill="#fff" stroke="#0a1a4f" strokeWidth="2.5" />
            <ellipse cx="38.5" cy="24" rx="4.4" ry="5.2" fill="#fff" stroke="#0a1a4f" strokeWidth="2.5" />
            <circle cx="26.4" cy="25" r="2.2" fill="#0a1a4f" />
            <circle cx="37.6" cy="25" r="2.2" fill="#0a1a4f" />
            <path d="M28 29.5 Q32 27.5 36 29.5 Q35 34.5 32 35.5 Q29 34.5 28 29.5Z" fill="#ffb629" stroke="#0a1a4f" strokeWidth="2.2" strokeLinejoin="round" />
          </svg>
          <span>
            Static<span>Pengu</span>
          </span>
        </Link>
        <h1>Welcome back.</h1>
        <p className="auth-sub">Log in to manage your sites.</p>

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
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="auth-error" role="alert">
              {error}
            </div>
          )}

          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="auth-switch">
          No account yet?<Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;