// src/components/AdminDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard({ onLogout }) {
  const [requests, setRequests] = useState([]);

  // load requests when the page opens
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/adoptions");
      setRequests(res.data);
    } catch (err) {
      alert("Error loading adoption requests");
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/adoptions/${id}/approve`);
      alert("Request approved!");
      fetchRequests(); // refresh the list
    } catch (err) {
      alert("Error approving request");
    }
  };

  const handleDeny = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/adoptions/${id}/deny`);
      alert("Request denied!");
      fetchRequests();
    } catch (err) {
      alert("Error denying request");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>Admin Dashboard</h2>
      <button
        onClick={onLogout}
        style={{ marginBottom: "20px", padding: "8px 16px" }}
      >
        Logout
      </button>
      <h3>All Adoption Requests</h3>
      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <table border="1" style={{ margin: "0 auto" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Pet</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.user?.username}</td>
                <td>{req.pet?.name}</td>
                <td>{req.status}</td>
                <td>
                  <button onClick={() => handleApprove(req.id)}>Approve</button>{" "}
                  <button onClick={() => handleDeny(req.id)}>Deny</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminDashboard;
