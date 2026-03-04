function NewArrivalsListView({ arrivals, status, handlers }) {
    const { loading, totalElements, totalPages, currentPage, selectedDate } = status;
    const { handleViewBook, handlePageChange, handleMonthChange } = handlers;

    const PAGE_GROUP_SIZE = 5;
    const currentGroup = Math.floor(currentPage / PAGE_GROUP_SIZE);
    const startPage = currentGroup * PAGE_GROUP_SIZE;
    const endPage = Math.min(startPage + PAGE_GROUP_SIZE, totalPages);

    const yearMonth = `${selectedDate.getFullYear()}년 ${String(selectedDate.getMonth() + 1).padStart(2, '0')}월`;
    if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>로딩 중...</div>;

    return (
        <div className="book-list-container">
            <h2 className="recommend-list-title"> 신착 도서 </h2>

            <div className="month-selector">
                <button onClick={() => handleMonthChange(-1)} className="month-btn">◀ 이전 달</button>
                <span className="current-month">{yearMonth}</span>
                <button onClick={() => handleMonthChange(1)} className="month-btn">다음 달 ▶</button>
            </div>

            <div className="list-header">
                <p>이번 달에 총 <strong>{totalElements}</strong>권의 도서가 입고되었습니다.</p>
            </div>
            {arrivals.length > 0 ? (
                arrivals.map((book) => (
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
                                    <span className="meta-label">자료실</span>
                                    <span className="meta-value">{book.bookCategoryName}</span>
                                </div>
                                <div className="meta-item">
                                    <span className="meta-label">ISBN</span>
                                    <span className="meta-value">{book.bookIsbn}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="no-data">해당 월에 등록된 신착 도서가 없습니다.</div>
            )}

            {arrivals.length > 0 && (
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

export default NewArrivalsListView;