import { apiClient, fileApiClient } from "./client";



/* 관리자 요청 api */
/* DB 내 도서 등록 api */
export const registerBookByAdmin = async (data) => {
    const res = await apiClient.post('/book/register', data);
    return res.data;
}

/*도서 상세 정보 조회 api*/
export const getBookDetail = async (bookId) => {
    const res = await apiClient.get(`/book/view/${bookId}`);
    return res.data;
}

/*도서 정보 수정 api*/
export const updateBookByAdmin = async (bookId, data) => {
    const res = await apiClient.patch(`/book/${bookId}`, data);
    return res.data;
}


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
};