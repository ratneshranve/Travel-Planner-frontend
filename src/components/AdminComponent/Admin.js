import React from 'react';
import './Admin.css';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const navigate = useNavigate();

  return (
    <div className="admin-home-container">
      <h1>Welcome, Admin</h1>

      <div className="admin-dashboard">
        <div className="dashboard-card" onClick={() => navigate('/manageusers')}>
          <h3>Manage Users</h3>
          <p>View, verify, block or delete users</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate('/cpadmin')}>
          <h3>Update Password</h3>
          <p>Change password</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate('/reports')}>
          <h3>Reports</h3>
          <p>View analytics and reports</p>
        </div>
      </div>
    </div>
  );
}

export default Admin;
