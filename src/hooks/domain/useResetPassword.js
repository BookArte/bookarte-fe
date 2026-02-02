import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from '../form/useForm';
import { resetPassword } from '@/api/member.api';
import { validateResetPasswordForm } from '@/utils/validation/resetPassword.validation';
import { toast } from 'react-toastify';
import URL from '@/constants/url';
import { useEffect, useState } from 'react';

export function useResetPassword() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { id, resetToken } = location.state || {};

    useEffect(() => {
        if (!id || !resetToken) {
            toast.error("비정상적인 접근입니다.");
            navigate(URL.MEMBER_LOGIN, { replace: true });
        }
    }, [id, resetToken, navigate]);

    const { form, handleChange } = useForm({
        newPassword: '',
        confirmPassword: ''
    });

    const submitResetHandler = async () => {
        if (isSubmitting) return;

        const error = validateResetPasswordForm({
            newPassword: form.newPassword,
            confirmPassword: form.confirmPassword
        });

        if (error) return toast.warning(error);

        setIsSubmitting(true);

        try {
            const result = await resetPassword({
                id,
                resetToken,
                memberPassword: form.newPassword
            });

            if (result.success) {
                toast.success("비밀번호가 변경되었습니다. 다시 로그인해주세요.");
                navigate(URL.MEMBER_LOGIN, { replace: true });
            }
        } catch (err) {
            toast.error(err.response?.data?.data);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        form,
        status: { isSubmitting },
        handlers: {
            handleChange,
            submitResetHandler
        }
    };
}