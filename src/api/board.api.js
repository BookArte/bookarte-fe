import { apiClient, fileApiClient } from "./client";

export const getBoardList = async (type, params) => {
    const res = await apiClient.get(`/board/${type}/list`, { params: params });
    return res.data;
};

export const deleteBoards = async (type, ids) => {
    const res = await apiClient.delete(`/board/${type}/dels`, { data: { ids } });
    return res.data;
}