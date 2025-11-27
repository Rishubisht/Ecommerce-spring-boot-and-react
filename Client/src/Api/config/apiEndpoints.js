// Centralized API endpoints configuration
const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },

  // User endpoints
  USER: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    CHANGE_PASSWORD: '/users/change-password',
    GET_ALL: '/users',
    GET_BY_ID: (id) => `/users/${id}`,
    UPDATE: (id) => `/users/${id}`,
    DELETE: (id) => `/users/${id}`,
  },

  // Product endpoints
  PRODUCT: {
    GET_ALL: '/products',
    GET_BY_ID: (id) => `/products/${id}`,
    CREATE: '/products',
    UPDATE: (id) => `/products/${id}`,
    DELETE: (id) => `/products/${id}`,
    SEARCH: '/products/search',
    GET_BY_CATEGORY: (categoryId) => `/products/category/${categoryId}`,
  },

  // Cart endpoints
  CART: {
    GET: '/cart',
    ADD_ITEM: '/cart/add',
    UPDATE_ITEM: (itemId) => `/cart/items/${itemId}`,
    REMOVE_ITEM: (itemId) => `/cart/items/${itemId}`,
    CLEAR: '/cart/clear',
  },

  // Order endpoints
  ORDER: {
    CREATE: '/orders',
    GET_ALL: '/orders',
    GET_BY_ID: (id) => `/orders/${id}`,
    UPDATE_STATUS: (id) => `/orders/${id}/status`,
    CANCEL: (id) => `/orders/${id}/cancel`,
  },
};

export default API_ENDPOINTS;

