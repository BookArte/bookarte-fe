import { createBoard } from "@/api/board.api";
import { useBoardForm } from "../common/useBoardForm";
import URL from "@/constants/url";

export function useQnaWrite() {
    const TYPE = 'qna';

    return useBoardForm({
        type: TYPE,
        isEdit: false,
        submitFn: createBoard,
        initialData: {
            noticeYn: 'N',
            category: '',
            orderNum: 0,
            title: '',
            contents: ''
        },
        redirectUrl: URL.MYPAGE_QNA
    });
}