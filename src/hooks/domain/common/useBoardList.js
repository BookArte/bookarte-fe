import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import URL from '@/constants/url';

export function useBoardList({
    type,
    fetchFn,
    deleteFn,
    idKey = 'id',
    initialParams = {}
}) {
    const navigate = useNavigate();
    const savedPage = Number(sessionStorage.getItem(`${type}_page`)) || 0;
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
    const [appliedParams, setAppliedParams] = useState(searchParams);

    const fetchData = useCallback(async (page = 0, params = appliedParams) => {
        setLoading(true);
        try {
            const res = await fetchFn(type, { ...params, page });
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
    }, [fetchFn, type, searchParams]);

    useEffect(() => {
        fetchData(savedPage);
    }, []);

    const handlePageChange = (page) => {
        if (page >= 0 && page < totalPages) {
            sessionStorage.setItem(`${type}_page`, page);
            fetchData(page, appliedParams);
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

    const handleBulkDelete = async (ids = null, confirmMessage = "해당 항목을 삭제하시겠습니까?") => {

        const targetIds = ids ? (Array.isArray(ids) ? ids : [ids]) : selectedIds;

        if (targetIds.length === 0 || !deleteFn) {
            toast.warn("삭제할 항목을 선택해주세요.");
            return;
        }

        if (window.confirm(confirmMessage)) {
            try {
                const response = await deleteFn(type, targetIds);

                if (response.success) {
                    toast.success("삭제 작업이 완료되었습니다.");
                    setSelectedIds([]);

                    const isLastItemOnPage = data.length <= targetIds.length && currentPage > 0;
                    const targetPage = isLastItemOnPage ? currentPage - 1 : currentPage;

                    fetchData(targetPage);
                }
                return response;
            } catch (error) {
                toast.error("삭제 중 오류가 발생했습니다.");
            }
        }
    };

    const handleView = (id) => {
        navigate(URL.BOARD_VIEW(type, id));
    }

    const handleModify = (id) => {
        navigate(URL.ADMIN_BOARD_MODIFY(type, id));
    }

    const handleWrite = () => {
        navigate(URL.ADMIN_BOARD_WRITE(type));
    }

    const handleChangeSearchParams = (target) => {
        setSearchParams(prev => ({ ...prev, [target.name]: target.value }));
    };

    const handleSearch = () => {
        const newParams = { ...searchParams };
        setAppliedParams(newParams);
        fetchData(0, newParams);
    };

    return {
        data,
        loading,
        total: totalElements,
        params: { searchParams, setSearchParams },
        pagination: { currentPage, totalPages, handlePageChange },
        getVirtualNumber: (index) => {
            return totalElements - (currentPage * searchParams.size) - index;
        },
        selection: { selectedIds, setSelectedIds, handleSelectAll, handleSelectOne },
        handlers: { fetchData, handleBulkDelete, handleView, handleModify, handleWrite, handleChangeSearchParams, handleSearch }
    };
}