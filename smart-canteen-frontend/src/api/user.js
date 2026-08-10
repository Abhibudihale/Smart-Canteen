// src/api/user.js

import axios from 'axios';
import AuthService from './auth';

const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${API_BASE_URL}users/`;

class UserService {

  async getAllUsers() {
    const response = await axios.get(
      API_URL + 'all',
      {
        headers: AuthService.getAuthHeader(),
      }
    );

    return response;
  }

  async getUserById(userId) {
    const response = await axios.get(
      API_URL + userId,
      {
        headers: AuthService.getAuthHeader(),
      }
    );

    return response;
  }

  async updateUserRole(userId, newRole) {
    const response = await axios.put(
      API_URL + userId + '/role',
      {},
      {
        params: {
          newRole: newRole,
        },
        headers: AuthService.getAuthHeader(),
      }
    );

    return response;
  }

  async deleteUser(userId) {
    const response = await axios.delete(
      API_URL + userId,
      {
        headers: AuthService.getAuthHeader(),
      }
    );

    return response;
  }
}

export default new UserService();