import { useCallback, useEffect, useState } from "react";
import { getPopularBooks } from "@/api/borrow.api";
import URL from '@/constants/url';
import { useNavigate } from "react-router-dom";
import { useDataFetch } from "@/hooks/utils/useDataFetch";

export function usePopularList() {
    const [period, setPeriod] = useState('WEEK'); // WEEK, MONTH, YEAR

    const navigate = useNavigate();

    useEffect(() => {
        fetchPopulars(0, { period: period });
    }, [period]);

    const {
        data: populars,
        status,
        fetchData: fetchPopulars
    } = useDataFetch(getPopularBooks)

    const { loading, totalElements, currentPage, totalPages } = status

    const handlePeriodChange = (newPeriod) => {
        setPeriod(newPeriod);
    };

    const handleViewBook = (bookId) => {
        navigate(URL.BOOK_VIEW(bookId));
    }

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            fetchBooks(newPage);
            window.scrollTo(0, 0);
        }
    };

    return {
        populars,
        status: {
            period,
            loading,
            totalElements,
            totalPages,
            currentPage
        },
        handlers: {
            handlePeriodChange,
            handleViewBook,
            handlePageChange
        }

    };
}