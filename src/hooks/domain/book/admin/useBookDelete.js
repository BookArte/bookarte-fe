import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { deleteBookByBookId, updateDelReasonByBookId, getBookDetailByBookId } from "@/api/book.api";
import { handleApiError } from "@/hooks/utils/errorHandler";
import URL from "@/constants/url";
import { toast } from "react-toastify";

const isDeletedBookData = (bookData) => Boolean(
    bookData?.deletedAt ||
    bookData?.deleted ||
    (bookData?.delReason && bookData.delReason.trim() !== '')
);

export function useBookDelete() {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // location.state에서 넘겨받은 도서 데이터 확인
    const transferredBookData = location.state?.bookData || location.state?.book || null;

    const [fetching, setFetching] = useState(!transferredBookData);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState(() => {
        if (transferredBookData) {
            return {
                ...transferredBookData,
                delReason: transferredBookData.delReason || ''
            };
        }
        return { delReason: '' };
    });
    const [errors, setErrors] = useState({ fieldErrors: {} });

    // 이미 삭제된 도서인지 확인
    const [isAlreadyDeleted, setIsAlreadyDeleted] = useState(() => {
        return isDeletedBookData(transferredBookData);
    });
    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await getBookDetailByBookId(bookId);
                if (res.success) {
                    const fetchedData = res.data;
                    setFormData(prev => ({
                        ...prev,
                        ...fetchedData,
                        delReason: fetchedData.delReason || prev.delReason || ''
                    }));

                    setIsAlreadyDeleted(isDeletedBookData(fetchedData));
                }
            } catch (error) {
                if (!transferredBookData) {
                    handleApiError(error, "도서 상세 조회 실패");
                }
            } finally {
                setFetching(false);
            }
        };

        fetchDetail();
    }, [bookId, transferredBookData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

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
            const submitData = { delReason: formData.delReason };

            if (isAlreadyDeleted) {
                // 이미 삭제된 도서 -> 삭제 사유 수정 API (PATCH)
                const res = await updateDelReasonByBookId(bookId, submitData);
                if (res.success) {
                    toast.success("도서 삭제 사유가 수정되었습니다.");
                    navigate(URL.BOOK_DELETED);
                }
            } else {
                // 미삭제 도서 -> 신규 도서 삭제 API (DELETE)
                const res = await deleteBookByBookId(bookId, submitData);
                if (res.success) {
                    toast.success("도서가 성공적으로 삭제되었습니다.");
                    navigate(URL.BOOK_STATUS);
                }
            }
        } catch (error) {
            handleApiError(error, isAlreadyDeleted ? "삭제 사유 수정 실패" : "도서 삭제 실패");
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
        refs: {},
        fetching,
        isAlreadyDeleted,
    };
}
