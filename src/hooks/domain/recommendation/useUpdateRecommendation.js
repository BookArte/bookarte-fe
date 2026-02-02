import { useEffect, useState } from "react";
import { useForm } from "../../form/useForm";
import { useNavigate, useParams } from "react-router-dom";
import { handleFormSubmission } from "../../form/handleFormSubmisson";
import { validateRecommendationForm } from "../../../utils/validation/recommedation.validation";
import { getRecommedBookDetail, updateRecommendation } from "../../../api/recommendation.api";

export function useUpdateRecommendation() {
    const { recommendationId } = useParams();
    const [fieldErrors, setFieldErrors] = useState({});
    const { loading, setLoading } = useState(true);
    const navigate = useNavigate();

    const { form, handleChange, setField } = useForm({
        comments: '',
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        const getRecommendDetailHandler = async () => {
            try {
                const res = await getRecommedBookDetail(recommendationId);
                if (res.success) {
                    const data = res.data;
                    Object.entries(data).forEach(([fieldName, value]) => {
                        setField(fieldName, value);
                    });
                }
            } catch (error) {
                console.error("상세 정보 로딩 실패:", error);
                toast.error("존재하지 않는 도서이거나 오류가 발생했습니다.")
            } finally {
                setLoading(false);
            }
        }
        getRecommendDetailHandler()
    }, [recommendationId]);

    const handleSubmit = async (e) => {
        await handleFormSubmission({
            e,
            form,
            validateFunc: validateRecommendationForm,
            apiFunc: (data) => updateRecommendation(recommendationId, data),
            onSuccess: () => navigate(-1),
            setFieldErrors,
        });
    };

    const handleCancel = () => {
        window.history.back();
    }

    return {
        loading,
        form,
        fieldErrors,
        handlers: {
            handleChange,
            handleSubmit,
            handleCancel
        }
    }
}