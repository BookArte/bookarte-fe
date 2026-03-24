import BoardSearchBar from './BoardSearchBar';
import Pagination from './Pagination';

const BoardListLayout = ({
    title,
    columns,
    data = [],
    pagination,
    showCheckbox,
    selection,
    renderRow,
    searchPlaceholder,
    showCreateButton = true
}) => {
    return (
        <div className="board-list-common-container">
            <h2 className="board-list-common-title">{title}</h2>

            {searchPlaceholder && (
                <BoardSearchBar placeholder={searchPlaceholder} />
            )}

            <div className="table-actions">
                {showCheckbox && (
                    <button
                        className="bulk-del-btn"
                        disabled={selection.selectedIds.length === 0}
                        onClick={selection.onBulkDelete}
                    >
                        선택 삭제 ({selection.selectedIds.length})
                    </button>
                )}
                {showCreateButton && (
                    <button
                        className="create-btn"
                        onClick={selection.onCreate}
                    >
                        생성
                    </button>
                )}
            </div>

            <table className="work-list-table">
                <thead>
                    <tr>
                        {showCheckbox && (
                            <th className="check-column">
                                <input
                                    type="checkbox"
                                    onChange={selection.onSelectAll}
                                    checked={data.length > 0 && selection.selectedIds.length === data.length}
                                />
                            </th>
                        )}

                        {columns.map((col, idx) => (
                            <th key={idx} style={{ width: col.width }}>
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>

                    {data.map((item, index) => (
                        <tr key={item.id || index} className={selection.selectedIds.includes(item.id) ? 'selected-row' : ''}>
                            {showCheckbox && (
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selection.selectedIds.includes(item.id)}
                                        onChange={() => selection.onSelectOne(item.id)}
                                    />
                                </td>
                            )}
                            {renderRow(item, index)}
                        </tr>
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
        </div>
    );
};

export default BoardListLayout;