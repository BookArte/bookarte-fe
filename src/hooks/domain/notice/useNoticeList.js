import { getBoardList, deleteBoards } from "@/api/board.api";
import { useBoardList } from "../common/useBoardList"

export function useNoticeList() {
    const TYPE = 'notice';
    const {
        data: data,
        loading,
        pagination,
        selection,
        params,
        handlers: boardHandlers,
        getVirtualNumber
    } = useBoardList({
        type: TYPE,
        fetchFn: getBoardList,
        deleteFn: deleteBoards,
        idKey: 'id',
        initialParams: {
            searchText: '',
            searchStartDate: '',
            searchEndDate: '',
            size: 10,
            sort: 'createdAt,desc'
        }
    });

    const handleReset = () => {
        params.setSearchParams({
            searchText: '',
            size: 10,
            sort: 'createdAt,desc'
        });
    };

    const onBulkDelete = async (ids) => {
        const confirmMessage =
            "선택한 공지사항을 삭제하시겠습니까?\n" +
            "삭제된 데이터는 복구할 수 없습니다.";

        const actualIds = (ids && ids.nativeEvent) ? null : ids;

        await boardHandlers.handleBulkDelete(actualIds, confirmMessage);
    };

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
            handleReset,
            handleBulkDelete: onBulkDelete,
            handleModify: boardHandlers.handleModify,
            handleWrite: boardHandlers.handleWrite,
            handleChangeSearchParams: boardHandlers.handleChangeSearchParams,
            setSearchParams: params.setSearchParams,
            handleSearch: boardHandlers.handleSearch
        },
        getVirtualNumber
    };
}