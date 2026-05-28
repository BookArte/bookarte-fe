import { useState, useEffect } from "react";
import { getMainBoardList } from "@/api/board.api";

export function useMainBoard() {
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

    return {
        currentList: boardData[activeTab] || [],
        loading,
        activeTab,
        setActiveTab
    };
}