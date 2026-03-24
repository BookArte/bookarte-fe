import { apiClient, fileApiClient } from "./client";

export const getBoardList = async (type, params) => {
    const res = await apiClient.get(`/board/${type}/list`, { params: params });
    return res.data;
};

export const deleteBoards = async (type, ids) => {
    const res = await apiClient.delete(`/board/${type}`, { data: { boardIds: ids } });
    return res.data;
}

export const createBoard = async (type, data) => {
    const res = await fileApiClient.post(`/board/${type}`, data);
    return res.data;
}