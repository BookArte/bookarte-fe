import { apiClient, fileApiClient } from "./client";

export const joinMember = async (data) => {
    const res = await apiClient.post('/member', data);
    return res.data;
};

export const checkMemberId = async (memberUserId) => {
    const res = await apiClient.get(`/member/id_check?userId=${memberUserId}`);
    return res.data;
}