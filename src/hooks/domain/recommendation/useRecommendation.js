import { useState } from "react";
import { useForm } from '../../form/useForm';
import { setRecommendationBook } from '../../../api/recommendation.api';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import URL from '@/constants/url';
import { handleFormSubmission } from "../../form/handleFormSubmisson";
import { validateRecommendationForm } from "../../../utils/validation/recommedation.validation";

export function useRecommendation(closeModal) {
    const [selectedBook, setSelectedBook] = useState(null);
    const navigate = useNavigate();

    const [fieldErrors, setFieldErrors] = useState({});
    const [recommended, setRecommended] = useState('');

    const { form, handleChange } = useForm({
        comments: '',
        startDate: '',
        endDate: ''
    })

    // 도서 선택 완료 시 호출
    const handleSelectBook = async (book) => {
        setRecommended('')
        try {
            if (closeModal) closeModal();
            setSelectedBook(book);

        } catch (error) {
            console.error("도서 선택 중 오류 발생:", error);
            toast.error("도서 선택 중 오류가 발생했습니다.");
        }

    };

    const handleSubmit = async (e) => {
        if (!selectedBook) return toast.info("도서를 먼저 선택해주세요.");

        const requestData = {
            bookId: selectedBook.bookId,
            ...form
        };

        await handleFormSubmission({
            e,
            form: requestData,
            validateFunc: validateRecommendationForm,
            apiFunc: setRecommendationBook,
            onSuccess: () => {
                navigate(URL.RECOMMENDATION_REORDER, { replace: true });
            },
            setFieldErrors
        })
    };

    const handleCancel = () => {
        navigate(URL.RECOMMENDATION_REORDER, { replace: true });
    }

    return {
        form,
        fieldErrors,
        recommended,
        book: {
            selectedBook,
            setSelectedBook
        },
        handlers: {
            handleChange,
            handleSelectBook,
            handleSubmit,
            handleCancel
        }
    }
}