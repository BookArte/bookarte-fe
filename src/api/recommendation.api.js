import { apiClient, fileApiClient } from "./client";

export const setRecommendationBook = async (data) => {
    const res = await apiClient.post('/recommendation/set', data);
    return res.data;
};

export const recommendationBookList = async (data) => {
    const res = await apiClient.get('/recommendation/pick-10/list', data);
    return res.data;
};


export const reorderRecommendation = async (data) => {
    const res = await apiClient.patch('/recommendation/reorder', data);
    return res.data;
}