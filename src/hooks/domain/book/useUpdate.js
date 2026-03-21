import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookDetailByBookId, updateBookByBookId, } from "../../../api/book.api";
import { toast } from "react-toastify";
import { useForm } from "../../form/useForm";
import { validateBookForm } from "../../../utils/validation/book.validation";
import { handleFormSubmission } from "../../form/handleFormSubmisson";

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
        fetchBookDetail();
    }, [bookId]);

    const fetchBookDetail = async () => {
        try {
            const res = await getBookDetailByBookId(bookId);
            if (res.success) {
                const data = res.data;
                Object.entries(data).forEach(([fieldName, value]) => {
                    setBookForm(fieldName, value);
                });
            }
        } catch (error) {
            handleApiError(error, "도서 상세 정보 로드 실패")
        } finally {
            setLoading(false);
        }

    }

    const handleSubmit = async (e) => {
        const { bookId: _, ...updateData } = bookForm;
        await handleFormSubmission({
            e,
            form: updateData,
            validateFunc: validateBookForm,
            apiFunc: (data) => updateBookByBookId(bookId, data),
            onSuccess: () => navigate(-1),
            setFieldErrors,
        });
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