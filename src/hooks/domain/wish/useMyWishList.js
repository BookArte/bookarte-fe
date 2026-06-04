import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import URL from '@/constants/url';
import { getWishList } from "../../../api/wish.api";
import { useBoardList } from "../common/useBoardList";

export function useMyWishList() {
    const navigate = useNavigate();

    const fetchWishList = async () => {
        const res = await getWishList();

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
        type: 'wish',
        fetchFn: fetchWishList,
        idKey: 'wishId',
        initialParams: {
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