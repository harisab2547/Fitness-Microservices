import { activityServiceClient } from './api';

export const activityService = {
  // Get all activities
  getAllActivities: async () => {
    const response = await activityServiceClient.get('/activities');
    return response.data;
  },

  // Get activities by user ID
  getActivitiesByUserId: async (userId) => {
    const response = await activityServiceClient.get(`/activities/user/${userId}`);
    return response.data;
  },

  // Get activity by ID
  getActivityById: async (id) => {
    const response = await activityServiceClient.get(`/activities/${id}`);
    return response.data;
  },

  // Create new activity
  createActivity: async (activityData) => {
    const response = await activityServiceClient.post('/activities', activityData);
    return response.data;
  },

  // Update activity
  updateActivity: async (id, activityData) => {
    const response = await activityServiceClient.put(`/activities/${id}`, activityData);
    return response.data;
  },

  // Delete activity
  deleteActivity: async (id) => {
    const response = await activityServiceClient.delete(`/activities/${id}`);
    return response.data;
  },

  // Get activity statistics
  getActivityStats: async (userId) => {
    const response = await activityServiceClient.get(`/activities/stats/${userId}`);
    return response.data;
  },
};
