import { useCallback, useEffect, useMemo, useState } from "react";
import { getAllBookList, getLatestBookRegistrationDate } from "@/api/book.api";
import { useNavigate } from "react-router-dom";
import URL from '@/constants/url';
import { useDataFetch } from "@/hooks/utils/useDataFetch";
import { useBookList } from "../useBookList";

export function useNewArrivalsList() {
    const TYPE = 'newArrivals';
    const [selectedDate, setSelectedDate] = useState(new Date());

    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];

    const {
        books: arrivals,
        status: baseStatus,
        params,
        handlers: baseHandlers,
        pagination,
        getVirtualNumber
    } = useBookList({
        type: TYPE,
        fetchFn: getAllBookList,
        initialParams: {
            createdAtStart: start,
            createdAtEnd: end,
            sort: 'createdAt,desc'
        }
    });

    useEffect(() => {
        const fetchLatestDate = async () => {
            try {
                const res = await getLatestBookRegistrationDate();
                if (res.success) {
                    setSelectedDate(new Date(res.data));
                }
            } catch (error) {
                setSelectedDate(new Date());
                handleApiError(error, "최신 등록일 로드 실패");
            }
        };
        fetchLatestDate();
    }, []);

    const dateRange = useMemo(() => {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();


        const formatDate = (date) => {
            const offset = date.getTimezoneOffset() * 60000;
            const localISOTime = new Date(date - offset).toISOString().split('T')[0];
            return localISOTime;
        };

        const start = new Date(year, month, 1);
        const end = new Date(year, month + 1, 0);

        return {
            start: formatDate(start),
            end: formatDate(end)
        };
    }, [selectedDate]);


    useEffect(() => {
        const newArrivalParams = {
            ...params.searchParams,
            createdAtStart: dateRange.start,
            createdAtEnd: dateRange.end
        };
        baseHandlers.fetchBooks(0, newArrivalParams);
    }, [dateRange, baseHandlers.fetchBooks]);

    const handleMonthChange = useCallback((offset) => {
        setSelectedDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() + offset);
            return newDate;
        });
    }, []);

    return {
        arrivals,
        status: {
            ...baseStatus,
            selectedDate,
            total: baseStatus.total || 0
        },
        params,
        pagination,
        getVirtualNumber,
        handlers: {
            ...baseHandlers,
            handleMonthChange,
        }
    };
}