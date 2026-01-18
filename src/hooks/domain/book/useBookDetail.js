import { useNavigate, useParams } from "react-router-dom";
import { deleteBookByBookId, getBookDetailByBookId } from "../../../api/book.api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import URL from '@/constants/url';


export function useBookDetail() {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getBookDetailHandler = async (bookId) => {
            try {
                const res = await getBookDetailByBookId(bookId);
                if (res.success) {
                    setBook(res.data);
                }
            } catch (error) {
                console.error("상세 정보 로딩 실패:", error);
                toast.error("존재하지 않는 도서이거나 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        getBookDetailHandler(bookId);
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

    const handleUpdate = (bookId) => {
        navigate(URL.BOOK_UPDATE(bookId));
    }

    return {
        book,
        loading,

        handlers: {
            handleDelete,
            handleUpdate
        }

    };
}