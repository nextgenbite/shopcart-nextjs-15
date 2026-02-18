import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL+'/api' || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
   withCredentials: true,
});

// Request interceptor to attach the token
api.interceptors.request.use((config) => {
  try {
    if (typeof window !== 'undefined') {
      const token = useAuthStore.getState().token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch (e) {
    // If anything goes wrong accessing the store on server, skip attaching token
  }
  return config;
});

// Response interceptor to handle 401 (unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        try {
          useAuthStore.getState().logout();
        } catch (e) {
          // ignore logout errors
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;