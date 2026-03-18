import { useEffect, useState } from "react";
import { getExpiredRecommendationHistory } from "../../../api/recommendation.api";

export function useRecommendationHistory() {
    const [recommendationHistory, setRecommendationHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const fetchRecommendationHistory = async (page = 0) => {
        setLoading(true);
        try {
            const res = await getExpiredRecommendationHistory(page);
            setRecommendationHistory(res.data.content);
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

    const handlePageChange = (page) => {
        if (page >= 0 && page < totalPages) {
            fetchRecommendationHistory(page);
            indow.scrollTo(0, 0);
        }
    };

    return {
        recommendationHistory,
        handlePageChange,
        status: {
            loading,
            totalPages,
            currentPage
        },
    };
}