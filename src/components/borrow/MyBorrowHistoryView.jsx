function MyBorrowHistoryView({ borrowHistory, status, handlers }) {
    const { loading, totalPages, currentPage } = status;
    const { handlePageChange, handleViewBook } = handlers;

    const PAGE_GROUP_SIZE = 5;
    const currentGroup = Math.floor(currentPage / PAGE_GROUP_SIZE);
    const startPage = currentGroup * PAGE_GROUP_SIZE;
    const endPage = Math.min(startPage + PAGE_GROUP_SIZE, totalPages);

    if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>로딩 중...</div>;

    return (
        <div className="mypage-book-status-wrapper">
            <h2 className="mypage-book-title">나의 대출 내역</h2>
            {borrowHistory.length === 0 ? (
                <p>대출 내역이 없습니다.</p>
            ) : (
                borrowHistory.map((item) => (
                    <div key={item.borrowId} className="list-item mypage-book-card">
                        <div className="thumbnail-container">
                            <img
                                src={item.bookThumbnail || 'https://via.placeholder.com/120x170'}
                                alt={item.bookTitle}
                                className="thumbnail-img"
                                onClick={() => handleViewBook(item.bookId)}
                            />
                        </div>

                        <div className="info-container">
                            <h3 className="title" onClick={() => handleViewBook(item.bookId)}>
                                {item.bookTitle}
                            </h3>
                            <div className="author-row">
                                <span className="text-item">{item.bookAuthor} 지음</span>
                                <span className="text-item"> | {item.publisherName}</span>
                            </div>
                            <div className="borrow-info-bar">
                                <div className="info-group">
                                    <span className="label">대출일</span>
                                    <span className="value">{item.borrowDate}</span>
                                </div>
                                <div className="info-group">
                                    <span className="label">반납일</span>
                                    <span className="value">{item.returnDate}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
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

export default MyBorrowHistoryView;