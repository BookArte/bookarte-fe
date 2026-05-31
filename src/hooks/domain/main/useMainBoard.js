import { useState, useEffect } from "react";
import { getMainBoardList } from "@/api/board.api";
import { useNavigate } from "react-router-dom";
import URL from "@/constants/url";

export function useMainBoard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('notice');
    const [boardData, setBoardData] = useState({ notice: [], news: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMainData = async () => {
            try {
                setLoading(true);

                const [noticeRes, newsRes] = await Promise.all([
                    getMainBoardList('notice'),
                    getMainBoardList('news')
                ]);

                const noticeList = noticeRes.data?.content || noticeRes.data || [];
                const newsList = newsRes.data?.content || newsRes.data || [];

                setBoardData({
                    notice: noticeList,
                    news: newsList
                });
            } catch (error) {
                console.error("메인 게시판 데이터를 불러오는데 실패했습니다.", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMainData();
    }, []);

    const handleView = (id) => {
        navigate(URL.BOARD_VIEW(activeTab, id));
    }

    return {
        currentList: boardData[activeTab] || [],
        loading,
        activeTab,
        setActiveTab,
        handleView
    };
}