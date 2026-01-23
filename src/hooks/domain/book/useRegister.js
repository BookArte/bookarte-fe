import { useState } from "react";
import { useForm } from "../../form/useForm";
import { registerBookByAdmin, searchBooksWithAPi, checkBookDuplicate } from "../../../api/book.api";
import { validateBookForm } from "../../../utils/validation/book.validation";
import { toast } from "react-toastify";

export function useRegister() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false); // 로딩 상태

    const [duplicateError, setDuplicateError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});

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
    const handleSelectBook = async (book) => {
        setDuplicateError('');
        try {
            const isDuplicate = await handleDuplicateCheck(book.bookIsbn);
            if (isDuplicate) {
                setSearchResults([]);
                setDuplicateError('이미 등록된 도서입니다.');
                return;
            }
            Object.entries(book).forEach(([fieldName, value]) => {
                setField(fieldName, value || '');
            });
            setSearchResults([]); // 검색 결과 레이어 닫기
            setDuplicateError('');
        }
        catch (error) {
            console.error("도서 선택 중 오류 발생:", error);
            toast.error("도서 선택 중 오류가 발생했습니다.");
        }

    };

    // 도서 중복 체크
    const handleDuplicateCheck = async (isbn) => {
        try {
            const res = await checkBookDuplicate(isbn);
            return res.data;
        } catch (error) {
            console.error("도서 중복 체크 중 오류 발생:", error);
            toast.error("도서 중복 체크 중 오류가 발생했습니다.");
            return false;
        }
    };

    // 도서 등록 제출
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFieldErrors({});

        // 클라이언트 측 검증

        const clientErrors = validateBookForm(form);
        if (Object.keys(clientErrors).length > 0) {
            setFieldErrors(clientErrors);
            toast.error("입력한 도서 정보를 다시 확인해주세요.");
            return;
        }


        try {
            const res = await registerBookByAdmin(form);
            toast.success(res.data);
        } catch (error) {
            const serverError = error.response.data;
            if (serverError && serverError.code === 400 && serverError.data) {
                const errorPairs = serverError.data.split(', ');
                const newFieldErrors = {};
                errorPairs.forEach(pair => {
                    const [field, message] = pair.split(': ');
                    if (field && message) {
                        newFieldErrors[field.trim()] = message.trim();
                    }
                });
                setFieldErrors(newFieldErrors);
                toast.error("입력한 도서 정보를 다시 확인해주세요.");
            } else {
                toast.error("도서 등록 중 오류가 발생했습니다.");
            }
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
            duplicateError,
            fieldErrors,
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