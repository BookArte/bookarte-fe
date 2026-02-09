import { useEffect, useMemo, useState } from "react";
import { getAllBorrowList } from "../../../api/borrow.api";

export function useBorrowDashboard() {
    const [borrow, setBorrow] = useState({
        content: [],
        totalElements: 0,
        number: 0,
        totalPages: 0
    })

    const [loading, setLoading] = useState(true);

    const fetchBorrows = async () => {
        setLoading(true);
        try {
            const res = await getAllBorrowList();
            console.log(res.data)
            setBorrow(res.data);
        } catch (error) {
            console.error("대출 현황 목록 로드 실패:", error);
            toast.error("대출 현황 목록을 불러오는데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBorrows();
    }, []);

    const stats = useMemo(() => {
        const content = borrow.content || [];
        return {
            totalElements: borrow.totalElements,
            overdueCount: content.filter(item => item.overdue).length,
            pendingReturns: content.filter(item => item.status === 'RETURNED' && !item.returnDate).length
        }
    }, [borrow]);

    const handleApprove = async (borrowId) => {
        if (!window.confirm("반납 승인 처리를 하시겠습니까?")) return;
        // 반납승인 api 추후 추가
        toast.success("반납 승인이 완료되었습니다.");
        fetchBorrows();
    };

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
        borrow,
        stats,
        loading,
        handleApprove,
        getStatusConfig
    }

}