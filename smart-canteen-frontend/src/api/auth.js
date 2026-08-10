// src/api/auth.js

import axios from 'axios';

// Base API URL comes from environment
const API_BASE_URL = import.meta.env.VITE_API_URL;

const API_URL = `${API_BASE_URL}auth/`;
const FOOD_API_URL = `${API_BASE_URL}food/`;

class AuthService {

  /**
   * Handles user login.
   */
  async login(username, password) {
    const response = await axios.post(API_URL + 'login', {
      username,
      password,
    });

    // If login is successful and token is received,
    // store it in local storage
    if (response.data.token) {
      const userData = { ...response.data };

      // Ensure role has ROLE_ prefix
      if (
        userData.role &&
        !userData.role.startsWith('ROLE_')
      ) {
        userData.role = `ROLE_${userData.role.toUpperCase()}`;
      }

      localStorage.setItem(
        'user',
        JSON.stringify(userData)
      );

      console.log(
        'AuthService: Data stored in localStorage:',
        userData
      );
    } else {
      console.log(
        'AuthService: Login response did not contain a token:',
        response.data
      );
    }

    console.log(
      'AuthService: Returning response.data:',
      response.data
    );

    return response.data;
  }

  /**
   * Handles user logout.
   */
  logout() {
    localStorage.removeItem('user');
  }

  /**
   * Handles user registration.
   */
  register(username, email, password, role) {
    return axios.post(API_URL + 'register', {
      username,
      email,
      password,
      role,
    });
  }

  /**
   * Retrieves current user from local storage.
   */
  getCurrentUser() {
    const user = localStorage.getItem('user');

    return user ? JSON.parse(user) : null;
  }

  /**
   * Gets authorization header.
   */
  getAuthHeader() {
    const user = this.getCurrentUser();

    if (user && user.token) {
      return {
        Authorization: 'Bearer ' + user.token,
      };
    }

    return {};
  }

  /**
   * Fetches available food items.
   */
  getAvailableFoodItems() {
    return axios.get(
      FOOD_API_URL + 'available',
      {
        headers: this.getAuthHeader(),
      }
    );
  }
}

export default new AuthService();