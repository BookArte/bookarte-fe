import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { recommendationBookList } from "../../../api/recommendation.api";
import URL from '@/constants/url';

export function useRecommendationList() {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await recommendationBookList();
            if (response.success) {
                setBooks(response.data);
            }
        } catch (error) {
            handleApiError(error, "현재 노출 중인 추천 도서 목록 로드 실패")
        } finally {
            setLoading(false);
        }
    };

    // 도서 상세 페이지 이동 함수
    const handleViewBook = (bookId) => {
        navigate(URL.BOOK_VIEW(bookId));
    }

    return {
        books,
        loading,
        handleViewBook
    }
}