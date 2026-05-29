import { useState } from 'react';
import { useForm } from './useForm';

const INITIAL_JOIN_FORM = {
    memberUserId: '',
    memberPassword: '',
    memberName: '',
    memberTel01: '010',
    memberTel02: '',
    memberTel03: '',
    memberEmail01: '',
    memberEmail02: '',
    memberConfirmPassword: ''
};

export function useJoinForm(initialState = INITIAL_JOIN_FORM) {
    const { form, handleChange, setField } = useForm(initialState);

    const [isIdChecked, setIsIdChecked] = useState(false);
    const [checkedUserId, setCheckedUserId] = useState('');

    const handleInput = (e) => {
        const { name } = e.target;
        handleChange(e);

        if (name === 'memberUserId') {
            setIsIdChecked(false);
            setCheckedUserId('');
        }
    };

    return {
        form,
        handleChange,
        setField,
        isIdChecked,
        checkedUserId,
        setIsIdChecked,
        setCheckedUserId,
        handleInput
    };
}
