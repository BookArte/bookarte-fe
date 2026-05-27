import { getMyBoardList, deleteBoards } from "@/api/board.api";
import { useBoardList } from "../common/useBoardList"
import { useNavigate } from "react-router-dom";
import URL from '@/constants/url';

export function useMyQnaList() {
    const navigate = useNavigate();
    const TYPE = 'qna';
    const {
        data,
        loading,
        pagination,
        selection,
        params,
        handlers: boardHandlers,
        getVirtualNumber
    } = useBoardList({
        type: TYPE,
        fetchFn: getMyBoardList,
        deleteFn: deleteBoards,
        idKey: 'id',
        initialParams: {
            size: 10,
            sort: 'createdAt,desc'
        }
    });

    const handleView = (id) => {
        navigate(URL.MYPAGE_QNA_VIEW(id));
    }

    return {
        data,
        status: {
            loading,
            ...pagination,
            selectedIds: selection.selectedIds,
            type: TYPE
        },
        handlers: {
            ...pagination,
            ...selection,
            handleDelete: boardHandlers.handleBulkDelete,
            handleModify: boardHandlers.handleModify,
            handleWrite: boardHandlers.handleWrite,
            handleView: handleView
        },
        getVirtualNumber
    };
}