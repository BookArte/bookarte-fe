import { apiClient } from "./client";

export const getPenaltyList = async (memberUserId) => {
    const res = await apiClient.get(`/penalty/admin/list?memberUserId=${memberUserId}`);
    return res.data;
}

export const revokePenalty = async (penaltyId) => {
    const res = await apiClient.patch(`/penalty/admin/${penaltyId}/revoke`);
    return res.data;
}

export const releasePenalty = async (penaltyId, releaseReason) => {
    const res = await apiClient.patch(`/penalty/admin/${penaltyId}/release`, {
        data: { releaseReason }
    });
    return res.data;
}