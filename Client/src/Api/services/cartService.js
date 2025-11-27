import apiClient from '../config/axiosConfig';
import API_ENDPOINTS from '../config/apiEndpoints';
import { handleApiError } from '../utils/errorHandler';

/**
 * Cart Service
 * Handles all cart-related API calls
 */
export const cartService = {
  /**
   * Get user's cart
   * @returns {Promise} - Cart data
   */
  getCart: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.CART.GET);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Add item to cart
   * @param {Object} itemData - { productId, quantity }
   * @returns {Promise} - Updated cart
   */
  addItem: async (itemData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.CART.ADD_ITEM, itemData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Update cart item
   * @param {string|number} itemId - Cart item ID
   * @param {Object} updateData - { quantity }
   * @returns {Promise} - Updated cart
   */
  updateItem: async (itemId, updateData) => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.CART.UPDATE_ITEM(itemId), updateData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Remove item from cart
   * @param {string|number} itemId - Cart item ID
   * @returns {Promise} - Updated cart
   */
  removeItem: async (itemId) => {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.CART.REMOVE_ITEM(itemId));
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Clear entire cart
   * @returns {Promise}
   */
  clearCart: async () => {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.CART.CLEAR);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

export default cartService;
