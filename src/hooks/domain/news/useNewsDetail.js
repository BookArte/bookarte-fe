import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBoardDetail } from "@/api/board.api";

export function useNewsDetail() {
    const { id } = useParams();
    const TYPE = 'news';
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                setLoading(true);
                const res = await getBoardDetail(TYPE, id);
                if (res.success) {
                    setData(res.data);
                }
            } catch (error) {
                console.error("데이터 로드 실패:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchDetail();
    }, [id]);

    return { data, loading };
}