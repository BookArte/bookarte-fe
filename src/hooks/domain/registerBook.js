import { useState } from "react";
import { useForm } from "../form/useForm";
import { registerBookAPI, searchBooksWithAPi } from "../../api/book.api";
import { toast } from "react-toastify";

export function registerBook() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false); // 로딩 상태

    const { form, handleChange, setField } = useForm({
        bookTitle: '',
        bookAuthor: '',
        bookTranslator: '',
        publisherName: '',
        publicationDate: '',
        bookIsbn: '',
        bookContents: '',
        bookThumbnail: '',
        bookCallNumber: '',
        bookCategory: ''
    });

    // 검색 API 호출
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        try {
            const res = await searchBooksWithAPi(searchQuery);
            setSearchResults(res.data || []);
        } catch (error) {
            console.error("검색 중 오류 발생:", error);
            alert("도서 정보를 가져오는데 실패했습니다.");
        } finally {
            setIsSearching(false);
        }
    };

    // 도서 선택 시 폼 매핑
    const handleSelectBook = (book) => {
        const bookData = {
            bookTitle: book.bookTitle || '',
            bookAuthor: book.bookAuthor || '',
            bookTranslator: book.bookTranslator || '',
            publisherName: book.publisherName || '',
            // ISO 날짜(2019-09-02T00:00:00)에서 날짜 부분(yyyy-MM-dd)만 추출
            publicationDate: book.publicationDate ? book.publicationDate.split('T')[0] : '',
            bookIsbn: book.bookIsbn || '',
            bookContents: book.bookContents || '',
            bookThumbnail: book.bookThumbnail || '',
            bookCategory: book.bookCategory || ''
        };

        Object.entries(bookData).forEach(([fieldName, value]) => {
            setField(fieldName, value);
        });

        setSearchResults([]); // 검색 결과 레이어 닫기
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await registerBookAPI(form);
            toast.success(res.data);
        } catch (error) {
            toast.error("도서 등록 중 오류가 발생했습니다.");
        }
    };

    return {
        search: {
            searchQuery, setSearchQuery,
            searchResults,
            isSearching,
        },
        form: {
            form,
        },
        handlers: {
            handleChange,
            handleSearch,
            handleSelectBook,
            handleSubmit
        }
    };
}