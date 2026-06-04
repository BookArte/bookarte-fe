import Pagination from "./Pagination";
import BoardSearchBar from "./BoardSearchBar";

function BoardListLayout({
    title,
    columns,
    data = [],
    pagination,
    selection,
    renderRow,
    renderGrid,
    isGrid = false,
    run = true
}) {
    return (
        <>
            <div className="contents-header">
                <h2 className="contents-title">{title}</h2>
            </div>

            <div className="board-list-user-condition">
                <span className="total-count">전체 <strong>{pagination.total}</strong>건</span>
                <BoardSearchBar handler={{
                    handleChangeSearchParams: selection.handleChangeSearchParams,
                    handleSearch: selection.handleSearch
                }}
                    run={run} />
            </div>


            {isGrid ? (
                data.length > 0 ? (
                    <div className="board-grid-container">
                        {data.map((item, index) => renderGrid(item, index))}
                    </div>
                ) : (
                    <div className="no-post-container">
                        <p>게시글이 존재하지 않습니다.</p>
                    </div>
                )
            ) : (
                <table className="board-list-user-table">
                    <thead>
                        <tr>
                            {columns.map((col, idx) => (
                                <th key={idx} style={{ width: col.width }}>
                                    {col.label}
                                </th>
                            ))}
                        </tr >
                    </thead >
                    <tbody>
                        {data?.length > 0 ? (
                            data.map((item, index) => (
                                renderRow(item, index)
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="empty-row">
                                    게시글이 존재하지 않습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table >
            )}


            {
                data.length > 0 && (
                    <Pagination
                        pageGroupSize={pagination.pageGroupSize}
                        currentPage={pagination.currentPage}
                        totalPages={pagination.totalPages}
                        handlePageChange={pagination.handlePageChange}
                    />
                )
            }
        </>
    );
}

export default BoardListLayout;