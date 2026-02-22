function BookStatusListView({ books, categories, status, handlers }) {
    const { loading, totalPages, currentPage } = status;
    const { handlePageChange, handleReset, handleViewBook } = handlers;

    const PAGE_GROUP_SIZE = 5;
    const currentGroup = Math.floor(currentPage / PAGE_GROUP_SIZE);
    const startPage = currentGroup * PAGE_GROUP_SIZE;
    const endPage = Math.min(startPage + PAGE_GROUP_SIZE, totalPages);

    if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>로딩 중...</div>;

    return (
        <div className="work-list-container">
            <div className="filter-section">
                <input type="text" placeholder="도서명 또는 대출자 검색..." />
                <input type="date" name="searchStartDate" /> ~ <input type="date" name="searchEndDate" />
                <button className="search-btn">조회</button>
            </div>

            <table className="work-list-table">
                <thead>
                    <tr>
                        <th className="number-column">번호</th>
                        <th className="book-info-column">도서 정보</th>
                        <th className="publisher-column">출판사</th>
                        <th className="isbn-column">ISBN</th>
                        <th className="status-column">상태</th>
                        <th className="manage-column">관리</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((item, index) => (
                        <tr key={item.bookId}>
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
                                <button onClick={() => handleViewBook(item.bookId)}>상세보기</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {books.length > 0 && (
                <div className="pagination">
                    <button
                        disabled={currentPage === 0}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="page-nav-btn"
                    >
                        이전
                    </button>

                    {Array.from({ length: endPage - startPage }, (_, i) => startPage + i).map((pageIdx) => (
                        <button
                            key={pageIdx}
                            onClick={() => handlePageChange(pageIdx)}
                            className={`page-num-btn ${currentPage === pageIdx ? 'active' : ''}`}
                        >
                            {pageIdx + 1}
                        </button>
                    ))}

                    <button
                        disabled={currentPage >= totalPages - 1}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="page-nav-btn"
                    >
                        다음
                    </button>
                </div>
            )}
        </div>
    );
}

export default BookStatusListView;