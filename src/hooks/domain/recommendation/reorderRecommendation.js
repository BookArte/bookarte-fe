import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteRecommendationBook, recommendationBookList, reorderRecommendationList } from "../../../api/recommendation.api"
import URL from '@/constants/url';
import { useNavigate } from "react-router-dom";


export function reorderRecommendation() {
    const navigator = useNavigate();
    const [items, setItems] = useState([]);
    const [isChanged, setIsChanged] = useState(false); // 변경 사항 여부 추적


    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        const res = await recommendationBookList();
        if (res.success) setItems(res.data);
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const newItems = Array.from(items);
        const [reorderedItem] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, reorderedItem);

        setItems(newItems);
        setIsChanged(true);
    };

    const handleSave = async () => {
        const idList = items.map(item => item.recommendationId);
        try {
            const res = await reorderRecommendationList({ reorderedIds: idList });
            toast.success(res.data)
            setIsChanged(false); // 저장 완료 후 상태 초기화
        } catch (error) {
            alert("저장에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const setBtn = () => {
        navigator(URL.RECOMMENDATION_SET, { replace: true });
    }

    const delHandle = async (id) => {
        if (window.confirm("정말로 이 도서를 추천 리스트에서 삭제하시겠습니까?")) {
            const res = await deleteRecommendationBook(id);
            if (res.success) {
                toast.success(res.data);
                fetchBooks(); // 삭제 후 목록 갱신
            } else {
                toast.error("삭제에 실패했습니다. 다시 시도해주세요.");
            }
        }

    }

    return {
        items,
        isChanged,
        onDragEnd,
        handlers: {
            delHandle,
            setBtn,
            handleSave
        },

    }

};