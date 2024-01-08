import axios from "axios";
import authAPI from "./authentication/authenticationAPIService";
const baseURL = `${process.env.NEXT_PUBLIC_API_END_POINT}`;

const authAxiosInstance = axios.create({
  baseURL,
  withCredentials: false,
  headers: {
    "Content-Type": `application/json;charset=UTF-8`,
    Accept: "application/json",
    Authorization:
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null,
  },
});

const unAuthAxiosInstance = axios.create({
  baseURL,
});

authAxiosInstance.interceptors.request.use((config: any) => {
  if (config.headers) {
    console.log("!!!");
    if (typeof window !== "undefined") {
      config.headers.Authorization = window.localStorage.getItem("accessToken");
    }
    return config;
  }
});

authAxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    console.log("error", error);
    if (error.response.status === 418) {
      console.log("here");
      const data = await authAPI.refreshAuth();

      originalRequest.config.headers.Authorization = data.accessToken;
      originalRequest._retry = true;
      return unAuthAxiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export { authAxiosInstance, unAuthAxiosInstance };
