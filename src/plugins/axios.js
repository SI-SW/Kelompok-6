import axios from "axios";
import { getCookies, delCookies } from "./cookies";

//endpoint
const hostname = import.meta.env.VITE_BASE_API_URL;

// instance creation
const baseApi = axios.create({
  baseURL: hostname,
});

// Restful API
axios.defaults.headers["content-type"] = "Application/json";

// Request Config
baseApi.interceptors.request.use(
  (config) => {
    const token = getCookies("CERT");
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    else {
      delCookies("CERT");
      delete config.headers["Authorization"];
    }

    return config;
  },
  (error) => {
    throw error;
  }
);

// Response config
baseApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    switch (error.response.status) {
      case 401:
        delCookies("CERT");
        break;
      default:
        break;
    }
    throw error?.response?.error ?? error?.response?.message ?? error;
  }
);

export { baseApi };
