import { createBoard } from "@/api/board.api";
import { useBoardForm } from "../common/useBoardForm";

export function useFaqWrite() {
    const TYPE = 'faq';

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
        }
    });
}