import BoardListLayout from "../admin/BoardListLayout";

function BorrowHistoryView({ borrows, status, handlers }) {
    const { loading, totalPages, currentPage } = status;
    const { handlePageChange, handleReset, handleChangeSearchParams, handleSearch, } = handlers;

    const columns = [
        { label: '번호', width: '100px' },
        { label: '도서 정보', width: 'auto' },
        { label: '대출자', width: '200px' },
        { label: '대출 기간', width: 'auto' },
        { label: '연체 일수', width: 'auto' },
    ];

    const onSearchInputChange = (target) => {
        let name = target.name;
        let value = target.value;

        if (name === 'searchText') name = 'searchKeyword';
        if (name === 'searchStartDate') name = 'startDate';
        if (name === 'searchEndDate') name = 'endDate';

        handleChangeSearchParams({ name, value });
    };

    const renderRow = (item, index) => (
        <>
            <td className="number-column">{index + 1 + currentPage * 5}</td>
            <td className="book-info-td">
                <img src={item.bookThumbnail} alt="" className="mini-thumb" />
                <div>
                    <div className="book-title">{item.bookTitle}</div>
                    <div className="book-author">{item.bookAuthor}</div>
                </div>
            </td>
            <td className="member-info-td">
                <div>
                    <div className="member-name">{item.memberName}</div>
                    <div className="member-id">{item.memberUserId}</div>
                </div>
            </td>
            <td>{item.borrowDate} ~ {item.returnDate}</td>
            <td>{item.overdueDays} 일</td>
        </>
    );

    if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>로딩 중...</div>;

    return (
        <BoardListLayout
            title="대출 기록"
            searchPlaceholder={"도서명 또는 대출자 검색..."}
            run={true}
            columns={columns}
            items={borrows}
            data={borrows.map(book => ({ ...book, id: book.borrowId }))}
            showCheckbox={false}
            selection={{
                selectedIds: [],
                onSelectAll: null,
                onSelectOne: null,
                onBulkDelete: null,
                handleSearch: handleSearch,
                handleChangeSearchParams: onSearchInputChange,
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

export default BorrowHistoryView;