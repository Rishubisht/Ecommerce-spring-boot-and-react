import axios from 'axios';
import { getToken, removeToken } from '../utils/tokenManager';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  // Allow sending cookies (for HttpOnly refresh token cookie set by server).
  // Note: the server must also enable CORS credentials (Access-Control-Allow-Credentials: true)
  // and allow the origin. Without that, cookies won't be sent by the browser.
  withCredentials: true,
});

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - Clear token and redirect to login
          removeToken();
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
          break;
        case 403:
          // Forbidden
          console.error('Access forbidden:', data.message || 'You do not have permission to access this resource');
          break;
        case 404:
          // Not found
          console.error('Resource not found:', data.message || 'The requested resource was not found');
          break;
        case 500:
          // Server error
          console.error('Server error:', data.message || 'Internal server error');
          break;
        default:
          console.error('API Error:', data.message || 'An error occurred');
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network error:', 'No response from server. Please check your connection.');
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;

