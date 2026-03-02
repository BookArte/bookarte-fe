
function RecommendationListView({ books, loading, handleViewBook }) {

    if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>로딩 중...</div>;

    return (
        <div className="book-list-container">
            <h2 className="recommend-list-title"> 추천 도서 TOP {books.length}</h2>

            <div className="list-header"></div>

            {books.map((book, index) => (
                <div key={book.recommendationId} className="list-item recommend-item">
                    <div className="thumbnail-container">
                        <div className={`rank-tag rank-${index + 1}`}>
                            {index + 1}
                        </div>
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

                        {/* 관리자 코멘트 섹션 추가 */}
                        {book.comments && (
                            <div className="admin-comment-box">
                                <span className="quote-icon">"</span>
                                <p className="comment-text">{book.comments}</p>
                                <span className="quote-icon">"</span>
                            </div>
                        )}

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
            ))}
        </div>
    );
}

export default RecommendationListView;