import axios from "axios";
import { ACCESS_TOKEN } from "../utils/constants";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // baseURL: "http://127.0.0.1:8000/",
});

api.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("access");
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// const api = axios.create({
//   baseURL: "http://127.0.0.1:8000/api", // Replace with your backend API URL
// });

// // Add a request interceptor
// api.interceptors.request.use(
//   (config) => {
//     // Get tokens from local storage
//     const accessToken = localStorage.getItem(ACCESS_TOKEN);
//     // const refreshToken = localStorage.getItem('refresh');

//     // Add headers to the request
//     if (accessToken) {
//       config.headers["Authorization"] = `Bearer ${accessToken}`;
//     }

//     config.headers["Content-Type"] = "application/json";

//     return config;
//   },
//   (error) => {
//     // Handle the error
//     return Promise.reject(error);
//   }
// );

export default api;
