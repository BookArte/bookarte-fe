import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import URL from '@/constants/url';
import { getWishList } from "../../../api/wish.api";

export function useMyWishList() {
    const [wishes, setWishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const navigate = useNavigate();

    const fetchWishes = async (page = 0) => {
        setLoading(true);
        try {
            const res = await getWishList({
                params: page
            });
            if (res.success) {
                setWishes(res.data.content);
                setTotalElements(res.data.totalElements);
                setTotalPages(res.data.totalPages);
                setCurrentPage(res.data.number);
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchWishes();
    }, []);


    const handleViewBook = (bookId) => {
        navigate(URL.BOOK_VIEW(bookId));
    }

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            fetchWishes(newPage);
            window.scrollTo(0, 0);
        }
    }

    return {
        wishes,
        status: {
            loading,
            totalElements,
            totalPages,
            currentPage,
        },
        handlers: {
            handleViewBook,
            handlePageChange
        }
    };
}