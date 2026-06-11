import { useNavigate, useParams } from "react-router-dom";
import { getBookDetailByBookId, getRelatedBookList } from "@/api/book.api";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import URL from '@/constants/url';
import { borrowBook, getBookRollingYear } from "@/api/borrow.api";
import { addWish, deleteWish } from "@/api/wish.api";
import { handleApiError } from "@/hooks/utils/errorHandler";


export function useBookDetail() {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [stats, setStats] = useState([]);
    const [relatedBooks, setRelatedBooks] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllData = async (bookId) => {
            window.scrollTo(0, 0);
            try {
                const [bookRes, statsRes, relatedRes] = await Promise.all([
                    getBookDetailByBookId(bookId),
                    getBookRollingYear(bookId),
                    getRelatedBookList(bookId)
                ]);

                if (bookRes.success) setBook(bookRes.data);
                if (statsRes.success) setStats(statsRes.data);
                if (relatedRes.success) setRelatedBooks(relatedRes.data);
            } catch (error) {
                handleApiError(error, "도서 상세 정보 로드 실패");
            } finally {
                setLoading(false);
            }
        };

        fetchAllData(bookId);
    }, [bookId]);

    //대출 핸들러
    const handleBorrow = async (bookId) => {
        if (window.confirm("해당 도서를 대출하시겠습니까?")) {
            try {
                const res = await borrowBook(bookId);

                if (res.success) {
                    setBook(prev => prev ? { ...prev, canBorrow: false } : prev);
                    toast.success(res.data);
                }
            } catch (error) {
                handleApiError(error, "도서 대출 실패");
            }
        }
    }

    const handleViewBook = (bookId) => {
        navigate(URL.BOOK_VIEW(bookId));
    }

    const handleToggleWish = useCallback(async (bookId) => {
        if (!book) return;
        try {
            const res = await (book.wish ? deleteWish(bookId) : addWish(bookId));

            if (res.success) {
                setBook(prev => ({ ...prev, wish: !prev.wish }));
                toast.success(res.data);
            }
        } catch (error) {
            handleApiError(error, "관심 도서 추가 실패");
        }

    }, [book, setBook]);


    return {
        book,
        stats,
        relatedBooks,
        loading,
        handlers: {
            handleBorrow,
            handleViewBook,
            handleToggleWish
        }

    };
}
