import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookDetail, updateBookByAdmin } from "../../api/book.api";
import { toast } from "react-toastify";
import { useForm } from "../form/useForm";

export function updateBook() {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

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
                const res = await getBookDetail(bookId);
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
        try {
            const res = await updateBookByAdmin(bookId, bookForm);
            toast.success(res.data);
            navigate(`/book/view/${bookId}`);

        } catch (error) {
            toast.error(error.data);
        }
    }

    return {
        loading,
        bookForm,

        handlers: {
            handleChange,
            handleSubmit
        }
    };


}