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
            console.error("대출 내역을 불러오는 중 오류 발생:", error);
            toast.error("대출 내역을 불러오는 중 오류가 발생했습니다.");
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
