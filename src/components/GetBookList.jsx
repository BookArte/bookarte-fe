function GetBookList({ books, totalElements, loading, navigate }) {


    if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>로딩 중...</div>;

    return (
        <div className="book-list-container">

            {/* 총 건수 표기 */}
            <div className="list-header">
                전체 <strong>{totalElements}</strong> 건
            </div>

            {/* 도서 리스트 */}
            {books.map((book) => (
                <div key={book.bookId} className="list-item">
                    <div className="thumbnail-container">
                        <img
                            src={book.bookThumbnail}
                            alt={book.bookTitle}
                            className="thumbnail-img"
                        />
                    </div>

                    <div className="info-container">
                        <h3 className="title" onClick={() => navigate(`/book/view/${book.bookId}`)}>
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
                                <span className="meta-label">자료실명</span>
                                <span className="meta-value">{book.bookCategoryName}</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">청구기호</span>
                                <span className="meta-value">{book.bookCallNumber}</span>
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

export default GetBookList;