import axios from "axios";

const baseConfig = {
    baseURL: import.meta.env.VITE_API_BASE_URL,
}

export const apiClient = axios.create({
    ...baseConfig,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fileApiClient = axios.create({
    ...baseConfig,
    timeout: 20000,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});