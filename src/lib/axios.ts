import config from "@/config";
import axios, { type AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Skip adding token for auth endpoints
    const authEndpoints = ['/auth/login', '/user/register', '/otp/send', '/otp/verify'];
    const isAuthEndpoint = authEndpoints.some(endpoint => config.url?.includes(endpoint));
    
    if (!isAuthEndpoint) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.set('Authorization', token);
      }
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

let isRefreshing = false;

let pendingQueue: {
  resolve: (value: unknown) => void;
  reject: (value: unknown) => void;
}[] = [];

const processQueue = (error: unknown) => {
  pendingQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(null);
    }
  });

  pendingQueue = [];
};

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // console.log("Request failed", error.response.data.message);

    const originalRequest = error.config as AxiosRequestConfig & {
      _retry: boolean;
    };

    if (
      error.response.status === 500 &&
      error.response.data.message === "jwt expired" &&
      !originalRequest._retry
    ) {
      console.log("Your token is expired");

      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        })
          .then(() => axiosInstance(originalRequest))
          .catch((error) => Promise.reject(error));
      }

      isRefreshing = true;
      try {
        const res = await axiosInstance.post("/auth/refresh-token");
        console.log("New Token arrived", res);
        const newAccessToken = res.data?.data?.accessToken || res.data?.accessToken;

        if (newAccessToken) {
          localStorage.setItem("accessToken", newAccessToken);
        }
        processQueue(null);

        return axiosInstance(originalRequest);
      } catch (error) {
        processQueue(error);
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    //* For Everything
    return Promise.reject(error);
  }
);
