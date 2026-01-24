export const TEL_REGEX = /^010-\d{4}-\d{4}$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,16}$/;
export const USERID_REGEX = /^[a-zA-Z][a-zA-Z0-9._]{5,15}$/;


export const BOOK_ISBN_REGEX = /^(97(8|9))?\d{9}(\d|X)$/;
export const BOOK_THUMBNAIL_URL_REGEX = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;