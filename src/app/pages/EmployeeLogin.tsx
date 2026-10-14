import { useState } from "react";
import "../styles/pages/auth.css";
import { Link } from "react-router-dom";
import { useEmployeeLogin } from "../hooks/useEmployeeLogin";

const EmployeeLogin = () => {
  const { login, error, loading } = useEmployeeLogin();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const execute = () => {
    login(username, password);
  };

  return (
    <div className="auth">
      <h1 className="auth-heading">Login</h1>
      <p className="auth-para">Need to make some changes?</p>
      <div className="auth-form">
        <Link to="/auth/employee/signup">signup</Link>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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

export default EmployeeLogin;
