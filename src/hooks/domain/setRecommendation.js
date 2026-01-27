import { useState } from "react";
import { useForm } from '../../hooks/form/useForm';
import { setRecommendationBook } from '../../api/recommendation.api';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import URL from '@/constants/url';


export function setRecommendation() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const navigate = useNavigate();

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

    const handleSubmit = async () => {
        if (!selectedBook) return toast.info("도서를 먼저 선택해주세요.");

        const requestData = {
            bookId: selectedBook.bookId,
            ...form
        };

        try {
            const res = await setRecommendationBook(requestData);

            if (res.success) {
                toast.success(res.data);
                navigate(URL.RECOMMENDATION_REORDER, { replace: true });
            }
        } catch (error) {
            alert("등록 중 오류가 발생했습니다.");
        }
    };

    return {
        form,

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