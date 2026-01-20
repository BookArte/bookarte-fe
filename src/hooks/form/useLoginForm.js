import { useForm } from './useForm';

const INITIAL_LOGIN_FORM = {
    memberUserId: '',
    memberPassword: '',
};

export function useLoginForm(initialState = INITIAL_LOGIN_FORM) {
    const { form, handleChange, setField } = useForm(initialState);

    return {
        form,
        handleChange,
        setField
    };
}