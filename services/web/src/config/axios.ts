import axios from "axios";

export const $axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000,
  withCredentials: true,
});

$axios.interceptors.request.use((config) => {
  config.headers.setAuthorization(localStorage.getItem('access_token'));

  return config;
})