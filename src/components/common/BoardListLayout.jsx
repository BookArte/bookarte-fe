import Pagination from "./Pagination";
import BoardSearchBar from "./BoardSearchBar";

function BoardListLayout({
    title,
    columns,
    data = [],
    pagination,
    selection,
    renderRow,
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

            <table className="board-list-user-table">
                <thead>
                    <tr>
                        {columns.map((col, idx) => (
                            <th key={idx} style={{ width: col.width }}>
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        renderRow(item, index)
                    ))}
                </tbody>
            </table>

            {data.length > 0 && (
                <Pagination
                    pageGroupSize={pagination.pageGroupSize}
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    handlePageChange={pagination.handlePageChange}
                />
            )}
        </>
    );
}

export default BoardListLayout;