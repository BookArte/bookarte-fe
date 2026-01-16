import { useState } from 'react';

export function useForm(initialState) {
    const [form, setForm] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const setField = (name, value) => {
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return {
        form,
        handleChange,
        setField
    };
}
