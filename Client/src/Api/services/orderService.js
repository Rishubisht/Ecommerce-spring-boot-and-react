import apiClient from '../config/axiosConfig';
import API_ENDPOINTS from '../config/apiEndpoints';
import { handleApiError } from '../utils/errorHandler';

/**
 * Order Service
 * Handles all order-related API calls
 */
export const orderService = {
  /**
   * Create new order
   * @param {Object} orderData - Order data
   * @returns {Promise} - Created order
   */
  createOrder: async (orderData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.ORDER.CREATE, orderData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Get all orders for current user
   * @param {Object} params - Query parameters
   * @returns {Promise} - Orders list
   */
  getAllOrders: async (params = {}) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ORDER.GET_ALL, { params });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Get order by ID
   * @param {string|number} id - Order ID
   * @returns {Promise} - Order data
   */
  getOrderById: async (id) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ORDER.GET_BY_ID(id));
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Update order status
   * @param {string|number} id - Order ID
   * @param {Object} statusData - { status }
   * @returns {Promise} - Updated order
   */
  updateOrderStatus: async (id, statusData) => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.ORDER.UPDATE_STATUS(id), statusData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Cancel order
   * @param {string|number} id - Order ID
   * @returns {Promise} - Cancelled order
   */
  cancelOrder: async (id) => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.ORDER.CANCEL(id));
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

export default orderService;
