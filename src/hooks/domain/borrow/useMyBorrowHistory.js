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
            handleApiError(error, "개인 대출 이력 로드 실패")
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