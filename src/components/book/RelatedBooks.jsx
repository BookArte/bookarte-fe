function RelatedBooks({ relatedBooks, handlers }) {
    if (!relatedBooks || relatedBooks.length === 0) return null;

    return (
        <div className="detail-section related-books-section">
            <div className="section-header">
                <h2 className="section-title">연관 도서</h2>
                <span className="stats-source">* 본 도서관 사이트에서 제공하는 연관 도서 중 소장하고 있는 자료입니다.</span>
            </div>

            <div className="related-books-grid">
                {relatedBooks && relatedBooks.length > 0 ? (
                    relatedBooks.map((item) => (
                        <div key={item.bookId} className="related-book-card" onClick={() => handlers.handleViewBook(item.bookId)} >
                            <div className="related-thumbnail-wrapper">
                                <img
                                    src={item.bookThumbnail}
                                    alt={item.bookTitle}
                                />
                            </div>
                            <div className="related-book-info">
                                <h3 className="related-title">{item.bookTitle}</h3>
                                <p className="related-author-line">
                                    {item.bookAuthor} | {item.publisherName}
                                </p>
                                <p className="related-year">
                                    {item.publicationDate ? item.publicationDate.substring(0, 4) : ''}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-contents">연관 도서 정보가 없습니다.</div>
                )}
            </div>
        </div>
    );
}

export default RelatedBooks;
