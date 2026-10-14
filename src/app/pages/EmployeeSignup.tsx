import { useState } from "react";
import "../styles/pages/auth.css";
import { Link } from "react-router-dom";
import { useEmployeeSignup } from "../hooks/useEmployeeSignup";

const EmployeeSignup = () => {
  const { signup, error, loading } = useEmployeeSignup();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const execute = () => {
    signup(email, password);
  };

  return (
    <div className="auth">
      <h1 className="auth-heading">Signup</h1>
      <p className="auth-para">Your first step in getting noticed</p>
      <div className="auth-form">
        <Link to="/auth/employee/login">login</Link>
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

export default EmployeeSignup;
