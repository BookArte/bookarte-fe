import { useNavigate } from "react-router-dom";
import URL from '@/constants/url';
import { getMyBorrowList } from "@/api/borrow.api";
import { useBoardList } from "@/hooks/domain/common/useBoardList";

export function useMyBorrowHistory() {
    const navigate = useNavigate();

    const fetchReturnedBorrowHistory = async (_, params) => {
        const res = await getMyBorrowList({ params });

        return {
            ...res,
            data: {
                ...res.data,
                currentPage: res.data.currentPage ?? res.data.number ?? 0,
            },
        };
    };

    const {
        data,
        loading,
        pagination,
        getVirtualNumber
    } = useBoardList({
        type: 'borrow',
        fetchFn: fetchReturnedBorrowHistory,
        idKey: 'borrowId',
        initialParams: {
            status: 'RETURNED',
            size: 10,
            sort: 'createdAt,desc'
        }
    });


    const handleView = (bookId) => {
        navigate(URL.BOOK_VIEW(bookId));
    }

    return {
        data,
        status: {
            loading,
            ...pagination,
        },
        handlers: {
            ...pagination,
            handleView: handleView,
        },
        getVirtualNumber
    };
}

