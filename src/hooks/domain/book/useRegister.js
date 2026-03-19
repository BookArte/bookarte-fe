import { useRef, useState } from "react";
import { useForm } from "../../form/useForm";
import { registerBookByAdmin, searchBooksWithAPi, checkBookDuplicate } from "../../../api/book.api";
import { validateBookForm } from "../../../utils/validation/book.validation";
import { handleFormSubmission } from "../../form/handleFormSubmisson";

export function useRegister() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false); // 로딩 상태
    const searchInputRef = useRef(null);

    const [duplicateError, setDuplicateError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});

    //초기 폼
    const initForm = {
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
    }

    const { form, handleChange, setField } = useForm({ initForm });

    // 검색 API 호출
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        try {
            const res = await searchBooksWithAPi(searchQuery);
            setSearchResults(res.data || []);
        } catch (error) {
            handleApiError(error, "도서 검색 실패")
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
            handleApiError(error, "도서 선택 실패")
        }
    };

    // 도서 중복 체크
    const handleDuplicateCheck = async (isbn) => {
        try {
            const res = await checkBookDuplicate(isbn);
            return res.data;
        } catch (error) {
            handleApiError(error, "도서 중복 체크 실패")
        }
    };

    const resetAllFields = () => {
        Object.entries(initForm).forEach(([key, value]) => {
            setField(key, value);
        });
        setSearchQuery('');
        setSearchResults([]);
        // 검색창으로 포커스 이동
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }

    // 도서 등록 제출
    const handleSubmit = async (e) => {
        await handleFormSubmission({
            e,
            form,
            validateFunc: validateBookForm,
            apiFunc: registerBookByAdmin,
            onSuccess: () => {
                resetAllFields();
            },
            setFieldErrors
        });
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
            searchInputRef
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