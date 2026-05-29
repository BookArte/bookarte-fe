export const parserServerValidationErrors = (errorData) => {
    if (!errorData || !errorData.data) return {};

    const newFieldErrors = {};
    const errorPairs = errorData.data.split(', ');

    errorPairs.forEach(pair => {
        const [field, message] = pair.split(': ');
        if (field && message) {
            newFieldErrors[field.trim()] = message.trim();
        }
    });

    return newFieldErrors;

};