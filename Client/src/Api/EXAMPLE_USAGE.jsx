/**
 * Example usage of the centralized API
 * This file demonstrates how to use the API services in React components
 */

import { useState } from 'react';
import { authService, productService, cartService } from './index';

// Example: Login Component
export const LoginExample = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await authService.login({ email, password });
      console.log('Login successful:', response);
      // Redirect or update state
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {error && <div className="error">{error}</div>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

// Example: Product List Component
export const ProductListExample = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await productService.getAllProducts({ page: 1, limit: 10 });
      setProducts(data.products || data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchProducts} disabled={loading}>
        {loading ? 'Loading...' : 'Load Products'}
      </button>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

// Example: Add to Cart
export const AddToCartExample = ({ productId }) => {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      await cartService.addItem({ productId, quantity: 1 });
      alert('Item added to cart!');
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleAddToCart} disabled={loading}>
      {loading ? 'Adding...' : 'Add to Cart'}
    </button>
  );
};

