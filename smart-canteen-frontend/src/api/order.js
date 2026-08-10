// src/api/order.js

import axios from 'axios';
import AuthService from './auth';

const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${API_BASE_URL}orders/`;

class OrderService {

  async placeOrder(orderItems, addNotificationCallback) {
    const response = await axios.post(
      API_URL + 'place',
      { items: orderItems },
      {
        headers: AuthService.getAuthHeader(),
      }
    );

    if (response.data && addNotificationCallback) {
      const orderId = response.data.id;
      const status = response.data.status.replace(/_/g, ' ');

      addNotificationCallback(
        `Your order (ID: ${orderId}) has been placed and is ${status}.`
      );
    }

    return response;
  }

  async getMyOrders() {
    return axios.get(
      API_URL + 'my',
      {
        headers: AuthService.getAuthHeader(),
      }
    );
  }

  async getMyOrderById(orderId) {
    return axios.get(
      API_URL + 'my/' + orderId,
      {
        headers: AuthService.getAuthHeader(),
      }
    );
  }

  async cancelMyOrder(orderId, addNotificationCallback) {
    const response = await axios.put(
      API_URL + 'my/cancel/' + orderId,
      {},
      {
        headers: AuthService.getAuthHeader(),
      }
    );

    if (addNotificationCallback) {
      addNotificationCallback(
        `Order (ID: ${orderId}) has been cancelled.`
      );
    }

    return response;
  }

  async getAllOrders() {
    return axios.get(
      API_URL + 'all',
      {
        headers: AuthService.getAuthHeader(),
      }
    );
  }

  async getOrderById(orderId) {
    return axios.get(
      API_URL + 'details/' + orderId,
      {
        headers: AuthService.getAuthHeader(),
      }
    );
  }

  async updateOrderStatus(
    orderId,
    newStatus,
    addNotificationCallback
  ) {
    const response = await axios.put(
      API_URL + orderId + '/status',
      {},
      {
        params: {
          newStatus: newStatus,
        },
        headers: AuthService.getAuthHeader(),
      }
    );

    if (response.data && addNotificationCallback) {
      addNotificationCallback(
        `Order (ID: ${orderId}) status updated to ${response.data.status.replace(/_/g, ' ')}.`
      );
    }

    return response;
  }

  async cancelOrderByManager(
    orderId,
    addNotificationCallback
  ) {
    const response = await axios.put(
      API_URL + 'cancel/' + orderId,
      {},
      {
        headers: AuthService.getAuthHeader(),
      }
    );

    if (addNotificationCallback) {
      addNotificationCallback(
        `Order (ID: ${orderId}) has been cancelled by manager.`
      );
    }

    return response;
  }
}

export default new OrderService();