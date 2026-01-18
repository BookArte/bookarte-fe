import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBookList } from "../../../api/book.api";
import URL from '@/constants/url';

export function useBookList() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalElements, setTotalElements] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const res = await getAllBookList();
            if (res.success) {
                setBooks(res.data.content);
                setTotalElements(res.data.totalElements);
            }
        } catch (error) {
            console.error("도서 목록 로딩 실패:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleViewBook = (bookId) => {
        navigate(URL.BOOK_VIEW(bookId));
    }

    return {
        books,
        loading,
        totalElements,
        handleViewBook
    };


}