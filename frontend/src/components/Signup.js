// src/components/Signup.js
import React, { useState } from "react";
import axios from "axios";

function Signup({ onSignupSuccess }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/users/register", {
        username,
        email,
        password,
      });

      const newUser = response.data;

      // Save logged-in user info in localStorage
      localStorage.setItem("user", JSON.stringify(newUser));

      setMessage("✅ Signup successful! You can now adopt pets.");

      // Clear form
      setUsername("");
      setEmail("");
      setPassword("");

      // Notify parent (optional)
      if (onSignupSuccess) onSignupSuccess();
    } catch (error) {
      console.error(error.response || error);
      const errMsg =
        error.response?.data?.message ||
        error.response?.data ||
        "Please try again.";

      setMessage(`❌ Signup failed: ${errMsg}`);
    }
  };

  return (
    <div className="signup-container">
      <h2>🐾 Create Your Account</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Sign Up</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Signup;



/*

import React, { useState } from "react";
import axios from "axios";

function Signup({ onSignupSuccess }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Send request to backend
      await axios.post("http://localhost:8080/api/users/register", {
        username,  // must match User entity
        email,
        password,
      });

      setMessage("✅ Signup successful! You can now log in.");

      // Clear form
      setUsername("");
      setEmail("");
      setPassword("");

      // Optional: notify parent to switch to login page
      if (onSignupSuccess) onSignupSuccess();
    } catch (error) {
      console.error(error.response || error);

      // Show backend error if available
      const errMsg =
        error.response?.data?.message ||
        error.response?.data ||
        "Please try again.";

      setMessage(`❌ Signup failed: ${errMsg}`);
    }
  };

  return (
    <div className="signup-container">
      <h2>🐾 Create Your Account</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Sign Up</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Signup;
*/

/*
import axios from "axios";

function Signup({ onSignupSuccess }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/users/register", {
        username,   // ⚡ must match User entity
        email,
        password,
      });
    

      setMessage("✅ Signup successful! You can now log in.");
      setUsername("");
      setEmail("");
      setPassword("");

      if (onSignupSuccess) onSignupSuccess(); // navigate to login
    } catch (error) {
      console.error(error.response || error);
      setMessage("❌ Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <h2>🐾 Create Your Account</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Sign Up</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Signup;

*/
