import { apiClient, fileApiClient } from "./client";

export const setRecommendationBook = async (data) => {
    const res = await apiClient.post('/recommendation/set', data);
    return res.data;
};