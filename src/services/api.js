import axios from 'axios';

// Base URL for DummyJSON API
const BASE_URL = 'https://dummyjson.com';

// Create axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  config => {
    // You can add token to headers here if needed
    // const token = store.getState().auth.token;
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Server responded with error
      console.error('API Error:', error.response.data);
      return Promise.reject(
        error.response.data.message || 'Something went wrong',
      );
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.request);
      return Promise.reject('Network error. Please check your connection.');
    } else {
      // Other errors
      console.error('Error:', error.message);
      return Promise.reject(error.message);
    }
  },
);

// Auth API endpoints
export const authAPI = {
  // Login user
  login: async credentials => {
    const response = await apiClient.post('/auth/login', {
      username: credentials.username,
      password: credentials.password,
    });
    return {
      user: {
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        gender: response.data.gender,
        image: response.data.image,
      },
      token: response.data.token,
    };
  },

  // Get current user (using token)
  getCurrentUser: async token => {
    const response = await apiClient.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};

// Products API endpoints
export const productsAPI = {
  // Get all products with pagination
  getProducts: async (limit = 20, skip = 0) => {
    const response = await apiClient.get(
      `/products?limit=${limit}&skip=${skip}`,
    );
    return response.data;
  },

  // Get single product by ID
  getProductById: async id => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  // Search products
  searchProducts: async query => {
    const response = await apiClient.get(`/products/search?q=${query}`);
    return response.data;
  },

  // Get product categories
  getCategories: async () => {
    const response = await apiClient.get('/products/categories');
    return response.data;
  },

  // Get products by category
  getProductsByCategory: async category => {
    const response = await apiClient.get(`/products/category/${category}`);
    return response.data;
  },
};

// Users API endpoints
export const usersAPI = {
  // Get all users
  getUsers: async (limit = 20, skip = 0) => {
    const response = await apiClient.get(`/users?limit=${limit}&skip=${skip}`);
    return response.data;
  },

  // Get single user by ID
  getUserById: async id => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },
};

export default apiClient;
