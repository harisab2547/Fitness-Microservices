import { useState, useEffect } from 'react';
import { activityService } from '../services/activityService';
import './ActivityForm.css';

const ActivityForm = ({ activity, userId, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    type: '',
    duration: '',
    calories: '',
    distance: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    userId: userId || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const activityTypes = ['Running', 'Cycling', 'Swimming', 'Walking', 'Gym', 'Yoga', 'Other'];

  useEffect(() => {
    if (activity) {
      setFormData({
        type: activity.type || activity.activityType || '',
        duration: activity.duration || '',
        calories: activity.calories || '',
        distance: activity.distance || '',
        date: activity.date ? new Date(activity.date).toISOString().split('T')[0] : '',
        notes: activity.notes || '',
        userId: activity.userId || userId || '',
      });
    }
  }, [activity, userId]);

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
      const activityData = {
        activityType: formData.type,
        duration: parseInt(formData.duration),
        calories: formData.calories ? parseInt(formData.calories) : null,
        distance: formData.distance ? parseFloat(formData.distance) : null,
        date: formData.date,
        notes: formData.notes,
        userId: parseInt(formData.userId),
      };

      if (activity) {
        await activityService.updateActivity(activity.id, activityData);
      } else {
        await activityService.createActivity(activityData);
      }

      setFormData({
        type: '',
        duration: '',
        calories: '',
        distance: '',
        date: new Date().toISOString().split('T')[0],
        notes: '',
        userId: userId || '',
      });
      if (onSuccess) onSuccess();
    } catch (err) {
      setError('Failed to save activity: ' + err.message);
      console.error('Error saving activity:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="activity-form">
      <h2>{activity ? 'Edit Activity' : 'Log New Activity'}</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="type">Activity Type:</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select type...</option>
            {activityTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration (minutes):</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            min="1"
          />
        </div>
        <div className="form-group">
          <label htmlFor="calories">Calories (optional):</label>
          <input
            type="number"
            id="calories"
            name="calories"
            value={formData.calories}
            onChange={handleChange}
            min="0"
          />
        </div>
        <div className="form-group">
          <label htmlFor="distance">Distance in km (optional):</label>
          <input
            type="number"
            id="distance"
            name="distance"
            step="0.1"
            value={formData.distance}
            onChange={handleChange}
            min="0"
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="userId">User ID:</label>
          <input
            type="number"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
            min="1"
          />
        </div>
        <div className="form-group">
          <label htmlFor="notes">Notes (optional):</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
          />
        </div>
        <div className="form-actions">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Saving...' : activity ? 'Update Activity' : 'Log Activity'}
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

export default ActivityForm;
