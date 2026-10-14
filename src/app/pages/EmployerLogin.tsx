import { useState } from "react";
import "../styles/pages/auth.css";
import { Link } from "react-router-dom";
import { useEmployerLogin } from "../hooks/useEmployerLogin";

const EmployerLogin = () => {
  const { login, error, loading } = useEmployerLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const execute = () => {
    login(email, password);
  };

  return (
    <div className="auth">
      <h1 className="auth-heading">Employer Login</h1>
      <p className="auth-para">Need to make some changes?</p>
      <div className="auth-form">
        <Link to="/auth/employer/signup">signup</Link>

        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="username"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="pwd"
        />
        <button
          style={{
            backgroundColor: loading ? "grey" : "",
            cursor: loading ? "not-allowed" : "pointer",
          }}
          disabled={loading}
          type="button"
          onClick={() => execute()}
        >
          login
        </button>
        {error ? (
          <div className="error-box">
            <p>{error}</p>
          </div>
        ) : (
          <div className="error-box-hidden">
            <p></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerLogin;
