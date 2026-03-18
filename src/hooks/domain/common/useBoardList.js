import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";

export function useBoardList({
    type,
    fetchFn,
    deleteFn,
    idKey = 'id',
    initialParams = {}
}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [selectedIds, setSelectedIds] = useState([]);
    const [searchParams, setSearchParams] = useState({
        size: 10,
        sort: 'createdAt,desc',
        ...initialParams
    });

    const fetchData = useCallback(async (page = 0) => {
        setLoading(true);
        try {
            const res = await fetchFn(type, { ...searchParams, page });
            if (res.success) {
                setData(res.data.content);
                setTotalPages(res.data.totalPages);
                setCurrentPage(res.data.currentPage);
                setTotalElements(res.data.totalElements);
            }
        } catch (error) {
            toast.error("데이터를 불러오는 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    }, [fetchFn, searchParams]);

    useEffect(() => {
        fetchData(0);
    }, [fetchData]);

    const handlePageChange = (page) => {
        if (page >= 0 && page < totalPages) {
            fetchData(page);
            window.scrollTo(0, 0);
        }
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(data.map(item => item[idKey]));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectOne = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const handleBulkDelete = async (confirmMessage) => {
        if (selectedIds.length === 0 || !deleteFn) return;

        if (window.confirm(confirmMessage || "선택한 항목을 삭제하시겠습니까?")) {
            try {
                const response = await deleteFn({ [`${idKey}s`]: selectedIds });

                if (response.success) {
                    toast.success("삭제 작업이 완료되었습니다.");
                    setSelectedIds([]);
                    fetchData(currentPage);
                }
                return response;
            } catch (error) {
                toast.error("삭제 중 오류가 발생했습니다.");
            }
        }
    };

    return {
        data,
        loading,
        params: { searchParams, setSearchParams },
        pagination: { currentPage, totalPages, handlePageChange },
        getVirtualNumber: (index) => {
            return totalElements - (currentPage * searchParams.size) - index;
        },
        selection: { selectedIds, setSelectedIds, handleSelectAll, handleSelectOne },
        handlers: { fetchData, handleBulkDelete }
    };
}