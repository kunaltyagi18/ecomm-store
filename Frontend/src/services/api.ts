import axios from 'axios';

// ============================================
// 🔌 BACKEND CONNECTION
// ============================================
// Node.js/Express backend running on port 5000
// Make sure to run: npm run dev (from backend folder)
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Toggle this to use mock data instead of real API calls
// Set to false to use the Node.js/Express backend
export const USE_MOCK_DATA = false;

// ============================================
// ADAPTER FUNCTIONS - Transform backend responses to frontend format
// ============================================

/**
 * Transform backend Product response to frontend Product type
 * Backend: { id, name, description, price, stock, category, image }
 * Frontend: { _id, title, description, price, stock, category, image }
 */
export const transformBackendProduct = (backendProduct: any) => ({
  _id: backendProduct.id,
  title: backendProduct.name,
  description: backendProduct.description,
  price: backendProduct.price,
  stock: backendProduct.stock,
  category: backendProduct.category,
  image: backendProduct.image,
  rating: 4.5, // Mock rating since backend doesn't provide it
  numReviews: 100, // Mock number of reviews
  isFeatured: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

/**
 * Transform frontend OrderItem to backend Order request format
 */
export const transformOrderToBackend = (userId: string, items: any[]) => ({
  userId,
  products: items.map(item => ({
    productId: item.product?._id || item.productId,
    quantity: item.quantity,
  })),
});

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
