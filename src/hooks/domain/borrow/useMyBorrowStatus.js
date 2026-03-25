import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { extendBorrow, getMyBorrowList, sendReturnRequest } from "../../../api/borrow.api";
import URL from '@/constants/url';
import { toast } from "react-toastify";
import { handleApiError } from "../../utils/errorHandler";

export function useMyBorrowList() {
    const [borrows, setBorrows] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [searchParam, setSearchParam] = useState({
        bookId: '',
        status: '',
        statusNot: 'RETURNED',
        isOverdue: '',
        startDate: '',
        endDate: '',
        searchKeyword: '',
    });

    const fetchMyBorrows = async () => {
        setLoading(true);
        try {
            const res = await getMyBorrowList({ params: { ...searchParam } });
            setBorrows(res.data.content);
        } catch (error) {
            handleApiError(error, "대출 중 도서 목록 로드 실패")
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyBorrows();
    }, []);

    const handleExtend = async (borrowId) => {
        try {
            const res = await extendBorrow(borrowId);
            toast.success(res.data);
            fetchMyBorrows();
        } catch (error) {
            handleApiError(error, "도서 대출 연장 실패")

        }
    }
    const handleReturnRequest = async (borrowId) => {
        try {
            const res = await sendReturnRequest(borrowId);
            toast.success(res.data);
            fetchMyBorrows();
        } catch (error) {
            handleApiError(error, "반납 요청 실패")
        }
    }

    const handleViewBook = (bookId) => {
        navigate(URL.BOOK_VIEW(bookId));
    }


    const getStatusConfig = (item) => {

        if (item.overdue) {
            return {
                label: `연체 ${item.overdueDays}일`,
                className: 'status-badge red'
            };
        }

        switch (item.status) {
            case 'BORROWED':
                return { label: '대출 중', className: 'status-badge blue' };
            case 'RETURN_REQUESTED':
                return { label: '반납 신청', className: 'status-badge orange' };
            case 'OVERDUE':
                return { label: '연체', className: 'status-badge red' };
            default:
                return { label: item.status, className: 'status-badge' };
        }
    };

    return {
        borrows,
        loading,
        getStatusConfig,
        handlers: {
            handleExtend,
            handleReturnRequest,
            handleViewBook
        }

    }
}