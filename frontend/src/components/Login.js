import React from "react";

function Login({ onLogin }) {
  // simple local variables
  let username = "";
  let password = "";
  let role = "user"; // default role

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      onLogin(role); // pass role to App.js
    } else {
      alert("Please enter username and password");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => (username = e.target.value)}
        />
        <br /><br />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => (password = e.target.value)}
        />
        <br /><br />
        <label>
          Select Role:{" "}
          <select onChange={(e) => (role = e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
