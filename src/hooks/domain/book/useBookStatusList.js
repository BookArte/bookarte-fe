import { useEffect, useState } from "react";
import { getAllBookList } from "../../../api/book.api";
import { toast } from "react-toastify";
import { getCategoryList } from "../../../api/category.api";
import URL from '@/constants/url';
import { useNavigate } from "react-router-dom";

export function useBookStatusList() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [categories, setCategories] = useState([]);
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



    const fetchBooks = async (page = 0) => {
        setLoading(true);
        try {
            const res = await getAllBookList({
                params: { ...searchParams, page }
            });
            if (res.success) {
                setBooks(res.data.content);
                setTotalPages(res.data.totalPages);
                setCurrentPage(res.data.number);
            }
        } finally {
            setLoading(false);
        }
    };

    // 카테고리 목록 조회 함수
    const fetrcCategories = async () => {
        try {
            const res = await getCategoryList();
            if (res.success) setCategories(res.data);
        } catch (error) {
            toast.error("카테고리 목록을 불러오는 중 오류가 발생했습니다.");
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

    useEffect(() => {
        fetchBooks();
        fetrcCategories();
    }, [searchParams]);

    const handlePageChange = (page) => {
        if (page >= 0 && page < totalPages) {
            fetchBooks(page);
            window.scrollTo(0, 0);
        }
    };

    const navigate = useNavigate();

    // 도서 상세 페이지 이동 함수
    const handleViewBook = (bookId) => {
        navigate(URL.BOOK_VIEW(bookId));
    }

    return {
        books,
        categories,
        status: {
            loading,
            totalPages,
            currentPage
        },
        handlers: {
            handlePageChange,
            handleReset,
            handleViewBook
        }
    };

}   