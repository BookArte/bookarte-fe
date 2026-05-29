import { useEffect, useState } from "react";
import { getExpiredRecommendationHistory } from "../../../api/recommendation.api";

export function useRecommendationHistory() {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchParams, setSearchParams] = useState({
        searchKeyword: '',
        startDate: '',
        endDate: '',
    });

    const fetchRecommendationHistory = async (page = 0) => {
        setLoading(true);
        try {
            const res = await getExpiredRecommendationHistory(page, searchParams);
            setRecommendations(res.data.content);
            setTotalPages(res.data.totalPages);
            setCurrentPage(res.data.number);
        } catch (error) {
            handleApiError(error, "추천 도서 이력 로드 실패")
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecommendationHistory();
    }, []);

    const handleChangeSearchParams = (target) => {
        setSearchParams(prev => ({
            ...prev,
            [target.name]: target.value
        }));
    };

    const handleSearch = () => {
        console.log("🔍 [조회 클릭] 현재 상태값:", searchParams);
        fetchRecommendationHistory(0);
    };

    const handlePageChange = (page) => {
        if (page >= 0 && page < totalPages) {
            fetchRecommendationHistory(page);
            window.scrollTo(0, 0);
        }
    };

    return {
        recommendations,
        handlers: {
            handleChangeSearchParams,
            handleSearch,
        },
        status: {
            loading,
            totalPages,
            currentPage
        },
        pagination: {
            currentPage,
            totalPages,
            handlePageChange
        }
    };
}