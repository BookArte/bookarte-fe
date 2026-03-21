import { useEffect, useMemo, useState } from "react";
import { approveReturn, getAllBorrowList } from "../../../api/borrow.api";
import { toast } from "react-toastify";
import { handleApiError } from "../../utils/errorHandler";

export function useBorrowDashboard() {
    const [borrow, setBorrow] = useState({
        content: [],
        totalElements: 0,
        number: 0,
        totalPages: 0
    })

    const [loading, setLoading] = useState(true);

    const [searchParams, setSearchParams] = useState({
        bookId: '',
        status: '',
        statusNot: 'RETURNED',
        isOverdue: '',
        startDate: '',
        endDate: '',
        searchKeyword: '',
    });
    const fetchBorrows = async () => {

        setLoading(true);
        try {
            const res = await getAllBorrowList({ params: { ...searchParams } });
            setBorrow(res.data);
        } catch (error) {
            handleApiError(error, "대출 중인 도서 상황 목록 로드 실패")
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBorrows();
    }, [searchParams]);

    const stats = useMemo(() => {
        const content = borrow.content || [];
        return {
            totalElements: borrow.totalElements,
            overdueCount: content.filter(item => item.overdue).length,
            pendingReturns: content.filter(item => item.status === 'RETURN_REQUESTED' && !item.returnDate).length
        }
    }, [borrow]);

    const handleApprove = async (borrowId) => {
        if (!window.confirm("반납 승인 처리를 하시겠습니까?")) return;
        const res = await approveReturn(borrowId);
        toast.success(res.data);
        fetchBorrows();
    };

    const handleFilterChange = (filterType) => {
        setSearchParams(prev => {
            const baseParams = {
                ...prev,
                status: '',
                isOverdue: '',
                statusNot: 'RETURNED',
                page: 0
            };

            switch (filterType) {
                case 'PENDING':
                    return { ...baseParams, status: 'RETURN_REQUESTED' };
                case 'OVERDUE':
                    return { ...baseParams, isOverdue: true };
                case 'ALL':
                default:
                    return baseParams;
            }
        })
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
            case 'RETURNED':
                return { label: '반납 완료', className: 'status-badge gray' };
            case 'OVERDUE':
                return { label: '연체', className: 'status-badge red' };
            default:
                return { label: item.status, className: 'status-badge' };
        }
    };


    return {
        borrow,
        stats,
        loading,
        handlers: {
            handleApprove,
            handleFilterChange
        },

        getStatusConfig
    }

}