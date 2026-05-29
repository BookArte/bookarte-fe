import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteRecommendationBook, getActiveRecommendationList, reorderRecommendationList } from "../../../api/recommendation.api"
import URL from '@/constants/url';
import { useNavigate } from "react-router-dom";


export function reorderRecommendation() {
    const navigator = useNavigate();
    const [items, setItems] = useState([]);
    const [isChanged, setIsChanged] = useState(false);
    const [activeTab, setActiveTab] = useState('ACTIVE');


    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        const res = await getActiveRecommendationList();
        if (res.success) setItems(res.data);
    };

    const handleTabChange = (tab) => {
        if (isChanged && !window.confirm("변경 사항이 저장되지 않았습니다. 탭을 이동하시겠습니까?")) {
            return;
        }
        setActiveTab(tab);
        setIsChanged(false); // 탭 이동 시 변경 상태 리셋
    };

    const displayItems = items.filter(item => item.status === activeTab);

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const newItems = Array.from(items);

        const filteredIndices = items
            .map((item, idx) => (item.status === activeTab ? idx : null))
            .filter(idx => idx !== null);

        const sourceIndex = filteredIndices[result.source.index];
        const destIndex = filteredIndices[result.destination.index];

        const [reorderedItem] = newItems.splice(sourceIndex, 1);
        newItems.splice(destIndex, 0, reorderedItem);

        setItems(newItems);
        setIsChanged(true);
    };

    const handleSave = async () => {
        const idList = items
            .filter(item => item.status === activeTab)
            .map(item => item.recommendationId);
        try {
            const res = await reorderRecommendationList({ reorderedIds: idList });
            toast.success(res.data)
            setIsChanged(false); // 저장 완료 후 상태 초기화
        } catch (error) {
            handleApiError(error, "추천 도서 재정렬 실패")
        }
    };

    const setBtn = () => {
        navigator(URL.RECOMMENDATION_SET, { replace: true });
    }

    const updateHandle = (recommendationId) => {
        navigator(URL.RECOMMENDATEION_UPDATE(recommendationId), { replace: true });
    }

    const handleDel = async (recommendationId) => {
        try {
            if (window.confirm("정말로 이 도서를 추천 리스트에서 삭제하시겠습니까?")) {
                const res = await deleteRecommendationBook(recommendationId);
                if (res.success) {
                    toast.success(res.data);
                    fetchBooks();
                } else {
                    toast.error("삭제에 실패했습니다. 다시 시도해주세요.");
                }
            }
        } catch (error) {
            handleApiError(error, "추천 도서 삭제 실패")
        }
    }

    return {
        items,
        displayItems,
        activeTab,
        isChanged,
        onDragEnd,
        handlers: {
            handleTabChange,
            handleDel,
            updateHandle,
            setBtn,
            handleSave
        },

    }

};