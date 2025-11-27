// Token management utilities
const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

/**
 * Save authentication token to localStorage
 * @param {string} token - JWT token
 */
export const saveToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

/**
 * Get authentication token from localStorage
 * @returns {string|null} - JWT token or null
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Remove authentication token from localStorage
 */
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

/**
 * Save refresh token to localStorage
 * @param {string} refreshToken - Refresh token
 */
export const saveRefreshToken = (refreshToken) => {
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
};

/**
 * Get refresh token from localStorage
 * @returns {string|null} - Refresh token or null
 */
export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * Check if user is authenticated
 * @returns {boolean} - True if token exists
 */
export const isAuthenticated = () => {
  return !!getToken();
};
