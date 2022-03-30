import axios from "axios";

const BASE_URL = "https://api.github.com";

const axiosInstance = axios.create({
    baseURL: BASE_URL
});

axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    const newConfig = {
        ...config,
        headers: {
            Authorization: `token ${token}`
        }
    };
    return newConfig;
});

export default axiosInstance;
