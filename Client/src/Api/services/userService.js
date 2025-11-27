import apiClient from '../config/axiosConfig';
import API_ENDPOINTS from '../config/apiEndpoints';
import { handleApiError } from '../utils/errorHandler';

/**
 * User Service
 * Handles all user-related API calls
 */
export const userService = {
  /**
   * Get current user profile
   * @returns {Promise} - User profile data
   */
  getProfile: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USER.PROFILE);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Update user profile
   * @param {Object} profileData - Updated profile data
   * @returns {Promise} - Updated user profile
   */
  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.USER.UPDATE_PROFILE, profileData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Change user password
   * @param {Object} passwordData - { currentPassword, newPassword }
   * @returns {Promise}
   */
  changePassword: async (passwordData) => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.USER.CHANGE_PASSWORD, passwordData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Get all users (Admin only)
   * @param {Object} params - Query parameters
   * @returns {Promise} - Users list
   */
  getAllUsers: async (params = {}) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USER.GET_ALL, { params });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Get user by ID
   * @param {string|number} id - User ID
   * @returns {Promise} - User data
   */
  getUserById: async (id) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USER.GET_BY_ID(id));
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Update user (Admin only)
   * @param {string|number} id - User ID
   * @param {Object} userData - Updated user data
   * @returns {Promise} - Updated user
   */
  updateUser: async (id, userData) => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.USER.UPDATE(id), userData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Delete user (Admin only)
   * @param {string|number} id - User ID
   * @returns {Promise}
   */
  deleteUser: async (id) => {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.USER.DELETE(id));
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

export default userService;
