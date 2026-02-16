import { apiClient } from "./client";

export const getPenaltyList = async (memberUserId) => {
    const res = await apiClient.get(`/penalty/admin/list?memberUserId=${memberUserId}`);
    return res.data;
}