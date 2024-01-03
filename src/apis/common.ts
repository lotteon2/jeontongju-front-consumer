import axios from "axios";
const baseURL = `${process.env.NEXT_PUBLIC_API_END_POINT}`;

const authAxiosInstance = axios.create({
  baseURL,
  withCredentials: false,
  headers: {
    "Content-Type": `application/json;charset=UTF-8`,
    Accept: "application/json",
    "Access-Control-Allow-Headers": "Accept",
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
    if (error.response.code === 401) {
      console.log("here");
      originalRequest.config.headers.Authorization =
        window.localStorage.getItem("accessToken");
      originalRequest._retry = true;
      return authAxiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export { authAxiosInstance, unAuthAxiosInstance };
