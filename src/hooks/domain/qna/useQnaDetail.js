import { deleteBoards } from "@/api/board.api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMyBoardDetail } from "@/api/board.api";
import URL from "@/constants/url";
import { toast } from "react-toastify";

export function useQnaDetail() {
    const { id } = useParams();
    const TYPE = 'qna';
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                setLoading(true);
                const res = await getMyBoardDetail(TYPE, id);
                if (res.success) {
                    setData(res.data);
                }
            } catch (error) {
                console.error("데이터 로드 실패:", error);
                toast.error("존재하지 않는 게시글입니다.");
                navigate(URL.MYPAGE_QNA);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchDetail();
    }, [id]);

    const onDelete = async (ids) => {
        const targetIds = ids ? (Array.isArray(ids) ? ids : [ids]) : null;
        try {
            const res = await deleteBoards(TYPE, targetIds);
            if (res.success) {
                setData(null);
                navigate(URL.MYPAGE_QNA);
            }
        } catch (error) {
            console.error("문의 내역 삭제 실패:", error);
        }
    };

    return { data, loading, onDelete };
}