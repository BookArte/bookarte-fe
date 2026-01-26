import { useState } from "react";
import { useForm } from '../../form/useForm';
import { setRecommendationBook } from '../../../api/recommendation.api';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import URL from '@/constants/url';
import { handleFormSubmission } from "../../form/handleFormSubmisson";
import { validateRecommendationForm } from "../../../utils/validation/recommedation.validation";

export function useRecommend() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const navigate = useNavigate();

    const [fieldErrors, setFieldErrors] = useState({});

    const { form, handleChange } = useForm({
        comments: '',
        startDate: '',
        endDate: ''
    })

    // 도서 선택 완료 시 호출
    const handleSelectBook = (book) => {
        setSelectedBook(book);
        setIsModalOpen(false);
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

    return {
        form,
        fieldErrors,
        modal: {
            isModalOpen,
            setIsModalOpen,
        },
        book: {
            selectedBook,
            setSelectedBook
        },
        handlers: {
            handleChange,
            handleSelectBook,
            handleSubmit
        }
    }
}