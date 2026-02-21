function BorrowHistoryView({ borrowHistory, handlePageChange, status }) {
    const { loading, totalPages, currentPage } = status;

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
                        <th className="name-column">대출자</th>
                        <th className="period-column">대출 기간</th>
                        <th className="overdue-column">연체 일수</th>
                    </tr>
                </thead>
                <tbody>
                    {borrowHistory.map((item, index) => (
                        <tr key={item.borrowId}>
                            <td className="number-column">{index + 1 + currentPage * PAGE_GROUP_SIZE}</td>
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
                        </tr>
                    ))}
                </tbody>
            </table>

            {borrowHistory.length > 0 && (
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

export default BorrowHistoryView;