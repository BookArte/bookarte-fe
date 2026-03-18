import { toast } from "react-toastify";

export const handleApiError = (error, customMessage) => {
    console.error(customMessage || "요청 중 오류 발생:", error.response?.data || error.message);

    const errorMessage =
        error.response?.data?.data ||
        error.response?.data?.message ||
        "서버와의 연결이 원활하지 않습니다.";

    toast.error(errorMessage);

    return errorMessage;
}