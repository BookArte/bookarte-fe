import { useEffect, useState } from "react";
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
    const [stats, setStats] = useState({
        totalElements: 0,
        pendingReturns: 0,
        overdueCount: 0
    });

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

    const fetchStats = async () => {
        const baseParams = {
            bookId: searchParams.bookId,
            statusNot: 'RETURNED',
            startDate: searchParams.startDate,
            endDate: searchParams.endDate,
            searchKeyword: searchParams.searchKeyword,
            page: 0,
            size: 1
        };

        try {
            const [allRes, pendingRes, overdueRes] = await Promise.all([
                getAllBorrowList({ params: baseParams }),
                getAllBorrowList({ params: { ...baseParams, status: 'RETURN_REQUESTED' } }),
                getAllBorrowList({ params: { ...baseParams, isOverdue: true } })
            ]);

            setStats({
                totalElements: allRes.data.totalElements || 0,
                pendingReturns: pendingRes.data.totalElements || 0,
                overdueCount: overdueRes.data.totalElements || 0
            });
        } catch (error) {
            handleApiError(error, "?異? ?듦퀎 濡쒕뱶 ?ㅽ뙣")
        }
    };

    useEffect(() => {
        fetchBorrows();
    }, [searchParams]);

    useEffect(() => {
        fetchStats();
    }, [
        searchParams.bookId,
        searchParams.statusNot,
        searchParams.startDate,
        searchParams.endDate,
        searchParams.searchKeyword
    ]);

    const handleApprove = async (borrowId) => {
        if (!window.confirm("반납 승인 처리를 하시겠습니까?")) return;
        const res = await approveReturn(borrowId);
        toast.success(res.data);
        fetchBorrows();
        fetchStats();
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
