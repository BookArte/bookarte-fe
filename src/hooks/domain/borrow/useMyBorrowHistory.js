import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import URL from '@/constants/url';
import { getMyBorrowList } from "../../../api/borrow.api";

export function useMyBorrowHistory() {
    const [borrowHistory, setBorrowHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchParams, setSearchParams] = useState({
        bookId: '',
        status: 'RETURNED',
        statusNot: '',
        isOverdue: '',
        startDate: '',
        endDate: '',
        searchKeyword: '',
    });

    const navigate = useNavigate();

    const fetchMyBorrowHistory = async (page = 0) => {
        setLoading(true);
        try {
            const res = await getMyBorrowList({ params: { ...searchParams, page } });
            setBorrowHistory(res.data.content);
            setTotalPages(res.data.totalPages);
            setCurrentPage(res.data.number);
        } catch (error) {
            console.error("내 대출 내역을 불러오는 중 오류 발생:", error);
            toast.error("내 대출 내역을 불러오는 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyBorrowHistory();
    }, [searchParams]);

    const handlePageChange = (page) => {
        if (page >= 0 && page < totalPages) {
            fetchMyBorrowHistory(page);
            window.scrollTo(0, 0);
        }
    };

    const handleViewBook = (bookId) => {
        navigate(URL.BOOK_VIEW(bookId));
    }

    return {
        borrowHistory,
        status: {
            loading,
            totalPages,
            currentPage
        },
        handlers: {
            handlePageChange,
            handleViewBook
        }
    };
}