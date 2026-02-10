import { apiClient } from "./client";

export const borrowBook = async (bookId) => {
    const res = await apiClient.post(`borrow/${bookId}`)
    return res.data
}

export const getMyBorrowList = async () => {
    const res = await apiClient.get('borrow');
    return res.data
}

export const sendReturnRequest = async (borrowId) => {
    const res = await apiClient.patch(`borrow/request-return/${borrowId}`)
    return res.data
}

export const extendBorrow = async (borrowId) => {
    const res = await apiClient.patch(`borrow/extend/${borrowId}`)
    return res.data
}

//admin
export const getAllBorrowList = async (data) => {
    const res = await apiClient.get('borrow/admin', data);
    return res.data
}

export const approveReturn = async (borrowId) => {
    const res = await apiClient.patch(`borrow/admin/${borrowId}`)
    return res.data
} 