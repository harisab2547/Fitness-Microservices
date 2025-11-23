import { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import './UserList.css';

const UserList = ({ onEdit, onDelete, refreshTrigger }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [refreshTrigger]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getAllUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to load users: ' + err.message);
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.deleteUser(id);
        fetchUsers();
        if (onDelete) onDelete();
      } catch (err) {
        setError('Failed to delete user: ' + err.message);
      }
    }
  };

  if (loading) return <div className="loading">Loading users...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-list">
      <h2>Users</h2>
      {users.length === 0 ? (
        <p className="no-data">No users found. Create your first user!</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name || user.username}</td>
                <td>{user.email}</td>
                <td className="actions">
                  <button onClick={() => onEdit(user)} className="btn-edit">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(user.id)} className="btn-delete">
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
};

export default UserList;
