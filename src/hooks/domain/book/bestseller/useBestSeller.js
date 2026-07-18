import { useEffect, useState } from "react";
import { getBestSellerBookList } from "@/api/book.api";
import { handleApiError } from "@/hooks/utils/errorHandler";
import URL from '@/constants/url';
import { useLocation, useNavigate } from "react-router-dom";

export function useBestSeller() {
    const STORAGE_KEY = 'bestSeller_page';
    const [bestSellers, setBestSellers] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const location = useLocation();

    const transferredState = location.state || {};
    const restoredPage = transferredState.restorePage !== undefined ? transferredState.restorePage : null;

    const savedPage = restoredPage !== null
        ? restoredPage
        : (Number(sessionStorage.getItem(STORAGE_KEY) ?? sessionStorage.getItem('page')) || 0);

    const size = 10;
    const fetchBestSellers = async (page = 0) => {
        setLoading(true);
        try {
            const res = await getBestSellerBookList(page + 1, size);

            const { books, totalResults } = res.data;

            setBestSellers(books);
            setTotalElements(totalResults);
            setCurrentPage(page);
            setTotalPages(Math.ceil(totalResults / size));
        } catch (error) {
            handleApiError(error, "베스트/스테디셀러 로드 실패");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBestSellers(savedPage);

        if (location.state) {
            navigate(location.pathname, { replace: true, state: null });
        }
    }, []);

    const handleViewBook = (isbn) => {
        navigate(URL.BOOK_BEST_VIEW(isbn), {
            state: {
                fromPage: currentPage,
                fromPath: location.pathname
            }
        });
    }

    const handlePageChange = (pageIdx) => {
        if (pageIdx < 0 || pageIdx >= totalPages) return;
        sessionStorage.setItem(STORAGE_KEY, pageIdx);
        fetchBestSellers(pageIdx);
        window.scrollTo(0, 0);
    };

    return {
        bestSellers,
        status: {
            loading,
            totalElements,
        },
        handlers: {
            handleViewBook,
            handlePageChange
        },
        pagination: {
            currentPage,
            totalPages,
            handlePageChange
        }

    };
}
