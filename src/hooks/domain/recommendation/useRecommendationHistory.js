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
            console.error("추천 도서 내역을 불러오는 중 오류 발생:", error);
            toast.error("추천 도서 내역을 불러오는 중 오류가 발생했습니다.");
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