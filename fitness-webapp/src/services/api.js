import axios from 'axios';

// API Base URLs - update these based on your backend configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const USER_SERVICE_URL = import.meta.env.VITE_USER_SERVICE_URL || 'http://localhost:8081';
const ACTIVITY_SERVICE_URL = import.meta.env.VITE_ACTIVITY_SERVICE_URL || 'http://localhost:8082';

// Create axios instances
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const userServiceClient = axios.create({
  baseURL: USER_SERVICE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const activityServiceClient = axios.create({
  baseURL: ACTIVITY_SERVICE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
const addAuthInterceptor = (client) => {
  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

// Response interceptor for error handling
const addErrorInterceptor = (client) => {
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        // Handle specific error codes
        if (error.response.status === 401) {
          localStorage.removeItem('authToken');
          window.location.href = '/';
        }
      }
      return Promise.reject(error);
    }
  );
};

// Apply interceptors
[apiClient, userServiceClient, activityServiceClient].forEach((client) => {
  addAuthInterceptor(client);
  addErrorInterceptor(client);
});
