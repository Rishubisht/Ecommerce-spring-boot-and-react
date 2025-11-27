/**
 * Centralized error handler for API responses
 * @param {Error} error - Axios error object
 * @returns {Object} - Formatted error object
 */
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    return {
      message: data.message || data.error || 'An error occurred',
      status,
      data: data.data || null,
      errors: data.errors || null,
    };
  } else if (error.request) {
    // Request was made but no response received
    return {
      message: 'Network error. Please check your connection.',
      status: 0,
      data: null,
      errors: null,
    };
  } else {
    // Something else happened
    return {
      message: error.message || 'An unexpected error occurred',
      status: null,
      data: null,
      errors: null,
    };
  }
};

/**
 * Format validation errors from API response
 * @param {Object} errors - Validation errors object
 * @returns {string} - Formatted error message
 */
export const formatValidationErrors = (errors) => {
  if (!errors) return '';
  
  if (typeof errors === 'string') {
    return errors;
  }
  
  if (Array.isArray(errors)) {
    return errors.join(', ');
  }
  
  if (typeof errors === 'object') {
    return Object.values(errors)
      .flat()
      .join(', ');
  }
  
  return 'Validation error';
};
