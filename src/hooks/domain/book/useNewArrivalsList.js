import { useCallback, useEffect, useMemo, useState } from "react";
import { getAllBookList, getLatestBookRegistrationDate } from "../../../api/book.api";
import { useNavigate } from "react-router-dom";
import URL from '@/constants/url';
import { toast } from "react-toastify";

export function useNewArrivalsList() {
    const [arrivals, setArrivals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const [selectedDate, setSelectedDate] = useState(new Date());

    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useState({
        bookTitle: '',
        bookAuthor: '',
        publisherName: '',
        bookIsbn: '',
        category: '',
        publicationDateStart: '',
        publicationDateEnd: '',
        createdAtStart: '',
        createdAtEnd: '',
        size: 10,
        sort: 'createdAt,desc'
    });

    useEffect(() => {
        const latestDate = async () => {
            try {
                const res = await getLatestBookRegistrationDate();
                const latest = new Date(res.data);
                setSelectedDate(latest);
            } catch (error) {
                setSelectedDate(new Date());
            }
        };

        latestDate();
    }, []);

    const fetchNewArrivalsList = useCallback(async (page = 0, params) => {
        setLoading(true);
        try {
            const res = await getAllBookList({
                params: { ...params, page }
            });

            setArrivals(res.data.content);
            setTotalElements(res.data.totalElements);
            setTotalPages(res.data.totalPages);
            setCurrentPage(page);
        } catch (error) {
            toast.error("신착 도서 목록을 불러오는 중 오류가 발생했습니다.");
            console.error("Error fetching new arrivals list:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const dateRange = useMemo(() => {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
        return {
            start: new Date(year, month, 1).toISOString().split('T')[0],
            end: new Date(year, month + 1, 0).toISOString().split('T')[0]
        };
    }, [selectedDate]);

    useEffect(() => {
        const params = {
            ...searchParams,
            createdAtStart: dateRange.start,
            createdAtEnd: dateRange.end,
            sort: 'createdAt,desc'
        };

        fetchNewArrivalsList(0, params);
    }, [dateRange, searchParams.sort, fetchNewArrivalsList]);

    // 도서 상세 페이지 이동 함수
    const handleViewBook = (bookId) => {
        navigate(URL.BOOK_VIEW(bookId));
    }

    //페이지 변경 핸들러
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            fetchNewArrivalsList(newPage);
            window.scrollTo(0, 0);
        }
    };

    const handleMonthChange = (offset) => {
        const newDate = new Date(selectedDate.setMonth(selectedDate.getMonth() + offset));
        setSelectedDate(new Date(newDate));
    };

    return {
        arrivals,
        status: {
            loading,
            totalElements,
            totalPages,
            currentPage,
            selectedDate
        },
        handlers: {
            handleViewBook,
            handlePageChange,
            handleMonthChange
        }
    }
}