import { useState } from 'react';
import { useForm } from '../../form/useForm';
import { toast } from 'react-toastify';
import { validationMypagePassword } from '@/utils/validation/mypage.validation';
import { modifyPassword } from '@/api/member.api';

export const usePasswordChange = (onSuccess) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { form, handleChange, resetForm } = useForm({
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: ''
    });

    const handleSubmit = async () => {
        const error = validationMypagePassword(form);
        if (error) return toast.error(error);

        const payload = {
            currentPassword: form.currentPassword,
            newPassword: form.newPassword
        };

        setIsSubmitting(true);
        try {
            const result = await modifyPassword(payload);
            if (result.success) {
                toast.success("비밀번호가 변경되었습니다.");
                resetForm();
                if (onSuccess) onSuccess();
            }
        } catch (err) {
            toast.error(err.response?.data?.data || "비밀번호 변경 중 오류가 발생했습니다.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData: form,
        status: {
            isSubmitting
        },
        handlers: {
            handleChange,
            onSubmit: handleSubmit,
            resetForm
        }
    };
};