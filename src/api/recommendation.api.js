import { apiClient, fileApiClient } from "./client";

export const setRecommendationBook = async (data) => {
    const res = await apiClient.post('/recommendation/set', data);
    return res.data;
};

export const recommendationBookList = async (data) => {
    const res = await apiClient.get('/recommendation/pick-10/list', data);
    return res.data;
};


export const reorderRecommendationList = async (data) => {
    const res = await apiClient.patch('/recommendation/reorder', data);
    return res.data;
}

export const deleteRecommendationBook = async (id) => {
    const res = await apiClient.delete(`/recommendation/${id}`);
    return res.data;
}