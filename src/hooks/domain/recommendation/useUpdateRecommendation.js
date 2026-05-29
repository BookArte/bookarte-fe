import { useEffect, useState } from "react";
import { useForm } from "../../form/useForm";
import { useNavigate, useParams } from "react-router-dom";
import { handleFormSubmission } from "../../form/handleFormSubmisson";
import { validateRecommendationForm } from "../../../utils/validation/recommedation.validation";
import { getRecommedBookDetail, updateRecommendation } from "../../../api/recommendation.api";
import URL from '@/constants/url';

export function useUpdateRecommendation() {
    const { recommendationId } = useParams();
    const [fieldErrors, setFieldErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const { form, handleChange, setField } = useForm({
        comments: '',
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        setLoading(true);
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
                handleApiError(error, "도서 추천 정보 조회 로드 실패")
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
            onSuccess: () => navigate(URL.RECOMMENDATION_REORDER, { replace: true }),
            setFieldErrors,
        });
    };

    const handleCancel = () => {
        navigate(URL.RECOMMENDATION_REORDER, { replace: true });
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