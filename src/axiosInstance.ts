
import axios, { AxiosInstance } from 'axios';
import { redirect } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      redirect('/login');
      console.error('Unauthorized, please login');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
