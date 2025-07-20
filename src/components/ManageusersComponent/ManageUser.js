import './ManageUser.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { userApi } from '../../apiurl'; // Make sure userApi is like 'http://localhost:3001/user/'

function ManageUser() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get(userApi + 'fetch')
      .then((res) => {
        const userOnly = res.data.filter(user => user.role === 'user');
        setUsers(userOnly);
        setError('');
      })
      .catch(() => setError('Failed to fetch users.'));
  };

  const changeStatus = (_id, action) => {
    const update = (statusMsg, statusCode) => {
      axios.patch(userApi + 'update', {
        condition_obj: { _id },
        content_obj: { status: statusCode }
      }).then(() => {
        alert(`User ${statusMsg}`);
        fetchUsers();
      }).catch(() => alert(`${statusMsg} failed`));
    };

    if (action === 'verify') update("verified", 1);
    else if (action === 'block') update("blocked", 0);
    else if (action === 'delete') {
      axios.delete(userApi + 'delete', { data: { _id } })
        .then(() => {
          alert("User deleted");
          fetchUsers();
        })
        .catch(() => alert("Deletion failed"));
    }
  };

  return (
    <div className="manage-users-container">
      <h2>Manage Users</h2>

      {error && <div className="error-message">{error}</div>}

      <table className="users-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Registered</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  {users.length > 0 ? (
    users.map((user, index) => (
      <tr key={user._id}>
        <td data-label="S.No">{index + 1}</td>
        <td data-label="Name">{user.name}</td>
        <td data-label="Email">{user.email}</td>
        <td data-label="Registered">
          {user.info ? new Date(user.info).toLocaleDateString() : '-'}
        </td>
        <td data-label="Status">
          {user.status === 0 ? 'Blocked' : 'Verified'}
        </td>
        <td data-label="Actions">
          {user.status === 0 ? (
            <button className="btn verify" onClick={() => changeStatus(user._id, 'verify')}>
              Verify
            </button>
          ) : (
            <button className="btn block" onClick={() => changeStatus(user._id, 'block')}>
              Block
            </button>
          )}
          <button className="btn delete" onClick={() => changeStatus(user._id, 'delete')}>
            Delete
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td data-label="Notice" colSpan="6">No users found.</td>
    </tr>
  )}
</tbody>

      </table>
    </div>
  );
}

export default ManageUser;
