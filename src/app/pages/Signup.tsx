import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../store/store";

const API_URL = "http://localhost:3000";
const SIGNUP_ENDPOINT = `${API_URL}/api/auth/signup`;

const css = `
.auth-page { width: 100%; min-height: calc(100vh - 90px); display: flex; align-items: center; justify-content: center; padding: 32px 16px; }
.auth-card { width: 100%; max-width: 460px; background: #fffaee; border: 6px solid #1e1a2b; border-radius: 40px; box-shadow: 10px 10px 0 #1e1a2b, 0 10px 20px rgba(0,0,0,.12); padding: 36px 32px; }
.auth-brand { display: inline-block; margin-bottom: 18px; font-size: 28px; font-weight: 900; letter-spacing: -1.5px; color: #1e1a2b; background: #ffd966; padding: 5px 22px 6px 18px; border: 5px solid #1e1a2b; border-radius: 100px; box-shadow: 5px 5px 0 #1e1a2b; transform: rotate(-1.5deg); line-height: 1.1; }
.auth-brand span { color: #ff5e5e; text-shadow: 2px 2px 0 #1e1a2b; -webkit-text-stroke: 1px #1e1a2b; }
.auth-brand::before { content: "🐧"; font-size: 24px; margin-right: 8px; display: inline-block; vertical-align: middle; transform: scaleX(-1); }
.auth-card h1 { font-size: clamp(28px, 5vw, 40px); line-height: 1.05; letter-spacing: -2px; font-weight: 900; color: #1e1a2b; margin: 0 0 8px; text-shadow: 3px 3px 0 #ffb347; -webkit-text-stroke: 1.5px #1e1a2b; }
.auth-sub { display: inline-block; font-size: 15px; font-weight: 600; color: #3d3552; margin: 0 0 24px; background: #e0d7ff; padding: 6px 16px; border-radius: 40px; border: 3px solid #1e1a2b; box-shadow: 3px 3px 0 #1e1a2b; }
.auth-form { display: flex; flex-direction: column; gap: 16px; }
.auth-field { display: flex; flex-direction: column; gap: 8px; }
.auth-field label { font-size: 12px; font-weight: 900; letter-spacing: .5px; color: #1e1a2b; background: #ffd966; align-self: flex-start; padding: 3px 14px; border-radius: 40px; border: 3px solid #1e1a2b; box-shadow: 3px 3px 0 #1e1a2b; text-transform: uppercase; }
.auth-field input { width: 100%; box-sizing: border-box; padding: 12px 16px; font: inherit; font-size: 17px; font-weight: 700; color: #1e1a2b; background: #fffaee; border: 5px solid #1e1a2b; border-radius: 22px; box-shadow: inset 0 0 0 3px #fff2d7, 4px 4px 0 #1e1a2b; outline: none; transition: .15s; }
.auth-field input::placeholder { color: #b8a98a; font-weight: 500; }
.auth-field input:focus { background: #fff5da; box-shadow: inset 0 0 0 3px #fff6e6, 4px 4px 0 #ff5e5e; }
.auth-hint { font-size: 12px; font-weight: 600; color: #3d3552; }
.auth-error { padding: 12px 18px; background: #ffc9c9; color: #9e1e1e; border: 4px solid #1e1a2b; border-radius: 20px; box-shadow: 4px 4px 0 #1e1a2b; font-size: 14px; font-weight: 700; }
.auth-button { width: 100%; margin-top: 6px; padding: 14px 18px; border: 4px solid #1e1a2b; border-radius: 50px; background: linear-gradient(145deg, #7fd1ff, #5aa9e6); color: #1e1a2b; font: inherit; font-size: 16px; font-weight: 900; letter-spacing: -.3px; cursor: pointer; box-shadow: 0 6px 0 #1e1a2b, 0 10px 16px rgba(0,0,0,.18); transition: all .08s linear; text-transform: uppercase; }
.auth-button:hover:not(:disabled) { transform: translateY(-3px); box-shadow: 0 9px 0 #1e1a2b, 0 13px 18px rgba(0,0,0,.18); }
.auth-button:active:not(:disabled) { transform: translateY(4px); box-shadow: 0 2px 0 #1e1a2b, 0 6px 10px rgba(0,0,0,.12); }
.auth-button:disabled { opacity: .55; cursor: not-allowed; background: #c0c0d0; filter: grayscale(.5); transform: translateY(3px); box-shadow: 0 3px 0 #1e1a2b; }
.auth-switch { margin-top: 22px; text-align: center; font-size: 14px; font-weight: 700; color: #3d3552; }
.auth-switch a { color: #1e1a2b; background: #e0d7ff; padding: 4px 12px; border: 3px solid #1e1a2b; border-radius: 30px; box-shadow: 2px 2px 0 #1e1a2b; text-decoration: none; font-weight: 900; margin-left: 6px; }
.auth-switch a:hover { background: #c9b8ff; }
@media (max-width: 500px) { .auth-card { padding: 26px 18px; border-radius: 30px; } }
`;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Signup = () => {
  const navigate = useNavigate();
  const login = useStore((s) => s.login);
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
        <div className="auth-brand">
          static<span>pengu</span>
        </div>
        <h1>Join the colony.</h1>
        <p className="auth-sub">🐧 Create an account to host sites</p>

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
