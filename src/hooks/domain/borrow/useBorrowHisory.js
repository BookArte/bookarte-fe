import { useEffect, useState } from "react";
import { getAllBorrowList } from "../../../api/borrow.api";
import { toast } from "react-toastify";

export function useBorrowHistory() {
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

    const fetchBorrowHistory = async (page = 0) => {
        setLoading(true);
        try {
            const res = await getAllBorrowList({ params: { ...searchParams, page } });
            setBorrowHistory(res.data.content);
            setTotalPages(res.data.totalPages);
            setCurrentPage(res.data.number);
        } catch (error) {
            handleApiError(error, "전체 대출 이력 로드 실패")
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBorrowHistory();
    }, [searchParams]);

    const handlePageChange = (page) => {
        if (page >= 0 && page < totalPages) {
            fetchBorrowHistory(page);
            window.scrollTo(0, 0);
        }
    };

    return {
        borrowHistory,
        handlePageChange,
        status: {
            loading,
            totalPages,
            currentPage
        },
    };
}
