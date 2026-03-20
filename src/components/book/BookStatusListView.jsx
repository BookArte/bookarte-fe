import BoardListLayout from "../admin/BoardListLayout";

function BookStatusListView({ books, categories, status, handlers }) {
    const { loading, totalPages, currentPage, selectedIds, setSelectedIds } = status;
    const { handlePageChange, handleReset, handleUpdateBook, handleSelectAll, handleSelectOne, handleBulkDelete } = handlers;

    const columns = [
        { label: '번호', width: '100px' },
        { label: '도서 정보', width: 'auto' },
        { label: '출판사', width: '200px' },
        { label: 'ISBN', width: 'auto' },
        { label: '상태', width: '200px' },
        { label: '관리', width: '200px' },
    ];

    const renderRow = (item) => (
        <>
            <td className="number-column">{item.bookId}</td>
            <td className="book-info-td">
                <img src={item.bookThumbnail} alt="" className="mini-thumb" />
                <div>
                    <div className="book-title">{item.bookTitle}</div>
                    <div className="book-author">{item.bookAuthor}</div>
                </div>
            </td>
            <td>{item.publisherName}</td>
            <td>{item.bookIsbn}</td>
            <td>
                <span className={`status-badge ${item.canBorrow ? 'green' : 'blue'}`}>
                    {item.canBorrow ? '대출 가능' : '대출 중'}
                </span>
            </td>
            <td className="manage-column">
                <button className="blue-btn" onClick={() => handleUpdateBook(item.bookId)}>수정</button>
            </td>
        </>
    );

    if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>로딩 중...</div>;

    return (
        <BoardListLayout
            title="도서 현황"
            searchPlaceholder="도서명 또는 대출자 검색..."
            columns={columns}
            data={books.map(book => ({ ...book, id: book.bookId }))}
            showCheckbox={true}
            selection={{
                selectedIds: selectedIds,
                onSelectAll: handleSelectAll,
                onSelectOne: handleSelectOne,
                onBulkDelete: handleBulkDelete
            }}
            pagination={{
                currentPage,
                totalPages,
                handlePageChange
            }}
            renderRow={renderRow}
        />
    );
}

export default BookStatusListView;