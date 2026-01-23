import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookDetailByBookId, updateBookByBookId, } from "../../../api/book.api";
import { toast } from "react-toastify";
import { useForm } from "../../form/useForm";
import { validateBookForm } from "../../../utils/validation/book.validation";

export function useUpdate() {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [fieldErrors, setFieldErrors] = useState({});

    const { form: bookForm, handleChange, setField: setBookForm } = useForm({
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
    })


    useEffect(() => {
        const getBookDetailHandler = async () => {
            try {
                const res = await getBookDetailByBookId(bookId);
                if (res.success) {
                    const data = res.data;
                    Object.entries(data).forEach(([fieldName, value]) => {
                        setBookForm(fieldName, value);
                    });
                }
            } catch (error) {
                console.error("상세 정보 로딩 실패:", error);
                toast.error(error.data);
            } finally {
                setLoading(false);
            }
        };

        getBookDetailHandler();
    }, [bookId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFieldErrors({});

        // 클라이언트 측 검증
        const clientErrors = validateBookForm(bookForm);
        if (Object.keys(clientErrors).length > 0) {
            setFieldErrors(clientErrors);
            toast.error("입력한 도서 정보를 다시 확인해주세요.");
            return;
        }

        try {
            const res = await updateBookByBookId(bookId, bookForm);
            toast.success(res.data);
            navigate(`/book/view/${bookId}`);

        } catch (error) {
            const serverError = error.response.data;
            if (serverError && serverError.code === 400 && serverError.data) {
                const newFieldErrors = {};
                const errorPairs = serverError.data.split(', ');
                errorPairs.forEach(pair => {
                    const [field, message] = pair.split(': ');
                    if (field && message) {
                        newFieldErrors[field.trim()] = message.trim();
                    }
                });
                setFieldErrors(newFieldErrors);
                toast.error("입력한 도서 정보를 다시 확인해주세요.");
            }
            toast.error("입력한 도서 정보를 다시 확인해주세요.");
        }
    }

    const handleCancel = () => {
        window.history.back();
    }

    return {
        loading,
        bookForm,
        fieldErrors,
        handlers: {
            handleChange,
            handleSubmit,
            handleCancel
        }
    };


}