import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBookList } from "../../../api/book.api";
import URL from '@/constants/url';

export function useBookList() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalElements, setTotalElements] = useState(0);
    const navigate = useNavigate();

    const [isDetailOpen, setIsDetailOpen] = useState(false); // 상세검색 패널 열림 상태
    const [searchParams, setSearchParams] = useState({
        bookTitle: '',
        bookAuthor: '',
        publisherName: '',
        bookIsbn: '',
        sort: 'createdAt,desc'
    });


    useEffect(() => {
        fetchBooks();
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



    const handleViewBook = (bookId) => {
        navigate(URL.BOOK_VIEW(bookId));
    }

    return {
        books,
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
            handleViewBook
        },


    };
}   