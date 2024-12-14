import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/users`);
      const user = response.data.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        // Update the user's isloggedin status to 1 in the backend
        await axios.patch(`http://localhost:5000/users/${user.id}`, {
          isloggedin: 1
        });

        alert("Login successful!");
        navigate("/"); 
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login", error);
      alert("Login failed");
    }
  };

  return (
    <div className="chatbot-page">
      <div className="chatbot-container">
        <div className="chatbot-header">Login</div>
        <div className="chatbot-subtitle">Stay updated on your professional world</div>
        <form onSubmit={handleLogin} style={{ position: "relative" }}>
          <label>Email:</label>
          <input
            className="chatbot-input"
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br></br>
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
            Login
          </button>
        </form>
        <div className="bottom-link">
          New here? <a href="#">Register</a>
        </div>
        <div className="admin-link">
          Are you an admin? <a href="/admin-login">Login here</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
