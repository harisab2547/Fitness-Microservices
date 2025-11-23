import { useState, useEffect } from 'react';
import { activityService } from '../services/activityService';
import './ActivityList.css';

const ActivityList = ({ userId, onEdit, onDelete, refreshTrigger }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, [userId, refreshTrigger]);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = userId
        ? await activityService.getActivitiesByUserId(userId)
        : await activityService.getAllActivities();
      setActivities(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to load activities: ' + err.message);
      console.error('Error fetching activities:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      try {
        await activityService.deleteActivity(id);
        fetchActivities();
        if (onDelete) onDelete();
      } catch (err) {
        setError('Failed to delete activity: ' + err.message);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) return <div className="loading">Loading activities...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="activity-list">
      <h2>Activities</h2>
      {activities.length === 0 ? (
        <p className="no-data">No activities found. Log your first activity!</p>
      ) : (
        <div className="activity-cards">
          {activities.map((activity) => (
            <div key={activity.id} className="activity-card">
              <div className="activity-header">
                <h3>{activity.type || activity.activityType}</h3>
                <span className="activity-date">{formatDate(activity.date)}</span>
              </div>
              <div className="activity-details">
                <p><strong>Duration:</strong> {activity.duration} minutes</p>
                <p><strong>Calories:</strong> {activity.calories || 'N/A'}</p>
                {activity.distance && (
                  <p><strong>Distance:</strong> {activity.distance} km</p>
                )}
                {activity.notes && (
                  <p className="activity-notes"><strong>Notes:</strong> {activity.notes}</p>
                )}
              </div>
              <div className="activity-actions">
                <button onClick={() => onEdit(activity)} className="btn-edit">
                  Edit
                </button>
                <button onClick={() => handleDelete(activity.id)} className="btn-delete">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityList;
