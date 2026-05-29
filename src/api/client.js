import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const baseConfig = {
    baseURL: import.meta.env.VITE_API_BASE_URL,
}

const addAuthInterceptor = (instance) => {
    instance.interceptors.request.use((config) => {
        const token = useAuthStore.getState().accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
};

export const apiClient = axios.create({
    ...baseConfig,
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fileApiClient = axios.create({
    ...baseConfig,
    timeout: 20000,
    withCredentials: true,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

addAuthInterceptor(apiClient);
addAuthInterceptor(fileApiClient);