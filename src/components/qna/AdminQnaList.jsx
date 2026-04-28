import BoardListLayout from "../admin/BoardListLayout";

function AdminQnaList({ data, status, handlers, getVirtualNumber }) {

    const renderRow = (item, index) => {
        return (
            <>
                <td>{item.noticeYn === 'Y' ? '공지' : getVirtualNumber(index)}</td>
                <td>{item.answerStatus}</td>
                <td>{item.title}</td>
                <td>{item.regMemberUserId}</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td>
                    <button className="blue-btn" onClick={() => { handlers.handleModify(item.id) }}>수정</button>
                    <button className="red-btn" onClick={() => { handlers.handleBulkDelete(item.id) }}>삭제</button>
                </td>
            </>
        );
    };

    return (
        <BoardListLayout
            title="Q&A 관리"
            columns={[
                { label: "번호", width: "10%" },
                { label: "답변 상태", width: "8%" },
                { label: "제목", width: "40%" },
                { label: "작성자", width: "15%" },
                { label: "작성일", width: "15%" },
                { label: "관리", width: "10%" }
            ]}
            data={data}
            renderRow={(item, index) => renderRow(item, index)}
            searchPlaceholder="Q&A 제목 또는 내용 검색"
            showCheckbox={true}
            showCreateButton={false}

            selection={{
                selectedIds: status.selectedIds,
                onSelectAll: handlers.handleSelectAll,
                onSelectOne: handlers.handleSelectOne,
                onBulkDelete: handlers.handleBulkDelete,
                onCreate: handlers.handleWrite,
                handleChangeSearchParams: handlers.handleChangeSearchParams,
                handleSearch: handlers.handleSearch
            }}

            pagination={{
                currentPage: status.currentPage,
                totalPages: status.totalPages,
                handlePageChange: handlers.handlePageChange,
            }}
        />
    );
}

export default AdminQnaList;