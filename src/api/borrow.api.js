import { apiClient } from "./client";

export const getAllBorrowList = async () => {
    const res = await apiClient.get('borrow/admin');
    return res.data
}

export const borrowBook = async (bookId) => {
    const res = await apiClient.post(`borrow/${bookId}`)
    return res.data
}