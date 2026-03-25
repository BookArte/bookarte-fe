import { useEffect, useMemo, useState } from "react";
import { getAllBookList, getLatestBookRegistrationDate } from "../../../api/book.api";
import { useNavigate } from "react-router-dom";
import URL from '@/constants/url';
import { useDataFetch } from "../../utils/useDataFetch";

export function useNewArrivalsList() {
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
                handleApiError(error, "신착 도서 로드 실패")
            }
        };

        latestDate();
    }, []);

    const {
        data: arrivals,
        status,
        fetchData
    } = useDataFetch(getAllBookList);

    const { loading, totalElements, currentPage, totalPages } = status;


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

        fetchData(0, params);
    }, [dateRange, searchParams.sort, fetchData]);

    // 도서 상세 페이지 이동 함수
    const handleViewBook = (bookId) => {
        navigate(URL.BOOK_VIEW(bookId));
    }

    //페이지 변경 핸들러
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            fetchData(newPage);
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