import { useState } from 'react';
import { useFindIdForm } from '@/hooks/form/useFindIdForm';
import { findMemberId } from '@/api/member.api';
import { toast } from 'react-toastify';
import { validateFindIdForm } from '@/utils/validation/findId.validation';

export function useFindId() {
    const [foundIds, setFoundIds] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { form, setField, handleInput } = useFindIdForm();

    const handleTelChange = (field) => (e) => {
        setField(field, e.target.value.replace(/[^0-9]/g, ''));
    };

    const selectEmailDomain = (e) => {
        setField('memberEmail02', e.target.value);
    };

    const submitFindIdHandler = async () => {
        if (isSubmitting) return;

        const { memberName, memberTel01, memberTel02, memberTel03, memberEmail01, memberEmail02 } = form;

        const tel = `${memberTel01}-${memberTel02}-${memberTel03}`;
        const email = `${memberEmail01}@${memberEmail02}`;

        const error = validateFindIdForm({ memberName, memberTel: tel, memberEmail: email });
        if (error) return toast.warning(error);

        setIsSubmitting(true);
        try {
            const result = await findMemberId({ memberName, memberTel: tel, memberEmail: email });

            if (result.success && result.data.userIds.length > 0) {
                setFoundIds(result.data.userIds);
            } else {
                toast.error("일치하는 회원 정보가 없습니다.");
            }
        } catch (err) {
            console.error(err);
            toast.error("아이디 조회 중 오류가 발생했습니다.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        form,
        foundIds,
        handlers: {
            handleInput,
            handleTelChange,
            selectEmailDomain,
            submitFindIdHandler
        },
        status: { isSubmitting }
    };
}