import { apiClient, fileApiClient } from "./client";

export const joinMember = async (data) => {
    const res = await apiClient.post('/member', data);
    return res.data;
};