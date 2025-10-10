import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchRequests();
    fetchUsers();
  }, []);

  // Fetch all adoption requests
  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/adoptions");
      setRequests(res.data);
    } catch (err) {
      alert("Error loading adoption requests");
    }
  };

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/users");
      setUsers(res.data);
    } catch (err) {
      alert("Error loading users");
    }
  };

  // Approve adoption
  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/adoptions/${id}/approve`);
      alert("Request approved!");
      fetchRequests();
    } catch (err) {
      alert("Error approving request");
    }
  };

  // Deny adoption
  const handleDeny = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/adoptions/${id}/deny`);
      alert("Request denied!");
      fetchRequests();
    } catch (err) {
      alert("Error denying request");
    }
  };

  //  Delete user
  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:8080/api/users/${id}`);
        alert("User deleted successfully!");
        fetchUsers();
      } catch (err) {
        alert("Error deleting user");
      }
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>Admin Dashboard</h2>

      {/* 🐾 Adoption Requests Section */}
      <h3>All Adoption Requests</h3>
      {requests.length === 0 ? (
        <p>No adoption requests found.</p>
      ) : (
        <table border="1" style={{ margin: "0 auto", marginBottom: "40px" }}>
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

      {/*  User Management Section */}
      <h3>All Registered Users</h3>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table border="1" style={{ margin: "0 auto" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    style={{ backgroundColor: "red", color: "white" }}
                  >
                    Delete
                  </button>
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
