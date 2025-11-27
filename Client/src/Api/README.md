# Centralized API Configuration

This directory contains a centralized API setup using Axios for making HTTP requests to the backend.

## Structure

```
Api/
├── config/
│   ├── axiosConfig.js      # Centralized Axios instance with interceptors
│   └── apiEndpoints.js     # All API endpoints configuration
├── services/
│   ├── authService.js      # Authentication API calls
│   ├── productService.js   # Product API calls
│   ├── cartService.js      # Cart API calls
│   ├── orderService.js     # Order API calls
│   └── userService.js      # User API calls
├── utils/
│   ├── tokenManager.js     # Token management utilities
│   └── errorHandler.js     # Error handling utilities
└── index.js                # Centralized exports
```

## Setup

1. **Environment Variables**: Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:8080/api
   ```

2. **Import and Use**:
   ```javascript
   // Import specific service
   import { authService } from './Api';
   
   // Or import everything
   import { authService, productService, cartService } from './Api';
   ```

## Usage Examples

### Authentication
```javascript
import { authService } from './Api';

// Login
try {
  const response = await authService.login({
    email: 'user@example.com',
    password: 'password123'
  });
  console.log('Logged in:', response.user);
} catch (error) {
  console.error('Login failed:', error.message);
}

// Register
try {
  const response = await authService.register({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'password123'
  });
  console.log('Registered:', response.user);
} catch (error) {
  console.error('Registration failed:', error.message);
}

// Logout
await authService.logout();
```

### Products
```javascript
import { productService } from './Api';

// Get all products
const products = await productService.getAllProducts({ page: 1, limit: 10 });

// Get product by ID
const product = await productService.getProductById(1);

// Search products
const results = await productService.searchProducts({ q: 'laptop' });
```

### Cart
```javascript
import { cartService } from './Api';

// Get cart
const cart = await cartService.getCart();

// Add item to cart
await cartService.addItem({ productId: 1, quantity: 2 });

// Update item quantity
await cartService.updateItem(itemId, { quantity: 3 });

// Remove item
await cartService.removeItem(itemId);
```

### Orders
```javascript
import { orderService } from './Api';

// Create order
const order = await orderService.createOrder({
  items: [...],
  shippingAddress: {...}
});

// Get all orders
const orders = await orderService.getAllOrders();
```

## Features

### Automatic Token Management
- Tokens are automatically added to request headers
- Tokens are saved after login/register
- Tokens are removed on logout or 401 errors

### Error Handling
- Centralized error handling with interceptors
- Automatic redirect to login on 401 errors
- Consistent error format across all services

### Request/Response Interceptors
- **Request Interceptor**: Automatically adds Authorization header with token
- **Response Interceptor**: Handles errors globally and manages authentication state

## Customization

### Changing Base URL
Update the `baseURL` in `axiosConfig.js` or set `VITE_API_BASE_URL` in your `.env` file.

### Adding New Endpoints
1. Add endpoint to `apiEndpoints.js`:
   ```javascript
   NEW_FEATURE: {
     GET_ALL: '/new-feature',
     GET_BY_ID: (id) => `/new-feature/${id}`,
   }
   ```

2. Create service file in `services/`:
   ```javascript
   import apiClient from '../config/axiosConfig';
   import API_ENDPOINTS from '../config/apiEndpoints';
   import { handleApiError } from '../utils/errorHandler';

   export const newFeatureService = {
     getAll: async () => {
       try {
         const response = await apiClient.get(API_ENDPOINTS.NEW_FEATURE.GET_ALL);
         return response.data;
       } catch (error) {
         throw handleApiError(error);
       }
     },
   };
   ```

3. Export from `index.js`:
   ```javascript
   export { default as newFeatureService } from './services/newFeatureService';
   ```

