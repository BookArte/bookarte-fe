import { useState } from 'react';
import { useForm } from '../../form/useForm';
import { toast } from 'react-toastify';
import { validationMypagePassword } from '@/utils/validation/mypage.validation';
// import { modifyPassword } from '@/api/member.api';

export const usePasswordChange = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { form, handleChange, resetForm } = useForm({
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: ''
    });

    const openModal = () => {
        resetForm();
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleSubmit = async () => {

        const error = validationMypagePassword(form);

        // 2. 에러가 있다면 toast 띄우고 중단
        if (error) {
            return toast.error(error);
        }

        setIsSubmitting(true);
        try {
            // const result = await modifyPassword({ currentPassword, newPassword });
            // if (result.success) {
            //     toast.success("비밀번호가 변경되었습니다.");
            //     closeModal();
            // }
        } catch (err) {
            toast.error(err.response?.data?.data || "비밀번호 변경 중 오류가 발생했습니다.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        isOpen,
        formData: form,
        status: { isSubmitting },
        handlers: { openModal, closeModal, handleChange, onSubmit: handleSubmit }
    };
};