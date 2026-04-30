import { toast } from "react-toastify";
import { parserServerValidationErrors } from "../../utils/validation/serverValidParser";

export const handleFormSubmission = async ({
    e,
    form,
    validateFunc,
    apiFunc,
    onSuccess,
    setFieldErrors
}) => {
    if (e) e.preventDefault();

    setFieldErrors({});

    // 클라이언트 측 검증
    const clientErrors = validateFunc(form);
    if (Object.keys(clientErrors).length > 0) {
        setFieldErrors(clientErrors);
        toast.error("입력한 정보를 다시 확인해주세요.");
        return;
    }

    try {
        const res = await apiFunc(form);
        toast.success(res.data);
        if (onSuccess) onSuccess(res);
    } catch (error) {
        console.log(error)
        const serverError = error.response?.data;
        if (serverError && serverError.code === 400 && serverError.data) {
            const newFieldErrors = parserServerValidationErrors(serverError);
            setFieldErrors(newFieldErrors);
            toast.error("입력한 정보를 다시 확인해주세요.");
        } else {
            toast.error(serverError?.message || "요청 처리 중 오류가 발생했습니다.");
        }
    }
};