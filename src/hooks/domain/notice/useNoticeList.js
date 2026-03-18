import { getBoardList, deleteBoards } from "@/api/board.api";
import { useBoardList } from "../common/useBoardList"

export function useNoticeList() {
    const {
        data: data,
        loading,
        pagination,
        selection,
        params,
        handlers: boardHandlers,
        getVirtualNumber
    } = useBoardList({
        type: 'notice',
        fetchFn: getBoardList,
        deleteFn: deleteBoards,
        idKey: 'id',
        initialParams: {
            title: '',
            content: '',
            size: 10,
            sort: 'createdAt,desc'
        }
    });

    const handleReset = () => {
        params.setSearchParams({
            title: '',
            content: '',
            size: 10,
            sort: 'createdAt,desc'
        });
    };

    const onBulkDelete = async () => {
        const confirmMessage =
            "선택한 공지사항을 삭제하시겠습니까?\n" +
            "삭제된 데이터는 복구할 수 없습니다.";

        await boardHandlers.handleBulkDelete(confirmMessage);
    };

    return {
        data,
        status: {
            loading,
            ...pagination,
            selectedIds: selection.selectedIds,
        },
        handlers: {
            ...pagination,
            ...selection,
            handleReset,
            handleBulkDelete: onBulkDelete,
            setSearchParams: params.setSearchParams
        },
        getVirtualNumber
    };
}