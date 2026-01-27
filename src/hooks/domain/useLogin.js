import { jwtDecode } from "jwt-decode";
import { useState } from 'react';
import { toast } from 'react-toastify';
import URL from '@/constants/url';
import { validateLoginForm } from '@/utils/validation/login.validation';
import { useLoginForm } from '../form/useLoginForm';
import { loginMember } from '../../api/member.api';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';

export function useLogin() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const setLogin = useAuthStore((state) => state.setLogin);

    const {
        form,
        handleChange,
    } = useLoginForm();


    const submitFormHandler = async () => {
        if (isSubmitting) return;

        const payload = {
            ...form
        };

        const error = validateLoginForm({ ...payload });
        if (error) return toast.error(error);

        setIsSubmitting(true);
        try {
            const result = await loginMember(payload);

            if (result.success) {
                const { accessToken } = result.data;

                const decoded = jwtDecode(accessToken);

                setLogin(accessToken, {
                    userId: decoded.userId,
                    userName: decoded.userName,
                    role: decoded.role
                });

                toast.success("로그인에 성공하였습니다.");
                navigate(URL.MAIN, { replace: true });
            } else {
                toast.error("로그인에 실패하였습니다. 다시 시도해주세요.");
            }
        } catch (err) {
            if (err.response) {
                console.error(err.response);
                toast.error(err.response.data.data);
            } else {
                console.error(err);
                toast.error("알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        form,
        handlers: {
            handleChange,
            submitFormHandler
        },
        status: {
            isSubmitting
        }
    };
}
