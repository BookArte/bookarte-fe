import BoardListLayout from "../admin/BoardListLayout";

function RecommendationHistoryView({ recommendations, handlers, status }) {
    const { loading, totalPages, currentPage } = status;
    const { handlePageChange, handleChangeSearchParams, handleSearch } = handlers;

    const columns = [
        { label: '번호', width: '100px' },
        { label: '도서 정보', width: 'auto' },
        { label: '노출 기간', width: 'auto' },
        { label: '최종 우선순위', width: 'auto' },
        { label: '관리', width: '150px' },
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
            <td>{item.startDate} ~ {item.endDate}</td>
            <td>{item.priority}위</td>
            <td>
                <button className="blue-btn" onClick={() => handleRePublish(item)}>재등록</button>
            </td>
        </>
    );

    return (
        <BoardListLayout
            title="만료 추천 도서 이력"
            searchPlaceholder={"도서명 또는 저자 검색..."}
            run={true}
            columns={columns}
            items={recommendations}
            data={recommendations.map(book => ({ ...book, id: book.recommendationId }))}
            showCheckbox={false}
            selection={{
                selectedIds: [],
                onSelectAll: null,
                onSelectOne: null,
                onBulkDelete: null,
                handleSearch: handleSearch,
                handleChangeSearchParams: onSearchInputChange,

            }}
            renderRow={renderRow}
            pagination={{
                currentPage,
                totalPages,
                handlePageChange,
            }}
            showCreateButton={false}
        />
    );
}

export default RecommendationHistoryView;
