import BoardListLayout from "../../admin/BoardListLayout";


function DeletedBookListView({ books, status, handlers, pagination }) {
    const loading = status.loading;

    const { handleDeleteBook, handleReset, handleRestoreBook, handleChangeSearchParams, handleSearch } = handlers;

    const columns = [
        { label: '번호', width: '100px' },
        { label: '도서 제목', width: 'auto' },
        { label: '출판사', width: '200px' },
        { label: 'ISBN', width: 'auto' },
        { label: '등록일', width: 'auto' },
        { label: '최종수정일', width: 'auto' },
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
            <td className="manage-column">
                <button className="blue-btn" onClick={() => handleRestoreBook(item.bookId)}>복원</button>
                <button className="red-btn" onClick={() => handleDeleteBook(item.bookId)}>삭제 사유 변경</button>
            </td>
        </>
    );

    if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>로딩 중...</div>;

    return (
        <BoardListLayout
            title="삭제 도서 목록"
            searchPlaceholder="도서명으로 검색..."
            run={true}
            columns={columns}
            data={books.map(book => ({ ...book, id: book.bookId }))}
            showCheckbox={false}
            selection={{
                selectedIds: [],
                onSelectAll: null,
                onSelectOne: null,
                onBulkDelete: null,
                handleSearch: handleSearch,
                handleChangeSearchParams: onSearchInputChange
            }}
            pagination={pagination}
            renderRow={renderRow}
            showCreateButton={false}
        />
    );
};

export default DeletedBookListView;