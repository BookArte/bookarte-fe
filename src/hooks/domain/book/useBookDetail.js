import { useNavigate, useParams } from "react-router-dom";
import { deleteBookByBookId, getBookDetailByBookId } from "../../../api/book.api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import URL from '@/constants/url';
import { borrowBook, getBookRollingYear } from "../../../api/borrow.api";


export function useBookDetail() {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState([]);

    useEffect(() => {
        const fetchAllData = async (bookId) => {
            try {
                const [bookRes, statsRes] = await Promise.all([
                    getBookDetailByBookId(bookId),
                    getBookRollingYear(bookId)
                ]);

                console.log(bookRes)
                console.log(statsRes)
                if (bookRes.success) setBook(bookRes.data);
                if (statsRes.success) setStats(statsRes.data);
            } catch (error) {
                console.error("상세 정보 로딩 실패:", error);
                toast.error("존재하지 않는 도서이거나 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchAllData(bookId);
    }, [bookId]);

    // 삭제 핸들러
    const handleDelete = async (bookId) => {
        if (window.confirm("정말로 이 도서를 삭제하시겠습니까?")) {
            try {
                const res = await deleteBookByBookId(bookId);

                if (res.success) {
                    toast.success(res.data);
                    navigate('/book/list');
                } else {
                    toast.error(res.data);
                }
            } catch (error) {
                console.error("삭제 요청 중 오류 발생:", error);
                toast.error("삭제 처리 중 서버 오류가 발생했습니다.");
            }
        }
    };

    //대출 핸들러
    const handleBorrow = async (bookId) => {
        if (window.confirm("해당 도서를 대출하시겠습니까?")) {
            try {
                const res = await borrowBook(bookId);

                if (res.success) {
                    toast.success(res.data);
                } else {
                    toast.error(res.data);
                }
            } catch (error) {
                console.error("삭제 요청 중 오류 발생:", error);
                toast.error("삭제 처리 중 서버 오류가 발생했습니다.");
            }
        }
    }

    const handleUpdate = (bookId) => {
        navigate(URL.BOOK_UPDATE(bookId));
    }

    return {
        book,
        loading,
        stats,
        handlers: {
            handleDelete,
            handleUpdate,
            handleBorrow
        }

    };
}