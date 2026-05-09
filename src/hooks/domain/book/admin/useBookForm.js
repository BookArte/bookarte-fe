import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "@/hooks/form/useForm";
import { searchBooksWithAPi, checkBookDuplicate } from "@/api/book.api";
import { validateBookForm } from "@/utils/validation/book.validation";
import { handleFormSubmission } from "@/hooks/form/handleFormSubmisson";
import { toast } from "react-toastify";
import { handleApiError } from "@/hooks/utils/errorHandler";
import DOMPurify from "dompurify";

export function useBookForm({
    submitFn,
    initialData = null,
    isEdit = false
}) {
    const navigate = useNavigate();
    const thumbnailInputRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false); // 로딩 상태
    const searchInputRef = useRef(null);

    const [duplicateError, setDuplicateError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [thumbnailFile, setThumbnailFile] = useState(null);

    //초기 폼
    const initForm = {
        bookTitle: '',
        bookAuthor: '',
        bookTranslator: '',
        publisherName: '',
        publicationDate: '',
        bookIsbn: '',
        bookContents: '',
        editor: '',
        bookThumbnail: '',
        bookCallNumber: '',
        bookCategory: ''
    }

    const [formData, setFormData] = useState({ initForm });

    useEffect(() => {
        if (isEdit && initialData) {
            setFormData(prev => ({
                ...prev,
                ...initialData,
                // 서버에서 넘어오는 데이터가 bookContents 필드에 있다면 에디터에 매핑
                editor: initialData.bookContents || ""
            }));
        }
    }, [isEdit, initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const setField = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEditorChange = (editor) => {
        setFormData(prev => ({ ...prev, editor }));
    };

    const onThumbnailClick = () => {
        thumbnailInputRef.current?.click();
    };

    // 파일 선택 시 처리
    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnailFile(file); // 서버 전송용 파일 저장
            setField('bookThumbnail', URL.createObjectURL(file)); // 미리보기용 임시 URL
        }
    };

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

            setThumbnailFile(null);
            const contentsValue = book.bookContents || '';
            const cleanContents = DOMPurify.sanitize(contentsValue);

            setFormData(prev => ({
                ...prev,
                ...book,
                editor: cleanContents,
                bookContents: cleanContents
            }));
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
        e.preventDefault();

        const sendData = new FormData();

        const requiredFields = [
            'bookTitle',
            'bookAuthor',
            'publisherName',
            'publicationDate',
            'bookIsbn',
            'bookCategory',
            'bookCallNumber',
            'bookContents',
            'bookThumbnail'
        ];

        requiredFields.forEach(key => {
            const value = formData[key];
            if (value !== null && value !== undefined) {
                sendData.append(key, value);
            }
        });


        if (thumbnailFile) {
            sendData.append('bookThumbnailFile', thumbnailFile);
        }
        await handleFormSubmission({
            e,
            form: sendData,
            validateFunc: validateBookForm,
            apiFunc: submitFn,
            onSuccess: () => {
                resetAllFields();
            },
            setFieldErrors
        });
    };

    const handleCancel = () => {
        window.history.back();
    };

    return {
        search: {
            searchQuery, setSearchQuery,
            searchResults,
            isSearching,
        },
        formData,
        loading,
        errors: {
            duplicateError,
            fieldErrors
        },
        refs: {
            thumbnailInputRef,
            searchInputRef
        },
        handlers: {
            onThumbnailClick,
            handleThumbnailChange,
            handleSearch,
            handleSelectBook,
            handleSubmit,
            handleCancel,
            handleChange,
            handleEditorChange
        }
    };
}
