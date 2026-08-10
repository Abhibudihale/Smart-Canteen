// src/api/payment.js

import axios from 'axios';
import AuthService from './auth';

const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${API_BASE_URL}payments/`;

class PaymentService {

  async processPayment(paymentRequest) {
    const response = await axios.post(
      API_URL + 'process',
      paymentRequest,
      {
        headers: AuthService.getAuthHeader(),
      }
    );

    return response;
  }

  async getMyPayments() {
    const response = await axios.get(
      API_URL + 'my',
      {
        headers: AuthService.getAuthHeader(),
      }
    );

    return response;
  }

  async getMyPaymentById(paymentId) {
    const response = await axios.get(
      API_URL + 'my/' + paymentId,
      {
        headers: AuthService.getAuthHeader(),
      }
    );

    return response;
  }

  async getAllPayments() {
    const response = await axios.get(
      API_URL + 'all',
      {
        headers: AuthService.getAuthHeader(),
      }
    );

    return response;
  }

  async updatePaymentStatus(paymentId, newStatus) {
    const response = await axios.put(
      API_URL + paymentId + '/status',
      {},
      {
        params: {
          newStatus: newStatus,
        },
        headers: AuthService.getAuthHeader(),
      }
    );

    return response;
  }
}

export default new PaymentService();