import axios from "axios";
const baseURL = `${process.env.NEXT_PUBLIC_API_END_POINT}`;

const authAxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
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
    // if (
    //     error.response.code === 401 &&
    //     error.response.failure === "EXPIRED_ACCESS_TOKEN"
    // ) {
    //     originalRequest._retry = true;

    //     return authAxiosInstance(originalRequest);
    // }
    return Promise.reject(error);
  }
);

export { authAxiosInstance, unAuthAxiosInstance };
