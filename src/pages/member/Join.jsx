import { useState } from 'react';
import { useForm } from "@/hooks/useForm";
import { joinMember } from '@/api/member.api';
import { useNavigate } from 'react-router-dom';
import URL from '@/constants/url';
import { EMAIL_DOMAINS } from '@/constants/email';
import { TEL_REGEX, EMAIL_REGEX } from '@/constants/regex';

function Join() {
    const navigate = useNavigate();
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');
    const [isPasswordMatch, setIsPasswordMatch] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { form: joinForm, handleChange, setField } = useForm({
        memberUserId: '',
        memberPassword: '',
        memberName: '',
        memberTel01: '010',
        memberTel02: '',
        memberTel03: '',
        memberEmail01: '',
        memberEmail02: ''
    });


    const handleTel02Change = (e) => {
        setField('memberTel02', e.target.value.replace(/[^0-9]/g, ''));
    };

    const handleTel03Change = (e) => {
        setField('memberTel03', e.target.value.replace(/[^0-9]/g, ''));
    }

    const handleEmail01Change = (e) => {
        setField('memberEmail01', e.target.value.replace(/[^a-zA-Z0-9._%+-]/g, ''));
    };

    const handleEmail02Change = (e) => {
        setField('memberEmail02', e.target.value.replace(/[^a-z]/g, ''));
    };

    const selectEmailDomain = (e) => {
        setField('memberEmail02', e.target.value);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;

        setField('memberPassword', value);

        if (confirmPassword) {
            checkPasswordMatch(value, confirmPassword);
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        checkPasswordMatch(joinForm.memberPassword, value);
    };

    const checkPasswordMatch = (pw, confirmPw) => {
        if (!confirmPw) {
            setIsPasswordMatch(null);
            setPasswordConfirmMessage('');
            return;
        }

        if (pw === confirmPw) {
            setIsPasswordMatch(true);
            setPasswordConfirmMessage('비밀번호가 일치합니다.');
        } else {
            setIsPasswordMatch(false);
            setPasswordConfirmMessage('비밀번호가 일치하지 않습니다.');
        }
    };

    const validateForm = ({ form, isPasswordMatch, tel, email }) => {
        if (!form.memberUserId) return "아이디를 입력해주세요.";
        if (!form.memberPassword) return "비밀번호를 입력해주세요.";
        if (!isPasswordMatch) return "비밀번호 확인이 일치하지 않습니다.";
        if (!form.memberName) return "이름을 입력해주세요.";
        if (!TEL_REGEX.test(tel)) return "전화번호 형식이 올바르지 않습니다.";
        if (!EMAIL_REGEX.test(email)) return "이메일 형식이 올바르지 않습니다.";
        return null;
    }

    const submitFormHandler = async () => {
        if (isSubmitting) return;

        const tel = `${joinForm.memberTel01}-${joinForm.memberTel02}-${joinForm.memberTel03}`;
        const email = `${joinForm.memberEmail01}@${joinForm.memberEmail02}`;

        const errorMesage = validateForm({
            form: joinForm,
            isPasswordMatch,
            tel,
            email
        });
        if (errorMesage) {
            alert(errorMesage);
            return;
        }

        setIsSubmitting(true);

        try {
            const payload = {
                ...joinForm,
                memberEmail: email,
                memberTel: tel,
                agreeService: true,
                agreePrivacy: true
            };

            const result = await joinMember(payload);

            if (result.success === true) {
                alert("회원가입이 완료되었습니다.");
                navigate(URL.MEMBER_LOGIN);
            } else {
                alert("회원가입에 실패하였습니다. 다시 시도해주세요.");
                return;
            }

        } catch (error) {
            console.error("회원가입 실패:", error);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className='join-container'>
            <h2 className='join-title'>회원가입</h2>
            <form className='join-form'>
                <div className='form-group'>
                    <input type='text'
                        name='memberUserId'
                        className='join-input id-input'
                        value={joinForm.memberUserId}
                        onChange={handleChange}
                        placeholder='아이디'
                    />
                    <button type="button" className="id-check-btn">중복확인</button>
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        name='memberPassword'
                        className='join-input'
                        value={joinForm.memberPassword}
                        onChange={handlePasswordChange}
                        placeholder='비밀번호'
                    />
                </div>
                <div className='form-group password-confirm-group'>
                    <input
                        type='password'
                        name='memberPasswordConfirm'
                        className='join-input'
                        placeholder='비밀번호 확인'
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                    {isPasswordMatch !== null && (
                        <span className={isPasswordMatch ? 'password-match' : 'password-mismatch'}>
                            {passwordConfirmMessage}
                        </span>
                    )}
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        name='memberName'
                        className='join-input'
                        placeholder='이름'
                        value={joinForm.memberName}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-group tel-group'>
                    <select name="memberTel01" className="join-input" value={joinForm.memberTel01} onChange={handleChange}>
                        <option value="010">010</option>
                    </select>
                    <span>-</span>
                    <input
                        type='text'
                        name='memberTel02'
                        className='join-input'
                        placeholder='1234'
                        maxLength={4}
                        value={joinForm.memberTel02}
                        onChange={handleTel02Change}
                    />
                    <span>-</span>
                    <input
                        type='text'
                        name='memberTel03'
                        className='join-input'
                        placeholder='5678'
                        maxLength={4}
                        value={joinForm.memberTel03}
                        onChange={handleTel03Change}
                    />
                </div>
                <div className='form-group email-group'>
                    <input
                        type='text'
                        name='memberEmail01'
                        className='join-input email-input'
                        placeholder='이메일'
                        value={joinForm.memberEmail01}
                        onChange={handleEmail01Change}
                    />
                    <span>@</span>
                    <input
                        type='text'
                        name='memberEmail02'
                        className='join-input email-input'
                        placeholder='직접입력'
                        value={joinForm.memberEmail02}
                        onChange={handleEmail02Change}
                    />
                    <select
                        className="join-input email-input"
                        value={EMAIL_DOMAINS.includes(joinForm.memberEmail02)
                            ? joinForm.memberEmail02
                            : ''
                        }
                        onChange={selectEmailDomain}
                    >
                        <option value="">직접입력</option>
                        {EMAIL_DOMAINS.map(domain => (
                            <option key={domain} value={domain}>{domain}</option>
                        ))}
                    </select>
                </div>
                <button type='button' className='join-button' onClick={submitFormHandler}>회원가입</button>
            </form>
        </div>
    )
}
export default Join;