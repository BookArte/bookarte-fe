import { useState } from "react";
import { useForm } from '../../form/useForm';
import { isRecommend, setRecommendationBook } from '../../../api/recommendation.api';
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
            const isRecommed = await handleRecommendedCheck(book.bookId);
            if (closeModal) closeModal();
            if (isRecommed) {
                setSelectedBook(null)
                setRecommended('이미 추천된 도서입니다.');
                return;
            }
            setSelectedBook(book);

        } catch (error) {
            console.error("도서 선택 중 오류 발생:", error);
            toast.error("도서 선택 중 오류가 발생했습니다.");
        }

    };

    //추천 도서 중복 체크
    const handleRecommendedCheck = async (bookId) => {
        try {
            const res = await isRecommend(bookId);
            return res.data;
        } catch (error) {
            console.error("도서 중복 체크 중 오류 발생:", error);
            toast.error("도서 중복 체크 중 오류가 발생했습니다.");
            return false;
        }
    }

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
        recommended,
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