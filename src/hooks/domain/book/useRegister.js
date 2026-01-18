import { useState } from "react";
import { useForm } from "../../form/useForm";
import { registerBookByAdmin, searchBooksWithAPi } from "../../../api/book.api";
import { toast } from "react-toastify";

export function useRegister() {
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
            toast.error("도서 검색 중 오류가 발생했습니다.");
        } finally {
            setIsSearching(false);
        }
    };

    // 도서 선택 시 폼 매핑
    const handleSelectBook = (book) => {
        Object.entries(book).forEach(([fieldName, value]) => {
            setField(fieldName, value);
        });

        setSearchResults([]); // 검색 결과 레이어 닫기
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await registerBookByAdmin(form);
            toast.success(res.data);
        } catch (error) {
            toast.error("도서 등록 중 오류가 발생했습니다.");
        }
    };

    const handleCancel = () => {
        window.history.back();
    }

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
            handleSubmit,
            handleCancel
        }
    };
}