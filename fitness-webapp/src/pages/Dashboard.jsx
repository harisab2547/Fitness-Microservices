import { useState } from 'react';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';
import ActivityList from '../components/ActivityList';
import ActivityForm from '../components/ActivityForm';
import './Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [refreshUsers, setRefreshUsers] = useState(0);
  const [refreshActivities, setRefreshActivities] = useState(0);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowUserForm(true);
  };

  const handleUserSuccess = () => {
    setShowUserForm(false);
    setSelectedUser(null);
    setRefreshUsers(prev => prev + 1);
  };

  const handleEditActivity = (activity) => {
    setSelectedActivity(activity);
    setShowActivityForm(true);
  };

  const handleActivitySuccess = () => {
    setShowActivityForm(false);
    setSelectedActivity(null);
    setRefreshActivities(prev => prev + 1);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Fitness Tracker</h1>
        <p>Manage your fitness journey</p>
      </header>

      <div className="dashboard-tabs">
        <button
          className={`tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('users');
            setShowUserForm(false);
            setShowActivityForm(false);
          }}
        >
          Users
        </button>
        <button
          className={`tab ${activeTab === 'activities' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('activities');
            setShowUserForm(false);
            setShowActivityForm(false);
          }}
        >
          Activities
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'users' && (
          <div className="users-section">
            <div className="section-header">
              <h2>User Management</h2>
              {!showUserForm && (
                <button
                  className="btn-primary"
                  onClick={() => {
                    setSelectedUser(null);
                    setShowUserForm(true);
                  }}
                >
                  Create User
                </button>
              )}
            </div>
            {showUserForm ? (
              <UserForm
                user={selectedUser}
                onSuccess={handleUserSuccess}
                onCancel={() => {
                  setShowUserForm(false);
                  setSelectedUser(null);
                }}
              />
            ) : (
              <UserList
                onEdit={handleEditUser}
                onDelete={() => setRefreshUsers(prev => prev + 1)}
                refreshTrigger={refreshUsers}
              />
            )}
          </div>
        )}

        {activeTab === 'activities' && (
          <div className="activities-section">
            <div className="section-header">
              <h2>Activity Tracking</h2>
              {!showActivityForm && (
                <button
                  className="btn-primary"
                  onClick={() => {
                    setSelectedActivity(null);
                    setShowActivityForm(true);
                  }}
                >
                  Log Activity
                </button>
              )}
            </div>
            {showActivityForm ? (
              <ActivityForm
                activity={selectedActivity}
                onSuccess={handleActivitySuccess}
                onCancel={() => {
                  setShowActivityForm(false);
                  setSelectedActivity(null);
                }}
              />
            ) : (
              <ActivityList
                onEdit={handleEditActivity}
                onDelete={() => setRefreshActivities(prev => prev + 1)}
                refreshTrigger={refreshActivities}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
