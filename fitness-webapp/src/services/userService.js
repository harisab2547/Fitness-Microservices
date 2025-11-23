import { userServiceClient } from './api';

export const userService = {
  // Get all users
  getAllUsers: async () => {
    const response = await userServiceClient.get('/users');
    return response.data;
  },

  // Get user by ID
  getUserById: async (id) => {
    const response = await userServiceClient.get(`/users/${id}`);
    return response.data;
  },

  // Create new user
  createUser: async (userData) => {
    const response = await userServiceClient.post('/users', userData);
    return response.data;
  },

  // Update user
  updateUser: async (id, userData) => {
    const response = await userServiceClient.put(`/users/${id}`, userData);
    return response.data;
  },

  // Delete user
  deleteUser: async (id) => {
    const response = await userServiceClient.delete(`/users/${id}`);
    return response.data;
  },

  // Login
  login: async (credentials) => {
    const response = await userServiceClient.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  },

  // Register
  register: async (userData) => {
    const response = await userServiceClient.post('/auth/register', userData);
    return response.data;
  },
};
