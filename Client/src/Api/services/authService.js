import apiClient from '../config/axiosConfig';
import API_ENDPOINTS from '../config/apiEndpoints';
import { saveToken, saveRefreshToken, removeToken } from '../utils/tokenManager';
import { handleApiError } from '../utils/errorHandler';

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */
export const authService = {
  /**
   * Login user
   * @param {Object} credentials - { email, password }
   * @returns {Promise} - User data and tokens
   */
  login: async (credentials) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      // Server may send access token in response body and refresh token in different ways:
      // - access token in response.data (e.g. { token })
      // - refresh token in response.data.refreshToken (not recommended for long-term security)
      // - refresh token as an HttpOnly cookie (Set-Cookie) -> the browser manages it and JS cannot read it
      // Try to read tokens from body first. If refresh token is only sent as an HttpOnly cookie, it will
      // not be accessible here (by design) — the browser will store it and send it on subsequent requests
      // when withCredentials is enabled in axios (configured in axiosConfig.js).
      const { token, refreshToken, user } = response.data || {};

      // Save access token if present
      if (token) saveToken(token);

      // Save refresh token only if server returned it in response body (fallback). If server uses
      // HttpOnly cookie for refresh tokens (recommended), there is nothing to save in JS.
      if (refreshToken) saveRefreshToken(refreshToken);

      return response;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Register new user
   * @param {Object} userData - User registration data
   * @returns {Promise} - User data and tokens
   */
  register: async (userData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
      // Same handling as login: prefer token in body, but refresh token might be sent as HttpOnly cookie
      const { token, refreshToken, user } = response.data || {};

      if (token) saveToken(token);
      if (refreshToken) saveRefreshToken(refreshToken);

      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Logout user
   * @returns {Promise}
   */
  logout: async () => {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
      removeToken();
      return true;
    } catch (error) {
      // Even if API call fails, remove token locally
      removeToken();
      throw handleApiError(error);
    }
  },

  /**
   * Refresh access token
   * @returns {Promise} - New tokens
   */
  refreshToken: async () => {
    try {
      // IMPORTANT: If server stores the refresh token as an HttpOnly cookie, we must send the request
      // with credentials so the browser includes the cookie. axios instance is configured with
      // withCredentials: true (see axiosConfig.js). The server should read the refresh token from the
      // cookie and return a new access token in the response body.
      const response = await apiClient.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN);

      // Access token expected in response body (e.g. { token: '...' })
      const { token, refreshToken } = response.data || {};

      if (token) saveToken(token);
      // If server rotates refresh tokens and returns a new one in the response body, save it.
      if (refreshToken) saveRefreshToken(refreshToken);

      return response.data;
    } catch (error) {
      removeToken();
      throw handleApiError(error);
    }
  },

  /**
   * Request password reset
   * @param {string} email - User email
   * @returns {Promise}
   */
  forgotPassword: async (email) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Reset password with token
   * @param {Object} resetData - { token, newPassword }
   * @returns {Promise}
   */
  resetPassword: async (resetData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, resetData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

export default authService;
