import React, { useState } from "react";
import PetList from "./components/PetList";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AdminDashboard from "./components/AdminDashboard";
import "./index.css";

function App() {
  const [role, setRole] = useState(null); // null = not logged in
  const [showSignup, setShowSignup] = useState(false); // toggle between login/signup

  // ✅ Show signup page
  if (showSignup && !role) {
    return <Signup onSignupSuccess={() => setShowSignup(false)} />;
  }

  // ✅ Show login page if not logged in
  if (!role) {
    return (
      <div>
        <Login onLogin={setRole} />  {/* ✅ Matches prop in Login.js */}
        <p style={{ textAlign: "center" }}>
          Don’t have an account?{" "}
          <button
            onClick={() => setShowSignup(true)}
            style={{
              color: "blue",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Sign up
          </button>
        </p>
      </div>
    );
  }

  // ✅ Show admin dashboard if logged in as admin
  if (role === "admin") {
    return <AdminDashboard />;
  }

  // ✅ Show user dashboard (PetList) if logged in as user
  return (
    <div className="App">
      <h1>🐾 Adopt A Pet</h1>
      <PetList />
    </div>
  );
}

export default App;
