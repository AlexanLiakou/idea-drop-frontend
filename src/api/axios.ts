import axios from "axios";
import { getStoredAccessToken, setStoredAccessToken } from "#/helpers/authToken";
import { refreshAccessToken } from "./auth";

const isProduction = import.meta.env.PROD;
const baseURL = `${isProduction ? import.meta.env.VITE_PRODUCTION_API_URL : import.meta.env.VITE_API_URL}/api`;

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach token on request
api.interceptors.request.use((config) => {
  const token = getStoredAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Refresh token after expiry
api.interceptors.response.use((res) => res, async (error) => {
  const originalRequest = error.config;

  if (error?.response?.status === 401 &&
    !originalRequest._retry &&
    !originalRequest.url.includes('auth/refresh')
  ) {
    originalRequest._retry = true;

    try {
      const { accessToken: newToken } = await refreshAccessToken();
      setStoredAccessToken(newToken);
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return api(originalRequest);
    } catch (err: any) {
      console.log('Refresh token failed', err);
    }
  }
  return Promise.reject(error);
});

export default api;