import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBookByBookId, getBookDetailByBookId } from "@/api/book.api";
import { handleApiError } from "@/hooks/utils/errorHandler";
import URL from "@/constants/url";

export function useBookDelete() {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [fetching, setFetching] = useState(true);
    const [loading, setLoading] = useState(false);

    // 삭제 사유를 포함하여 초기 폼 데이터 설정
    const [formData, setFormData] = useState({ delReason: '' });
    const [errors, setErrors] = useState({ fieldErrors: {} });

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await getBookDetailByBookId(bookId);
                if (res.success) {
                    setFormData(prev => ({
                        ...prev,
                        ...res.data,
                        delReason: '' // 기존 데이터에 delReason 필드 추가
                    }));
                }
            } catch (error) {
                handleApiError(error, "도서 상세 조회 실패");
            } finally {
                setFetching(false);
            }
        };

        fetchDetail();
    }, [bookId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // 에러 메시지 초기화
        if (errors.fieldErrors[name]) {
            setErrors(prev => ({
                fieldErrors: { ...prev.fieldErrors, [name]: '' }
            }));
        }
    };

    const handleCancel = () => {
        window.history.back();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.delReason || formData.delReason.trim() === '') {
            setErrors({ fieldErrors: { delReason: '삭제 사유를 입력해주세요.' } });
            return;
        }

        setLoading(true);
        try {
            // 삭제 시 필요한 데이터만 전송 (delReason)
            const submitData = { delReason: formData.delReason };
            const res = await deleteBookByBookId(bookId, submitData);
            if (res.success) {
                navigate(URL.BOOK_STATUS);
            }
        } catch (error) {
            handleApiError(error, "도서 삭제 실패");
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        loading,
        errors,
        handlers: {
            handleChange,
            handleSubmit,
            handleCancel
        },
        refs: {}, // DeleteBook.jsx에 넘겨줄 빈 refs
        fetching
    };
}