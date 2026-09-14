import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add token to requests
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth endpoints
export const authAPI = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
};

// Supporters endpoints
export const supportersAPI = {
  getAll: () => apiClient.get('/supporters'),
  getById: (id) => apiClient.get(`/supporters/${id}`),
  create: (data) => apiClient.post('/supporters', data),
  update: (id, data) => apiClient.put(`/supporters/${id}`, data),
  delete: (id) => apiClient.delete(`/supporters/${id}`),
};

// Volunteers endpoints
export const volunteersAPI = {
  getAll: () => apiClient.get('/volunteers'),
  getById: (id) => apiClient.get(`/volunteers/${id}`),
  create: (data) => apiClient.post('/volunteers', data),
  update: (id, data) => apiClient.put(`/volunteers/${id}`, data),
  delete: (id) => apiClient.delete(`/volunteers/${id}`),
};

// Targets endpoints
export const targetsAPI = {
  getAll: () => apiClient.get('/targets'),
  getById: (id) => apiClient.get(`/targets/${id}`),
  create: (data) => apiClient.post('/targets', data),
  update: (id, data) => apiClient.put(`/targets/${id}`, data),
  delete: (id) => apiClient.delete(`/targets/${id}`),
};

// Budget endpoints
export const budgetAPI = {
  getExpenses: () => apiClient.get('/expenses'),
  addExpense: (data) => apiClient.post('/expenses', data),
  getIncome: () => apiClient.get('/income'),
  addIncome: (data) => apiClient.post('/income', data),
};

export default apiClient;
