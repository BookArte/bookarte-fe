import { USERID_REGEX, PASSWORD_REGEX, TEL_REGEX, EMAIL_REGEX } from '@/constants/regex';
import { trim } from './trim';

export function validateJoinForm({ memberUserId, memberPassword, memberTel, memberEmail, memberName, isIdChecked, isPasswordMatch }) {
    const userId = trim(memberUserId);
    const password = trim(memberPassword);
    const name = trim(memberName);
    const tel = trim(memberTel);
    const email = trim(memberEmail);

    if (!userId) return '아이디를 입력해주세요.';
    if (!USERID_REGEX.test(userId)) return '아이디는 영문자로 시작하는 6~16자여야 합니다.';
    if (!isIdChecked) return '아이디 중복확인을 해주세요.';

    if (!password) return '비밀번호를 입력해주세요.';
    if (!PASSWORD_REGEX.test(password)) return '비밀번호는 영문자와 숫자를 포함한 8~16자여야 합니다.';
    if (!isPasswordMatch) return '비밀번호 확인이 일치하지 않습니다.';

    if (!name) return '이름을 입력해주세요.';
    if (!TEL_REGEX.test(tel)) return '전화번호 형식이 올바르지 않습니다.';
    if (!EMAIL_REGEX.test(email)) return '이메일 형식이 올바르지 않습니다.';

    return null;
}

export const validateIdCheck = (memberUserId) => {
    const userId = trim(memberUserId);
    if (!userId) return "아이디를 입력해주세요.";
    if (!USERID_REGEX.test(userId)) return "아이디는 영문자로 시작하는 6~16자여야 합니다.";
    return null;
};