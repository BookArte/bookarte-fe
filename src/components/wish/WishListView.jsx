function WishListView({ wishes, status, handlers }) {
    const { loading, totalElements, totalPages, currentPage } = status;
    const { handleViewBook, handlePageChange } = handlers;

    const PAGE_GROUP_SIZE = 5;
    const currentGroup = Math.floor(currentPage / PAGE_GROUP_SIZE);
    const startPage = currentGroup * PAGE_GROUP_SIZE;
    const endPage = Math.min(startPage + PAGE_GROUP_SIZE, totalPages);

    if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>로딩 중...</div>;

    return (
        <div className="mypage-book-status-wrapper">
            <h2 className="mypage-book-title">나의 관심 도서</h2>
            {wishes.length === 0 ? (
                < p > 관심 도서가 없습니다.</p>
            ) : (
                wishes.map((item) => (
                    <div key={item.w} className="list-item mypage-book-card">
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
                                {item.bookTranslator && <span className="text-item"> | {item.bookTranslator} 옮김</span>}
                                <span className="text-item"> | {item.publisherName}</span>
                            </div>
                            <div className="book-row">
                                <span className="text-item">ISBN:{item.bookIsbn}</span>
                                <span className="text-item"> | 카테고리:{item.category}</span>
                            </div>

                        </div>
                    </div>
                ))
            )}
            {wishes.length > 0 && (
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
        </div >
    )

}

export default WishListView;