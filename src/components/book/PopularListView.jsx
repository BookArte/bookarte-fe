function PoplarListView({ populars, status, handlers }) {
    const { loading, totalElements, totalPages, currentPage, period } = status;
    const { handlePeriodChange, handleViewBook, handlePageChange } = handlers;

    const PAGE_GROUP_SIZE = 5;
    const currentGroup = Math.floor(currentPage / PAGE_GROUP_SIZE);
    const startPage = currentGroup * PAGE_GROUP_SIZE;
    const endPage = Math.min(startPage + PAGE_GROUP_SIZE, totalPages);

    if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>로딩 중...</div>;

    return (
        <div className="book-list-container">
            <h2 className="recommend-list-title"> 인기 대출 도서 </h2>

            <div className="period-select-group">
                <select
                    className="period-select"
                    value={period}
                    onChange={(e) => handlePeriodChange(e.target.value)}
                >
                    <option value="WEEK">이번주</option>
                    <option value="MONTH">이번달</option>
                    <option value="YEAR">올해</option>
                </select>
            </div>
            <div className="list-header"></div>

            {populars.map((book) => (
                <div key={book.bookId} className="list-item recommend-item">
                    <div className="thumbnail-container">
                        <img src={book.bookThumbnail} alt={book.bookTitle} className="thumbnail-img" />
                    </div>
                    <div className="info-container">
                        <h3 className="title" onClick={() => handleViewBook(book.bookId)}>
                            {book.bookTitle}
                        </h3>
                        <div className="author-row">
                            <span className="text-item">{book.bookAuthor} 지음</span>
                            {book.bookTranslator && <span className="text-item"> | {book.bookTranslator} 옮김</span>}
                            <span className="text-item"> | {book.publisherName}</span>
                            <span className="text-item"> | {book.publicationDate}</span>
                        </div>
                        <div className="meta-container">
                            <div className="meta-item">
                                <span className="meta-label">카테고리리</span>
                                <span className="meta-value">{book.bookCategoryName}</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">ISBN</span>
                                <span className="meta-value">{book.bookIsbn}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {populars.length > 0 && (
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

export default PoplarListView;