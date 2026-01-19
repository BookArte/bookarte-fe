import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBookList } from "../../../api/book.api";
import URL from '@/constants/url';
import { toast } from "react-toastify";
import { getCategoryList } from "../../../api/category.api";

export function useBookList() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalElements, setTotalElements] = useState(0);
    const [categories, setCategories] = useState([]);
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
        sort: 'createdAt,desc'
    });


    useEffect(() => {
        fetchBooks();
        fetrcCategories();
    }, [searchParams.sort]);

    // 검색 실행 함수
    const fetchBooks = async () => {
        setLoading(true);
        try {
            const res = await getAllBookList({
                params: { ...searchParams, size: 20 }
            });
            if (res.success) setBooks(res.data.content);
        } finally {
            setLoading(false);
        }
    };

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
            sort: 'createdAt,desc'
        });
    };

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


    const handleViewBook = (bookId) => {
        navigate(URL.BOOK_VIEW(bookId));
    }

    return {
        books,
        categories,
        searchParams,
        setSearchParams,
        status: {
            loading,
            totalElements,
            isDetailOpen,
            setIsDetailOpen
        },
        searchParams,
        handlers: {
            fetchBooks,
            handleReset,
            handleViewBook,
            handleDateChange
        },


    };
}   