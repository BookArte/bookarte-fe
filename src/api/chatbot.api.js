import { apiClient, fileApiClient } from "./client";

export const sendChat = async (inputMessage) => {
    const res = await apiClient.post(`/ai/chat`, { inputMessage });
    return res.data;
}

export const getHistory = async () => {
    const res = await apiClient.get(`/ai/history`);
    return res.data;
};