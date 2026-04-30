import { apiClient, fileApiClient } from "./client";

/* 관리자 요청 api */
/* DB 내 도서 등록 api */
export const registerBookByAdmin = async (formData) => {
    const res = await fileApiClient.post('/book/register', formData);
    return res.data;
}

/*도서 정보 수정 api*/
export const updateBookByBookId = async (bookId, data) => {
    const res = await apiClient.patch(`/book/${bookId}`, data);
    return res.data;
}

/* 도서 삭제 */
export const deleteBooks = async (data) => {
    const res = await apiClient.delete('/book', { data });
    return res.data;
}

/* 공통 요청 */
/*도서 상세 정보 조회 api*/
export const getBookDetailByBookId = async (bookId) => {
    const res = await apiClient.get(`/book/view/${bookId}`);
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

/* 도서 중복 체크 api */
export const checkBookDuplicate = async (isbn) => {
    const res = await apiClient.get(`/book/is-duplicate-isbn?isbn=${isbn}`);
    return res.data;
};

/* 연관 도서 목록 조회 */
export const getRelatedBookList = async (bookId) => {
    const res = await apiClient.get(`/book/${bookId}/related`);
    return res.data;
}

/* 최근 등록 도서 등록일 조회 */
export const getLatestBookRegistrationDate = async () => {
    const res = await apiClient.get('/book/latest-registration-date');
    return res.data;
}

/* 알라딘 api 베스트셀러 도서 목록 조회 */
export const getBestSellerBookList = async () => {
    const res = await apiClient.get('/book/bestseller');
    return res.data;
}