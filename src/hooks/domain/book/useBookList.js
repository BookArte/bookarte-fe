import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBookList } from "../../../api/book.api";
import URL from '@/constants/url';
import { toast } from "react-toastify";
import { getCategoryList } from "../../../api/category.api";
import { handleApiError } from "../../utils/errorHandler";

export function useBookList() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalElements, setTotalElements] = useState(0);
    const [categories, setCategories] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const navigate = useNavigate();

    const [isDetailOpen, setIsDetailOpen] = useState(false); // 상세검색 패널 열림 상태
    const [searchParams, setSearchParams] = useState({
        bookTitle: '',
        bookAuthor: '',
        publisherName: '',
        bookIsbn: '',
        category: '',
        publicationDateStart: '',
        publicationDateEnd: '',
        size: 10,
        sort: 'createdAt,desc'
    });

    useEffect(() => {
        fetchBooks();
        fetrcCategories();
    }, [searchParams.sort]);

    // 검색 실행 함수
    const fetchBooks = async (page = 0) => {
        setLoading(true);
        try {
            const res = await getAllBookList({
                params: { ...searchParams, page }
            });
            if (res.success) {
                setBooks(res.data.content);
                setTotalElements(res.data.totalElements);
                setTotalPages(res.data.totalPages);
                setCurrentPage(res.data.number);
            }
        } catch (error) {
            handleApiError(error, "도서 목록 로드 실패")
        }
        finally {
            setLoading(false);
        }
    };

    // 카테고리 목록 조회 함수
    const fetrcCategories = async () => {
        try {
            const res = await getCategoryList();
            if (res.success) setCategories(res.data);
        } catch (error) {
            handleApiError(error, "카테고리 로드 실패");
        }
    }

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
            totalElements,
            isDetailOpen,
            setIsDetailOpen,
            totalPages,
            currentPage,
        },
        searchParams,
        handlers: {
            fetchBooks,
            handleReset,
            handleViewBook,
            handleDateChange,
            handlePageChange,
        },


    };
}   