import { USERID_REGEX, PASSWORD_REGEX, TEL_REGEX, EMAIL_REGEX } from '@/constants/regex';

export function validateJoinForm({ memberUserId, memberPassword, memberTel, memberEmail, isIdChecked, isPasswordMatch }) {

    if (!memberUserId) return '아이디를 입력해주세요.';
    if (!USERID_REGEX.test(memberUserId)) return '아이디는 영문자로 시작하는 6~16자여야 합니다.';
    if (!isIdChecked) return '아이디 중복확인을 해주세요.';

    if (!memberPassword) return '비밀번호를 입력해주세요.';
    if (!PASSWORD_REGEX.test(memberPassword)) return '비밀번호는 영문자와 숫자를 포함한 8~16자여야 합니다.';
    if (!isPasswordMatch) return '비밀번호 확인이 일치하지 않습니다.';

    if (!TEL_REGEX.test(memberTel)) return '전화번호 형식이 올바르지 않습니다.';
    if (!EMAIL_REGEX.test(memberEmail)) return '이메일 형식이 올바르지 않습니다.';

    return null;
}

export const validateIdCheck = (userId) => {
    if (!userId) return "아이디를 입력해주세요.";
    if (!USERID_REGEX.test(userId)) return "아이디는 영문자로 시작하는 6~16자여야 합니다.";
    return null;
};