import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyBorrowList } from "../../../api/borrow.api";
import URL from '@/constants/url';

export function useMyBorrowList() {
    const [borrows, setBorrows] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchMyBorrows = async () => {
        setLoading(true);
        try {
            const res = await getMyBorrowList();
            console.log(res.data)
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

    const handleExtend = async () => {
        //대출 연장 로직
    }
    const handleReturnRequest = async () => {
        //반납 요청 로직
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