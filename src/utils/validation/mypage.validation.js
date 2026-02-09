import { TEL_REGEX, EMAIL_REGEX } from '@/constants/regex';
import { trim } from './trim';

export const validateMemberUpdate = ({ name, tel, email }) => {
    const userName = trim(name);
    const userTel = trim(tel);
    const userEmail = trim(email);

    if (!userName) return '이름을 입력해주세요.';

    if (!userTel) return '전화번호를 입력해주세요.';
    if (!TEL_REGEX.test(userTel)) return '전화번호 형식이 올바르지 않습니다.';

    if (!userEmail) return '이메일을 입력해주세요.';
    if (!EMAIL_REGEX.test(userEmail)) return '이메일 형식이 올바르지 않습니다.';

    return null;
};