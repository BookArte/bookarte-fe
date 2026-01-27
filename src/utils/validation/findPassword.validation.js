import { EMAIL_REGEX } from '@/constants/regex';
import { trim } from './trim';

export function validateFindPasswordForm({ memberUserId, memberName, memberEmail }) {
    const userId = trim(memberUserId);
    const name = trim(memberName);
    const email = trim(memberEmail);

    if (!userId) return '아이디를 입력해주세요.';

    if (!name) return '이름을 입력해주세요.';

    if (!email || email.endsWith('@')) return '이메일을 입력해주세요.';
    if (!EMAIL_REGEX.test(email)) return '이메일 형식이 올바르지 않습니다.';

    return null;
}