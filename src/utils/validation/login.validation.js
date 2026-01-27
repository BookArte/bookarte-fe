import { trim } from './trim';

export function validateLoginForm({ memberUserId, memberPassword }) {
    const userId = trim(memberUserId);
    const password = trim(memberPassword);

    if (!userId) return '아이디를 입력해주세요.';
    if (!password) return '비밀번호를 입력해주세요.';

    return null;
}