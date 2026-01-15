import { apiClient, fileApiClient } from "./client";

export const getBookList = async (data) => {
    const res = await apiClient.get('/book/list', data);
    return res.data;
};