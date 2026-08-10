// src/api/api.js

import axios from 'axios';
import AuthService from './auth';

// Base URL comes from .env.development or .env.production
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Add JWT token to headers before each request
api.interceptors.request.use(
  (config) => {
    const user = AuthService.getCurrentUser();

    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle token expiration or invalid tokens
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 Unauthorized
    // and it's not the login request itself
    if (
      error.response &&
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest.url.includes('/auth/login')
    ) {
      console.warn('Unauthorized request. Logging out user.');

      AuthService.logout();

      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;