import { useForm } from './useForm';

const INITIAL_FIND_PW_FORM = {
    memberUserId: '',
    memberName: '',
    memberEmail01: '',
    memberEmail02: ''
};

export function useFindPasswordForm(initialState = INITIAL_FIND_PW_FORM) {

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