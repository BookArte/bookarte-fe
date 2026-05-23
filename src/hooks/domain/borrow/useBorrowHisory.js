import { useEffect, useState } from "react";
import { getAllBorrowList } from "../../../api/borrow.api";
import { toast } from "react-toastify";
import { handleApiError } from "@/hooks/utils/errorHandler";

export function useBorrowHistory() {
    const [borrows, setBorrows] = useState([]);
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

    const fetchBorrowHistory = async (page = 0, params = searchParams) => {
        setLoading(true);
        try {
            const res = await getAllBorrowList({ params: { ...params, page } });
            setBorrows(res.data.content);
            setTotalPages(res.data.totalPages);
            setCurrentPage(res.data.number);
        } catch (error) {
            handleApiError(error, "전체 대출 이력 로드 실패")
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBorrowHistory(0, searchParams);
    }, []);

    const handleChangeSearchParams = (target) => {
        setSearchParams(prev => ({
            ...prev,
            [target.name]: target.value
        }));
    };

    const handleSearch = () => {
        fetchBorrowHistory(0, searchParams);
    };

    const handlePageChange = (page) => {
        if (page >= 0 && page < totalPages) {
            fetchBorrowHistory(page, searchParams);
            window.scrollTo(0, 0);
        }
    };

    return {
        borrows,
        status: {
            loading,
            totalPages,
            currentPage
        },
        handlers: {
            handleChangeSearchParams,
            handleSearch,
        },
        pagination: {
            currentPage,
            totalPages,
            handlePageChange
        }
    };
}
