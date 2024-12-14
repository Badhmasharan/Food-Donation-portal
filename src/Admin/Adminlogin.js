// AdminLogin.js
import React, { useState } from "react";
import "../LoginPage/Login.css";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();

    // Only allow login if email is 'admin@gmail.com' and password is 'admin'
    if (email === "admin@gmail.com" && password === "admin") {
      alert("Admin login successful!");
      navigate("/admin/Dashboard"); // Redirect to the admin dashboard or home page
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="chatbot-page">
      <div className="chatbot-container">
        <div className="chatbot-header">Admin Login</div>
        <div className="chatbot-subtitle">Access the admin dashboard</div>
        <form onSubmit={handleAdminLogin} style={{ position: "relative" }}>
          <label>Email:</label>
          <input
            className="chatbot-input"
            type="text"
            value={email}
            placeholder="Admin Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <label>Password:</label>
          <div className="password-container">
            <input
              className="chatbot-input"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="password-show-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "hide" : "show"}
            </span>
          </div>
          <button className="chatbot-send-btn" type="submit">
            Admin Login
          </button>
        </form>
        <div className="user-link">
          Are you a user? <a href="/login">Login here</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

