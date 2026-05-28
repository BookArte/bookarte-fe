import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { withdrawMember } from '@/api/member.api';
import { logoutMember } from "@/api/member.api";
import URL from '@/constants/url';
import { useAuthStore } from "@/store/useAuthStore";

export function useWithdrawal(closeModal) {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const setLogout = useAuthStore((state) => state.setLogout);

    const handleChange = (e) => {
        setPassword(e.target.value);
    };

    const resetForm = () => {
        setPassword('');
    };

    const onSubmit = async () => {
        if (!password.trim()) {
            toast.warn('비밀번호를 입력해주세요.');
            return;
        }

        if (!window.confirm('정말로 탈퇴하시겠습니까? 탈퇴 후 데이터는 복구할 수 없습니다.')) {
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await withdrawMember({ password });
            if (res.success) {
                toast.success('회원탈퇴가 완료되었습니다.');
            }

            toast.success('회원탈퇴가 완료되었습니다.');

            closeModal();

            await logoutMember();
            setLogout();
            navigate(URL.MAIN);

        } catch (error) {
            console.error('탈퇴 실패:', error);
            toast.error(error.response?.data?.data || '비밀번호가 일치하지 않거나 오류가 발생했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData: { password },
        status: { isSubmitting },
        handlers: {
            handleChange,
            onSubmit,
            resetForm
        }
    };
}