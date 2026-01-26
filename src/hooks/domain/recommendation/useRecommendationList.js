import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { recommendationBookList } from "../../../api/recommendation.api";

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
            console.error("도서 목록 로딩 실패:", error);
        } finally {
            setLoading(false);
        }
    };

    return {
        books,
        loading,
        navigate
    }

}