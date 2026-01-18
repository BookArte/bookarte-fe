import { apiClient, fileApiClient } from "./client";

/* DB 내도서 리스트 조회 api */
export const getAllBookList = async (data) => {
    const res = await apiClient.get('/book/list', data);
    return res.data;
};

/* 카카오 + 국립 중앙 도서관 api를 활용한 도서 상세 정보 검색 api */
export const searchBooksWithAPi = async (query) => {
    const res = await apiClient.get('/book/library/search', {
        params: { query }
    });
    return res.data;
}

/* DB 내 도서 등록 api */
export const registerBookByAdmin = async (data) => {
    const res = await apiClient.post('/book/register', data);
    return res.data;
}