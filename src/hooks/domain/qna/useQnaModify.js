import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMyBoardDetail, getBoardDetail, updateBoard } from "@/api/board.api";
import { useBoardForm } from "../common/useBoardForm";
import URL from "@/constants/url";
import { toast } from "react-toastify";

export function useQnaModify({ redirectUrl } = {}) {
    const { id } = useParams();
    const TYPE = 'qna';
    const [initialData, setInitialData] = useState(null);
    const [fetching, setFetching] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = redirectUrl ? await getMyBoardDetail(TYPE, id) : await getBoardDetail(TYPE, id);
                if (res.success) {
                    setInitialData(res.data);
                }
            } catch (error) {
                console.error("데이터 로드 실패:", error);
                if (redirectUrl) {
                    toast.error("존재하지 않는 게시글입니다.");
                    navigate(URL.MYPAGE_QNA);
                }
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
        initialData: initialData,
        redirectUrl: redirectUrl
    });

    const handleAdmAnswerChange = (editor) => {
        formProps.setFormData(prev => ({ ...prev, admAnswer: editor }));
    };

    return {
        ...formProps,
        fetching,
        handlers: {
            ...formProps.handlers,
            handleAdmAnswerChange
        }
    };
}