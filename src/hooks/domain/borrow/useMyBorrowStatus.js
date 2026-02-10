import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { extendBorrow, getMyBorrowList, sendReturnRequest } from "../../../api/borrow.api";
import URL from '@/constants/url';
import { toast } from "react-toastify";

export function useMyBorrowList() {
    const [borrows, setBorrows] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchMyBorrows = async () => {
        setLoading(true);
        try {
            const res = await getMyBorrowList();
            setBorrows(res.data.content);
        } catch (error) {
            toast.error("대출 현황을 불러오지 못했습니다.");
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
            console.log(error);
            toast.error(error.data);
        }
    }
    const handleReturnRequest = async (borrowId) => {
        try {
            const res = await sendReturnRequest(borrowId);
            toast.success(res.data);
            fetchMyBorrows();
        } catch (error) {
            console.log(error);
            toast.error(error.data);
        }
    }

    const handleViewBook = (bookId) => {
        navigate(URL.BOOK_VIEW(bookId));
    }

    const getStatusConfig = (status) => {
        switch (status) {
            case 'BORROWED':
                return { label: '대출 중', className: 'status-badge blue' };
            case 'RETURN_REQUESTED':
                return { label: '반납 신청', className: 'status-badge orange' };
            case 'RETURNED':
                return { label: '반납 완료', className: 'status-badge gray' };
            default:
                return { label: status, className: 'status-badge' };
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