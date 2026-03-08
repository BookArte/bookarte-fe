import { useCallback, useEffect, useState } from "react";
import { getPopularBooks } from "../../../api/borrow.api";
import URL from '@/constants/url';
import { useNavigate } from "react-router-dom";

export function usePopularList() {
    const [populars, setPopulars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [period, setPeriod] = useState('WEEK'); // WEEK, MONTH, YEAR
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        fetchPopulars(0);
    }, [period]);

    const fetchPopulars = useCallback(async (page = 0) => {
        setLoading(true);
        try {
            const res = await getPopularBooks(period, page);
            if (res.success) {
                setPopulars(res.data.content);
                setTotalElements(res.data.totalElements);
                setTotalPages(res.data.totalPages);
                setCurrentPage(res.data.number);
            }
        } finally {
            setLoading(false);
        }
    }, [period]);

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