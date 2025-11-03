import axios from 'axios';

const api = axios.create({
  baseURL: 'https://evato-e-commerce.onrender.com/api/v2/',
  withCredentials: true,
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
