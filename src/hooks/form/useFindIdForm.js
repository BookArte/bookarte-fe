import { useForm } from './useForm';

const INITIAL_FIND_ID_FORM = {
    memberName: '',
    memberTel01: '010',
    memberTel02: '',
    memberTel03: '',
    memberEmail01: '',
    memberEmail02: ''
};

export function useFindIdForm(initialState = INITIAL_FIND_ID_FORM) {
    const { form, handleChange, setField } = useForm(initialState);

    const handleInput = (e) => {
        handleChange(e);
    };

    return {
        form,
        setField,
        handleInput
    };
}