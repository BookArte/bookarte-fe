import { useState, useRef, useEffect } from 'react';
import { findMemberPassword, verifyEmailCode } from '@/api/member.api';
import { useFindPasswordForm } from '@/hooks/form/useFindPasswordForm';
import { toast } from 'react-toastify';
import { validateFindPasswordForm } from '@/utils/validation/findPassword.validation';

export function useFindPassword() {
    const [timeLeft, setTimeLeft] = useState(0);
    const [isStepCode, setIsStepCode] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [codes, setCodes] = useState(Array(6).fill(''));
    const inputRefs = useRef([]);

    const { form, setField, handleInput } = useFindPasswordForm();

    const selectEmailDomain = (e) => {
        setField('memberEmail02', e.target.value);
    };

    useEffect(() => {
        if (!isStepCode || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [isStepCode, timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const submitFindPasswordHandler = async () => {
        if (isSubmitting) return;

        const { memberUserId, memberName, memberEmail01, memberEmail02 } = form;
        const email = `${memberEmail01}@${memberEmail02}`;

        const error = validateFindPasswordForm({
            memberUserId,
            memberName,
            memberEmail: email
        });

        if (error) return toast.warning(error);

        setIsSubmitting(true);
        try {
            const email = `${memberEmail01}@${memberEmail02}`;
            const result = await findMemberPassword({ memberUserId, memberName, memberEmail: email });

            if (result.success) {
                const serverTtl = result.data.expiresIn;
                setTimeLeft(serverTtl);

                toast.success("인증 코드가 이메일로 발송되었습니다.");
                setIsStepCode(true);
            }
        } catch (err) {
            toast.error(err.response.data.data);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 6);
    
    if (!/^\d+$/.test(pasteData)) return;

    const newCodes = [...codes];
    pasteData.split('').forEach((char, index) => {
        if (index < 6) newCodes[index] = char;
    });
    
    setCodes(newCodes);

    const nextIndex = Math.min(pasteData.length, 5);
    inputRefs.current[nextIndex].focus();
};

    const handleCodeChange = (index, value) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newCodes = [...codes];
        newCodes[index] = value;
        setCodes(newCodes);

        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const submitCodeHandler = async () => {
        const codeString = codes.join('');
        if (codeString.length < 6) return toast.warning("6자리 코드를 모두 입력해주세요.");

        const { memberEmail01, memberEmail02 } = form;
        const email = `${memberEmail01}@${memberEmail02}`;

        try {
            const result = await verifyEmailCode({
                memberEmail: email,
                code: codeString
            });
            console.log(result);
            if (result.success) {
                toast.success("인증에 성공했습니다. 비밀번호 재설정 페이지로 이동합니다.");
                // navigate(URL.MEMBER_RESET_PASSWORD); // 이후 재설정 페이지 이동 로직
            }
        } catch (err) {
            toast.error(err.response.data.data);
        }
    };

    return {
        form,
        isStepCode,
        codes,
        inputRefs,
        timeLeft,
        formatTime,
        status: { isSubmitting },
        handlers: {
            handleInput,
            selectEmailDomain,
            submitFindPasswordHandler,
            handleCodeChange,
            submitCodeHandler,
            handlePaste
        }
    };
}