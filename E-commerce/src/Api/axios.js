import axios from 'axios';

const api = axios.create({
  baseURL: 'https://evato-e-commerce.onrender.com/api/v2/',
  withCredentials: true,
});

api.interceptors.request.use(config => {
  const authInfo = localStorage.getItem('auth-Info');
  if (authInfo) {
    const { token } = JSON.parse(authInfo);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
