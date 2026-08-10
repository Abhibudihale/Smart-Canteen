// src/api/food.js

import axios from 'axios';
import AuthService from './auth';

const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${API_BASE_URL}food/`;

class FoodService {

  getAllFoodItems() {
    console.log(
      'FoodService: Calling /api/food/all with headers:',
      AuthService.getAuthHeader()
    );

    return axios.get(
      API_URL + 'all',
      {
        headers: AuthService.getAuthHeader(),
      }
    );
  }

  getAvailableFoodItems() {
    console.log(
      'FoodService: Calling /api/food/available with headers:',
      AuthService.getAuthHeader()
    );

    return axios.get(
      API_URL + 'available',
      {
        headers: AuthService.getAuthHeader(),
      }
    );
  }

  addFoodItem(foodItemData) {
    return axios.post(
      API_URL + 'add',
      foodItemData,
      {
        headers: AuthService.getAuthHeader(),
      }
    );
  }

  updateFoodItem(id, foodItemData) {
    return axios.put(
      API_URL + id,
      foodItemData,
      {
        headers: AuthService.getAuthHeader(),
      }
    );
  }

  deleteFoodItem(id) {
    return axios.delete(
      API_URL + id,
      {
        headers: AuthService.getAuthHeader(),
      }
    );
  }

  toggleFoodAvailability(id, isAvailable) {
    return axios.put(
      API_URL + id + '/toggle-availability',
      isAvailable,
      {
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeader(),
        },
      }
    );
  }

  donateFoodItem(id) {
    console.log(
      `FoodService: Calling /api/food/${id}/donate`
    );

    return axios.put(
      API_URL + id + '/donate',
      {},
      {
        headers: AuthService.getAuthHeader(),
      }
    );
  }

  getDonatedFoodItems() {
    console.log(
      'FoodService: Calling /api/food/donated with headers:',
      AuthService.getAuthHeader()
    );

    return axios.get(
      API_URL + 'donated',
      {
        headers: AuthService.getAuthHeader(),
      }
    );
  }

  markDonatedItemAsReceived(id) {
    console.log(
      `FoodService: Calling /api/food/${id}/mark-received`
    );

    return axios.put(
      API_URL + id + '/mark-received',
      {},
      {
        headers: AuthService.getAuthHeader(),
      }
    );
  }
}

export default new FoodService();