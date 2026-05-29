import { TEL_REGEX, EMAIL_REGEX, PASSWORD_REGEX } from '@/constants/regex';
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

export const validationMypagePassword = ({ currentPassword, newPassword, newPasswordConfirm }) => {
    const curPw = trim(currentPassword);
    const newPw = trim(newPassword);
    const newPwConfirm = trim(newPasswordConfirm);

    if (!curPw) return '현재 비밀번호를 입력해주세요.';

    if (!newPw) return '새 비밀번호를 입력해주세요.';
    if (!PASSWORD_REGEX.test(newPw)) return '새 비밀번호는 영문자와 숫자를 포함한 8~16자여야 합니다.';

    if (newPw !== newPwConfirm) return '새 비밀번호가 일치하지 않습니다.';

    return null;
};