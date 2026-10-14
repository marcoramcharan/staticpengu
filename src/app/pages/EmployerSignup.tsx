import { useState } from "react";
import "../styles/pages/auth.css";
import { Link } from "react-router-dom";
import { useEmployerSignup } from "../hooks/useEmployerSignup";

const EmployerSignup = () => {
  const { signup, error, loading } = useEmployerSignup();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const execute = () => {
    signup(email, password, name);
  };

  return (
    <div className="auth">
      <h1 className="auth-heading">Signup</h1>
      <p className="auth-para">Your first step in getting noticed</p>
      <div className="auth-form">
        <Link to="/auth/employer/login">login</Link>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
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
          signup
        </button>
        {error ? (
          <div className="error-box">
            <p>{error}</p>
          </div>
        ) : (
          <div className="error-box-hidden"></div>
        )}
      </div>
    </div>
  );
};

export default EmployerSignup;
