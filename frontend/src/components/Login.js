import React, { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {  // matches prop name in App.js
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/users/login", {
        username,
        password,
      });

      const userData = response.data;
      localStorage.setItem("user", JSON.stringify(userData));  

      setMessage(`Welcome back, ${userData.username || username}!`);

      // Update role in App.js so it switches page
      if (onLogin) onLogin(userData.role?.toLowerCase());

      // Clear form
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Login failed:", error);
      const errMsg =
        error.response?.data?.message ||
        error.response?.data ||
        "Invalid username or password";
      setMessage(`❌ ${errMsg}`);
    }
  };

  return (
    <div className="login-container">
      <h2> User Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Login;
