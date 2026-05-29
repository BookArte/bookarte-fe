import { TEL_REGEX, EMAIL_REGEX } from '@/constants/regex';
import { trim } from './trim';

export function validateFindIdForm({ memberName, memberTel, memberEmail }) {
    const name = trim(memberName);
    const tel = trim(memberTel);
    const email = trim(memberEmail);

    if (!name) return '이름을 입력해주세요.';
    
    if (!tel || tel.includes('--')) return '전화번호를 모두 입력해주세요.';
    if (!TEL_REGEX.test(tel)) return '전화번호 형식이 올바르지 않습니다.';
    
    if (!email || email.endsWith('@')) return '이메일을 입력해주세요.';
    if (!EMAIL_REGEX.test(email)) return '이메일 형식이 올바르지 않습니다.';

    return null;
}