import BoardListLayout from "../admin/BoardListLayout";

function AdminNoticeList({ data, status, handlers, getVirtualNumber }) {

    const renderRow = (item, index) => {
        return (
            <>
                <td>{getVirtualNumber(index)}</td>
                <td>{item.title}</td>
                <td>{item.regMemberUserId}</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td>
                    <button className="blue-btn" onClick={() => { handlers.handleView(item.id) }}>수정</button>
                    <button className="red-btn" onClick={() => { handlers.handleBulkDelete(item.id) }}>삭제</button>
                </td>
            </>
        );
    };

    return (
        <BoardListLayout
            title="공지사항 관리"
            columns={[
                { label: "번호", width: "10%" },
                { label: "제목", width: "40%" },
                { label: "작성자", width: "15%" },
                { label: "작성일", width: "15%" },
                { label: "관리", width: "10%" }
            ]}
            data={data}
            renderRow={(item, index) => renderRow(item, index)}
            searchPlaceholder="공지사항 제목 또는 내용 검색"
            showCheckbox={true}

            selection={{
                selectedIds: status.selectedIds,
                onSelectAll: handlers.handleSelectAll,
                onSelectOne: handlers.handleSelectOne,
                onBulkDelete: handlers.handleBulkDelete,
                onCreate: handlers.handleWrite
            }}

            pagination={{
                currentPage: status.currentPage,
                totalPages: status.totalPages,
                handlePageChange: handlers.handlePageChange,
            }}
        />
    );
}

export default AdminNoticeList;