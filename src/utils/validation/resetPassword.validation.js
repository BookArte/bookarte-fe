import { trim } from './trim';

export function validateResetPasswordForm({ newPassword, confirmPassword }) {
    const pw = trim(newPassword);
    const confirmPw = trim(confirmPassword);

    if (!pw) return '새 비밀번호를 입력해주세요.';

    const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
    if (!pwRegex.test(pw)) {
        return '비밀번호는 영문자와 숫자를 포함하여 8~16자로 입력해주세요.';
    }

    if (!confirmPw) return '비밀번호 확인을 입력해주세요.';

    if (pw !== confirmPw) {
        return '비밀번호가 일치하지 않습니다.';
    }

    return null;
}