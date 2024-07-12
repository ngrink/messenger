import axios from "axios";
import { store } from "./mobx";

export const $axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000,
  withCredentials: true,
});

$axios.interceptors.request.use((config) => {
  let token = store.authStore.accessToken;
  if (token) {
    config.headers.setAuthorization(`Bearer ${token}`);
  }

  return config;
})