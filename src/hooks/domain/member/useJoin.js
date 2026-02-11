import { useState } from 'react';
import { useJoinForm } from '@/hooks/form/useJoinForm';
import { joinMember, checkMemberId } from '@/api/member.api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import URL from '@/constants/url';
import { validateJoinForm, validateIdCheck } from '@/utils/validation/join.validation';
import { PASSWORD_REGEX, USERID_REGEX } from '@/constants/regex';

export function useJoin({ agreePrivacy, agreeService }) {
    const navigate = useNavigate();
    const [idMessage, setIdMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');
    const [isPasswordMatch, setIsPasswordMatch] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        form,
        handleInput,
        setField,
        isIdChecked,
        checkedUserId,
        setIsIdChecked,
        setCheckedUserId
    } = useJoinForm();

    const handleUserIdChange = (e) => {
        handleInput(e);
        setIdMessage(USERID_REGEX.test(e.target.value) ? '' : '아이디는 영문자로 시작하는 6~16자여야 합니다.');
    };

    const handlePasswordChange = (e) => {
        handleInput(e);
        setPasswordMessage(PASSWORD_REGEX.test(e.target.value) ? '' : '비밀번호는 영문자와 숫자를 포함한 8~16자여야 합니다.');
        if (form.memberConfirmPassword) checkPasswordMatch(e.target.value, form.memberConfirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        handleInput(e);
        checkPasswordMatch(form.memberPassword, value);
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

    const handleTelChange = (field) => (e) => setField(field, e.target.value.replace(/[^0-9]/g, ''));
    const selectEmailDomain = (e) => setField('memberEmail02', e.target.value);

    const idCheckHandler = async () => {
        const error = validateIdCheck(form.memberUserId);
        if (error) return toast.warning(error);

        try {
            const result = await checkMemberId(form.memberUserId);
            if (result.data.available) {
                setIsIdChecked(true);
                setCheckedUserId(form.memberUserId);
                toast.success("사용 가능한 아이디입니다.");
            } else {
                setIsIdChecked(false);
                toast.error("이미 사용중인 아이디입니다.");
            }
        } catch (err) {
            console.error(err);
            toast.error("아이디 중복 확인 중 오류가 발생했습니다.");
        }
    };

    const submitFormHandler = async () => {
        if (isSubmitting) return;

        const {
            memberConfirmPassword,
            memberTel01,
            memberTel02,
            memberTel03,
            memberEmail01,
            memberEmail02,
            ...rest
        } = form;

        const tel = `${memberTel01}-${memberTel02}-${memberTel03}`;
        const email = `${memberEmail01}@${memberEmail02}`;

        const payload = {
            ...rest,
            memberTel: tel,
            memberEmail: email,
            agreePrivacy,
            agreeService
        };

        const error = validateJoinForm({ ...payload, isIdChecked, isPasswordMatch });
        if (error) return toast.error(error);

        setIsSubmitting(true);
        try {

            const result = await joinMember(payload);
            if (result.success) {
                toast.success("회원가입이 완료되었습니다.");
                navigate(URL.MEMBER_LOGIN, { replace: true });
            } else {
                toast.error("회원가입에 실패하였습니다. 다시 시도해주세요.");
            }
        } catch (err) {
            console.error(err);
            toast.error("회원가입 중 오류가 발생했습니다.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        form,
        handlers: {
            handleInput,
            handleUserIdChange,
            handlePasswordChange,
            handleConfirmPasswordChange,
            handleTelChange,
            selectEmailDomain,
            idCheckHandler,
            submitFormHandler
        },
        messages: {
            idMessage,
            passwordMessage,
            passwordConfirmMessage
        },
        status: {
            isPasswordMatch,
            isSubmitting
        }
    };
}
