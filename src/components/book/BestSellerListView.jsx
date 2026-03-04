function BestSellerListView({ bestSellers, status }) {
    const { loading, totalElements, totalPages, currentPage } = status;

    if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>로딩 중...</div>;

    return (
        <div className="book-list-container">
            <h2 className="recommend-list-title"> 베스트/스테디셀러 </h2>
            <div className="list-header"></div>
            {bestSellers.length > 0 ? (
                bestSellers.map((book) => (
                    <div key={book.bookId} className="list-item recommend-item">
                        <div className="thumbnail-container">
                            <img src={book.bookThumbnail} alt={book.bookTitle} className="thumbnail-img" />
                        </div>
                        <div className="info-container">
                            <h3 className="title">{book.bookTitle}</h3>
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
                <div className="no-data">베스트셀러 도서가 없습니다.</div>
            )}
        </div>
    );
}

export default BestSellerListView;