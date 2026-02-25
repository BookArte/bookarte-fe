import { apiClient } from "./client";

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
};

export const deleteRecommendationBook = async (id) => {
    const res = await apiClient.delete(`/recommendation/${id}`);
    return res.data;
};

export const updateRecommendation = async (recommendationId, data) => {
    const res = await apiClient.patch(`/recommendation/${recommendationId}`, data);
    return res.data;
};

export const getRecommedBookDetail = async (recommendationId) => {
    const res = await apiClient.get(`/recommendation/${recommendationId}`)
    return res.data;
}

export const isRecommend = async (bookId) => {
    const res = await apiClient.get(`/recommendation/is-recommend?bookId=${bookId}`);
    return res.data;
}

export const getActiveRecommendationList = async () => {
    const res = await apiClient.get('/recommendation/admin/active-list');
    return res.data;
}

export const getExpiredRecommendationHistory = async (page) => {
    const res = await apiClient.get(`/recommendation/admin/history?page=${page}`);
    return res.data;
}