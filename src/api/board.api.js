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

export const updateBoard = async (type, boardId, data) => {
    const res = await fileApiClient.patch(`/board/${type}/${boardId}`, data);
    return res.data;
}

export const getBoardDetail = async (type, boardId) => {
    const res = await apiClient.get(`/board/${type}/view/${boardId}`);
    return res.data;
}

export const getMyBoardList = async (type, params) => {
    const res = await apiClient.get(`/board/${type}/my_list`, { params: params });
    return res.data;
}

export const getMyBoardDetail = async (type, boardId) => {
    const res = await apiClient.get(`/board/${type}/my_view/${boardId}`);
    return res.data;
}