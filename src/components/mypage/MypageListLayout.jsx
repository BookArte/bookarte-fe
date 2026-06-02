import Pagination from '../common/Pagination';

function MypageListLayout({
    columns,
    data,
    emptyMessage,
    renderRow,
    pagination
}) {
    return (
        <>
            <div className="mypage-list-table-wrapper">
                <table className="mypage-list-table">
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
                        {data?.length > 0 ? (
                            data.map((item, index) => (
                                renderRow(item, index)
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="empty-row">
                                    {emptyMessage}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

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

export default MypageListLayout;