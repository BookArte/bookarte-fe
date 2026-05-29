import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import URL from '@/constants/url';
import { getCategoryList } from "../../../api/category.api";
import { useDataFetch } from "../../utils/useDataFetch";

export function useBookList({
    type,
    fetchFn,
    idKey = 'id',
    initialParams = {}
}) {
    const navigate = useNavigate();
    const location = useLocation();

    const [isDetailOpen, setIsDetailOpen] = useState(false); // 상세검색 패널 열림 상태

    const savedPage = Number(sessionStorage.getItem(`${type}_page`)) || 0;

    const transferredState = location.state || {};
    const [searchParams, setSearchParams] = useState({
        bookTitle: '',
        bookAuthor: '',
        publisherName: '',
        bookIsbn: '',
        category: '',
        publicationDateStart: '',
        publicationDateEnd: '',
        size: 10,
        sort: 'createdAt,desc',
        ...initialParams,
        bookTitle: transferredState.bookTitle || ''
    });

    const [appliedParams, setAppliedParams] = useState(searchParams);

    // 도서 목록 조회
    const {
        data: books,
        status,
        fetchData: fetchBooks
    } = useDataFetch(fetchFn);

    const { loading, totalElements, currentPage, totalPages } = status;

    //카테고리 목록 조회
    const {
        data: categories,
        fetchData: fetchCategories
    } = useDataFetch(getCategoryList)

    useEffect(() => {
        fetchCategories();
    }, [searchParams.sort]);

    useEffect(() => {
        fetchBooks(0, searchParams);

        if (location.state) {
            navigate(location.pathname, { replace: true, state: null });
        }
    }, []);

    const handleSearch = () => {
        fetchBooks(0, searchParams);
    };

    // 초기화 함수
    const handleReset = () => {
        setSearchParams({
            bookTitle: '',
            bookAuthor: '',
            publisherName: '',
            bookIsbn: '',
            publicationDateStart: '',
            publicationDateEnd: '',
            category: '',
            size: 10,
            sort: 'createdAt,desc'
        });
    };

    // 날짜 입력창 자동 포커스 이동 함수
    const handleDateChange = (e, field) => {
        const value = e.target.value;
        setSearchParams({ ...searchParams, [field]: value });

        const yearPart = value.split('-')[0];

        if (yearPart.length === 4 && !isNaN(yearPart)) {
            const event = new KeyboardEvent('keydown', {
                key: 'ArrowRight',
                code: 'ArrowRight',
                keyCode: 39,
                bubbles: true
            });
            e.target.dispatchEvent(event);
        }
    }

    // 도서 상세 페이지 이동 함수
    const handleViewBook = (bookId) => {
        navigate(URL.BOOK_VIEW(bookId));
    }

    //페이지 변경 핸들러
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            fetchBooks(newPage);
            window.scrollTo(0, 0);
        }
    };

    return {
        books,
        categories,
        params: {
            searchParams,
            setSearchParams,
        },
        status: {
            loading,
            isDetailOpen,
            setIsDetailOpen,
            totalElements,
        },
        handlers: {
            fetchBooks,
            handleReset,
            handleViewBook,
            handleDateChange,
            handlePageChange,
            handleSearch
        },
        pagination: {
            currentPage,
            totalPages,
            handlePageChange
        },
        getVirtualNumber: (index) => {
            return totalElements - (currentPage * searchParams.size) - index;
        },
    };
}   