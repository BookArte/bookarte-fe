import { BOOK_ISBN_REGEX, BOOK_THUMBNAIL_URL_REGEX } from '@/constants/regex';

export function validateBookForm(formData) {
    const errors = {};

    const get = (key) => formData.get(key);

    // 1. 제목 검증
    const title = get('bookTitle');
    if (!title) {
        errors.bookTitle = '도서 제목은 필수 입력 항목입니다.';
    } else if (title.length > 200) {
        errors.bookTitle = '도서 제목은 200자 이내로 작성해주세요.';
    }

    // 2. 저자 검증
    if (!get('bookAuthor')) errors.bookAuthor = '도서 저자는 필수 입력 항목입니다.';

    // 3. 출판사 검증
    if (!get('publisherName')) errors.publisherName = '출판사는 필수 입력 항목입니다.';

    // 4. 출판일 검증
    const pubDateStr = get('publicationDate');
    if (!pubDateStr) {
        errors.publicationDate = '출판일은 필수 입력 항목입니다.';
    } else {
        const pubDate = new Date(pubDateStr);
        const today = new Date();
        if (pubDate > today) {
            errors.publicationDate = '출판일은 미래 날짜일 수 없습니다.';
        }
    }

    // 5. ISBN 검증
    const isbn = get('bookIsbn');
    if (!isbn) {
        errors.bookIsbn = 'ISBN은 필수 입력 항목입니다.';
    } else if (!BOOK_ISBN_REGEX.test(isbn)) {
        errors.bookIsbn = '유효한 ISBN 형식이 아닙니다.';
    }

    // 6. 카테고리 검증
    if (!get('bookCategory')) errors.bookCategory = '도서 카테고리는 필수 입력 항목입니다.';

    // 7. 썸네일 검증 (URL 또는 파일 파일 중 하나라도 있으면 통과)
    const thumbnailFile = get('bookThumbnailFile'); // MultipartFile
    const thumbnailUrl = get('bookThumbnail');     // URL string

    // 파일도 없고, URL도 없는 경우
    const hasFile = thumbnailFile instanceof File && thumbnailFile.size > 0;
    const hasUrl = typeof thumbnailUrl === 'string' && thumbnailUrl.trim() !== '';

    if (!hasFile && !hasUrl) {
        errors.bookThumbnail = '도서 썸네일(이미지 파일 또는 URL)은 필수 입력 항목입니다.';
    }
    // 파일은 없는데 URL만 있는 경우, URL 형식 검증 수행
    else if (!hasFile && hasUrl && !BOOK_THUMBNAIL_URL_REGEX.test(thumbnailUrl)) {
        if (!thumbnailUrl.startsWith('blob:')) {
            errors.bookThumbnail = '유효한 썸네일 URL 형식이 아닙니다.';
        }
    }

    // 8. 책소개 검증
    const contents = get('bookContents');
    if (!contents) {
        errors.bookContents = '책소개는 필수 입력 항목입니다.';
    } else if (contents.length > 1000) {
        errors.bookContents = '책소개는 1000자 이내로 작성해주세요.';
    }

    return errors;
}