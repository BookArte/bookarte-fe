import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBoardDetail, updateBoard } from "@/api/board.api";
import { useBoardForm } from "../common/useBoardForm";

export function useNewsModify() {
    const { id } = useParams();
    const TYPE = 'news';
    const [initialData, setInitialData] = useState(null);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await getBoardDetail(TYPE, id);
                if (res.success) {
                    setInitialData(res.data);
                }
            } catch (error) {
                console.error("데이터 로드 실패:", error);
            } finally {
                setFetching(false);
            }
        };
        fetchDetail();
    }, [id]);

    const formProps = useBoardForm({
        type: TYPE,
        isEdit: true,
        submitFn: (type, data) => updateBoard(type, id, data),
        initialData: initialData
    });

    return {
        ...formProps,
        fetching
    };
}