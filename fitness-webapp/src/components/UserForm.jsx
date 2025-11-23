import { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import './UserForm.css';

const UserForm = ({ user, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || user.username || '',
        email: user.email || '',
        password: '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userData = {
        username: formData.name,
        email: formData.email,
        ...(formData.password && { password: formData.password }),
      };

      if (user) {
        await userService.updateUser(user.id, userData);
      } else {
        await userService.createUser(userData);
      }

      setFormData({ name: '', email: '', password: '' });
      if (onSuccess) onSuccess();
    } catch (err) {
      setError('Failed to save user: ' + err.message);
      console.error('Error saving user:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-form">
      <h2>{user ? 'Edit User' : 'Create New User'}</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password {user && '(leave blank to keep current)'}:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={!user}
          />
        </div>
        <div className="form-actions">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Saving...' : user ? 'Update User' : 'Create User'}
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel} className="btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserForm;
