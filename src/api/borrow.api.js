import { apiClient } from "./client";

export const getAllBorrowList = async () => {
    const res = await apiClient.get('borrow/admin');
    return res.data
}