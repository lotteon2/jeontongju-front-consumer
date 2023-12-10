import axios from 'axios';
const baseURL = `${process.env.NEXT_PUBLIC_API_END_POINT}`;

const authAxiosInstance = axios.create({
    baseURL,
});

const unAuthAxiosInstance = axios.create({
    baseURL,
});

authAxiosInstance.interceptors.request.use((config: any) => {
    if (config.headers) {
        config.headers.accessToken = localStorage.getItem("accessToken");
        return config;
    }
});

authAxiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        if (
            error.response.code === 401 &&
            error.response.failure === "EXPIRED_ACCESS_TOKEN"
        ) {
            originalRequest._retry = true;

            return authAxiosInstance(originalRequest);
        }
        return Promise.reject(error);
    },
);




export { authAxiosInstance, unAuthAxiosInstance };