function BookListView({ books, searchParams, setSearchParams, status, handlers }) {
    const { fetchBooks, handleReset, handleViewBook } = handlers;
    const { loading, totalElements, isDetailOpen, setIsDetailOpen } = status;

    if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>로딩 중...</div>;

    return (
        <div className="book-list-container">
            <h2>도서 목록 관리</h2>
            {/* 1. 기본 검색바 (이미지 8c3325 스타일) */}
            <div className="basic-search-wrapper">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="검색어를 입력해주세요"
                        value={searchParams.bookTitle}
                        onChange={(e) => setSearchParams({ ...searchParams, bookTitle: e.target.value })}
                        onKeyPress={(e) => e.key === 'Enter' && fetchBooks()}
                    />
                    <button className="search-icon-btn" onClick={fetchBooks}>🔍</button>
                </div>
                <button
                    className={`detail-toggle-btn ${isDetailOpen ? 'active' : ''}`}
                    onClick={() => setIsDetailOpen(!isDetailOpen)}
                >
                    {isDetailOpen ? '접기' : '상세검색'}
                </button>
            </div>

            {/* 2. 상세 검색 패널 (이미지 8c337c 스타일) */}
            {isDetailOpen && (
                <div className="detail-search-panel">
                    <div className="detail-grid">
                        <div className="input-group">
                            <label>도서명</label>
                            <input value={searchParams.bookTitle} onChange={(e) => setSearchParams({ ...searchParams, bookTitle: e.target.value })} />
                        </div>
                        <div className="input-group">
                            <label>저자</label>
                            <input value={searchParams.bookAuthor} onChange={(e) => setSearchParams({ ...searchParams, bookAuthor: e.target.value })} />
                        </div>
                        <div className="input-group">
                            <label>출판사</label>
                            <input value={searchParams.publisherName} onChange={(e) => setSearchParams({ ...searchParams, publisherName: e.target.value })} />
                        </div>
                        <div className="input-group">
                            <label>ISBN</label>
                            <input value={searchParams.bookIsbn} onChange={(e) => setSearchParams({ ...searchParams, bookIsbn: e.target.value })} />
                        </div>
                    </div>

                    <div className="detail-btns">
                        <button className="reset-btn" onClick={handleReset}>🔄 초기화</button>
                        <button className="submit-btn" onClick={fetchBooks}>🔍 검색</button>
                    </div>
                </div>
            )}

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
                                <span className="meta-label">자료실명</span>
                                <span className="meta-value">{book.bookCategory}</span>
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

export default BookListView;