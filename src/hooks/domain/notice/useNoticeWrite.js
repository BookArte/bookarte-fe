import { createBoard } from "@/api/board.api";
import { useBoardWrite } from "../common/useBoardWrite";

export function useNoticeWrite() {
    const TYPE = 'notice';

    return useBoardWrite({
        type: TYPE,
        submitFn: createBoard,
        initialData: {
            noticeYn: 'N'
        }
    });
}