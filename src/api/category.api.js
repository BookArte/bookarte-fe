import { apiClient } from "./client";

export const getCategoryList = async () => {
    const res = await apiClient.get('/category/list');
    return res.data;
}