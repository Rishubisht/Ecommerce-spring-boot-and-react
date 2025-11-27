import apiClient from '../config/axiosConfig';
import API_ENDPOINTS from '../config/apiEndpoints';
import { handleApiError } from '../utils/errorHandler';

/**
 * Product Service
 * Handles all product-related API calls
 */
export const productService = {
  /**
   * Get all products
   * @param {Object} params - Query parameters (page, limit, sort, etc.)
   * @returns {Promise} - Products list
   */
  getAllProducts: async (params = {}) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PRODUCT.GET_ALL, { params });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Get product by ID
   * @param {string|number} id - Product ID
   * @returns {Promise} - Product data
   */
  getProductById: async (id) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PRODUCT.GET_BY_ID(id));
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Create new product
   * @param {Object} productData - Product data
   * @returns {Promise} - Created product
   */
  createProduct: async (productData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.PRODUCT.CREATE, productData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Update product
   * @param {string|number} id - Product ID
   * @param {Object} productData - Updated product data
   * @returns {Promise} - Updated product
   */
  updateProduct: async (id, productData) => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.PRODUCT.UPDATE(id), productData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Delete product
   * @param {string|number} id - Product ID
   * @returns {Promise}
   */
  deleteProduct: async (id) => {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.PRODUCT.DELETE(id));
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Search products
   * @param {Object} searchParams - Search parameters
   * @returns {Promise} - Search results
   */
  searchProducts: async (searchParams) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PRODUCT.SEARCH, { params: searchParams });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Get products by category
   * @param {string|number} categoryId - Category ID
   * @param {Object} params - Query parameters
   * @returns {Promise} - Products list
   */
  getProductsByCategory: async (categoryId, params = {}) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PRODUCT.GET_BY_CATEGORY(categoryId), { params });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

export default productService;
