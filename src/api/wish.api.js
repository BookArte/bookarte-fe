import { apiClient } from "./client";

/* 관심 도서 추가 api */
export const addWish = async (bookId) => {
    const res = await apiClient.post(`/wish/${bookId}`);
    return res.data;
}

/* 관심 도서 리스트 조회 api */
export const getWishList = async () => {
    const res = await apiClient.get('/wish');
    return res.data;
}

/* 관심 도서 삭제 api */
export const deleteWish = async (wishId) => {
    const res = await apiClient.delete(`/wish/${wishId}`);
    return res.data;
}