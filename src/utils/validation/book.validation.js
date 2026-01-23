import { BOOK_ISBN_REGEX, BOOK_THUMBNAIL_URL_REGEX } from '@/constants/regex';

export function validateBookForm(values) {
    const errors = {};

    // 제목 검증
    if (!values.bookTitle) {
        errors.bookTitle = '도서 제목은 필수 입력 항목입니다.';
    } else if (values.bookTitle.length > 200) {
        errors.bookTitle = '도서 제목은 200자 이내로 작성해주세요.';
    }

    // 저자 검증
    if (!values.bookAuthor) errors.bookAuthor = '도서 저자는 필수 입력 항목입니다.';

    // 출판사 검증
    if (!values.publisherName) errors.publisherName = '출판사는 필수 입력 항목입니다.';

    // 출판일 검증
    if (!values.publicationDate) errors.publicationDate = '출판일은 필수 입력 항목입니다.';

    // ISBN 검증
    if (!values.bookIsbn) {
        errors.bookIsbn = 'ISBN은 필수 입력 항목입니다.';
    } else if (!BOOK_ISBN_REGEX.test(values.bookIsbn)) {
        errors.bookIsbn = '유효한 ISBN 형식이 아닙니다.';
    }

    // 카테고리 검증
    if (!values.bookCategory) errors.bookCategory = '도서 카테고리는 필수 입력 항목입니다.';

    // 썸네일 검증
    if (!values.bookThumbnail) {
        errors.bookThumbnail = '도서 썸네일은 필수 입력 항목입니다.';
    } else if (!BOOK_THUMBNAIL_URL_REGEX.test(values.bookThumbnail)) {
        errors.bookThumbnail = '유효한 썸네일 URL 형식이 아닙니다.';
    }

    // 책소개 검증
    if (!values.bookContents) {
        errors.bookContents = '책소개는 필수 입력 항목입니다.';
    } else if (values.bookContents.length > 1000) {
        errors.bookContents = '책소개는 1000자 이내로 작성해주세요.';
    }

    return errors;
}