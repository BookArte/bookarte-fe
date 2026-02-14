import { useState } from "react";
import { useForm } from "../../form/useForm";
import { toast } from 'react-toastify';
import { validateMemberUpdate } from '@/utils/validation/mypage.validation';
import { modifyMember } from "../../../api/member.api";

export const useMypageInfo = (userData, refetch) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { form, handleChange, resetForm, setField } = useForm({
        name: userData?.name || '',
        tel: userData?.tel || '',
        email: userData?.email || ''
    });

    const formatTel = (value) => {
        const nums = value.replace(/[^0-9]/g, '');
        if (nums.length <= 3) return nums;
        if (nums.length <= 7) return `${nums.slice(0, 3)}-${nums.slice(3)}`;
        return `${nums.slice(0, 3)}-${nums.slice(3, 7)}-${nums.slice(7, 11)}`;
    };

    const handleTelChange = (e) => {
        const formatted = formatTel(e.target.value);
        setField('tel', formatted);
    };

    const handleEdit = () => setIsEditing(true);

    const handleCancel = () => {
        resetForm({
            name: userData?.name || '',
            tel: userData?.tel || '',
            email: userData?.email || ''
        });
        setIsEditing(false);
    };

    const submitFormHandler = async () => {
        if (isSubmitting) return;

        const error = validateMemberUpdate(form);
        if (error) return toast.error(error);

        setIsSubmitting(true);
        try {
            const result = await modifyMember(form);
            if (result.success) {
                toast.success("정보가 성공적으로 수정되었습니다.");

                if (refetch) await refetch();
                
                setIsEditing(false);
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
        formData: form,
        userData,
        handlers: {
            handleChange,
            handleTelChange,
            onEdit: handleEdit,
            onCancel: handleCancel,
            onSave: submitFormHandler
        },
        status: {
            isEditing,
            isSubmitting
        }
    };
}