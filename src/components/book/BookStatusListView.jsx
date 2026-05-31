import BoardListLayout from "../admin/BoardListLayout";

function BookStatusListView({ books, categories, status, handlers }) {
    const { loading, totalPages, currentPage, selectedIds, setSelectedIds } = status;
    const { handlePageChange, handleReset, handleUpdateBook, handleSelectAll, handleSelectOne, handleBulkDelete, handleChangeSearchParams, handleSearch, } = handlers;

    const columns = [
        { label: '번호', width: '100px' },
        { label: '도서 제목', width: 'auto' },
        { label: '출판사', width: '200px' },
        { label: 'ISBN', width: 'auto' },
        { label: '등록일', width: 'auto' },
        { label: '최종수정일', width: 'auto' },
        { label: '상태', width: '200px' },
        { label: '관리', width: '200px' },
    ];

    const onSearchInputChange = (target) => {
        let name = target.name;
        let value = target.value;

        if (name === 'searchText') name = 'bookTitle';
        if (name === 'searchStartDate') name = 'createdAtStart';
        if (name === 'searchEndDate') name = 'createdAtEnd';

        handleChangeSearchParams({ name, value });
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return dateString.split('T')[0];
    }

    const renderRow = (item) => (
        <>
            <td className="number-column">{item.bookId}</td>
            <td className="book-info-td">
                <img src={item.bookThumbnail} alt="" className="mini-thumb" />
                <div className="book-status-text">
                    <div className="book-title" title={item.bookTitle}>{item.bookTitle}</div>
                    <div className="book-author" title={item.bookAuthor}>{item.bookAuthor}</div>
                </div>
            </td>
            <td>{item.publisherName}</td>
            <td>{item.bookIsbn}</td>
            <td>{formatDate(item.createdAt)}</td>
            <td>{formatDate(item.lastUpdatedAt)}</td>
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
            searchPlaceholder="도서명으로 검색..."
            run={true}
            columns={columns}
            data={books.map(book => ({ ...book, id: book.bookId }))}
            showCheckbox={true}
            selection={{
                selectedIds: selectedIds,
                onSelectAll: handleSelectAll,
                onSelectOne: handleSelectOne,
                onBulkDelete: handleBulkDelete,
                handleSearch: handleSearch,
                handleChangeSearchParams: onSearchInputChange
            }}
            pagination={{
                currentPage,
                totalPages,
                handlePageChange
            }}
            renderRow={renderRow}
            showCreateButton={false}
        />
    );
}

export default BookStatusListView;