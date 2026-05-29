import { useCallback, useState } from "react";
import { handleApiError } from "./errorHandler";

export const useDataFetch = (apiFunction) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const fetchData = useCallback(async (page = 0, extraParams = {}) => {
        setLoading(true);

        try {
            const requestParams = page !== null
                ? { ...extraParams, page: page }
                : { ...extraParams };

            const res = await apiFunction({ params: requestParams });
            if (res.success) {
                if (res.data && res.data.content) {
                    // 페이징 응답인 경우
                    setData(res.data.content);
                    setTotalPages(res.data.totalPages || 0);
                    setTotalElements(res.data.totalElements || 0);
                    setCurrentPage(res.data.number || 0);
                } else {
                    // 일반 리스트 응답인 경우
                    setData(res.data || []);
                }
            }
        } catch (error) {
            handleApiError(error, "데이터 로드 실패")
        } finally {
            setLoading(false);
        }
    }, [apiFunction])

    return {
        data,
        setData,
        status: {
            loading,
            totalElements,
            currentPage,
            totalPages
        },
        fetchData
    }
}