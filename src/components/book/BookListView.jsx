function BookListView({ books, categories, params, status, handlers }) {
    const { handleReset, handleViewBook, handleDateChange, handlePageChange, handleSearch } = handlers;
    const { loading, totalElements, isDetailOpen, setIsDetailOpen, totalPages, currentPage } = status;
    const { searchParams, setSearchParams } = params;

    const PAGE_GROUP_SIZE = 5;
    const currentGroup = Math.floor(currentPage / PAGE_GROUP_SIZE);
    const startPage = currentGroup * PAGE_GROUP_SIZE;
    const endPage = Math.min(startPage + PAGE_GROUP_SIZE, totalPages);

    if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>로딩 중...</div>;

    return (
        <div className="book-list-container">
            <h2>도서 목록 관리</h2>
            {/* 기본 검색바 */}
            <div className="basic-search-wrapper">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="도서명으로 빠르게 검색하세요..."
                        value={searchParams.bookTitle}
                        onChange={(e) => setSearchParams({ ...searchParams, bookTitle: e.target.value })}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <button className="search-icon-btn" onClick={handleSearch}>🔍</button>
                </div>
                <button
                    className={`detail-toggle-btn ${isDetailOpen ? 'active' : ''}`}
                    onClick={() => setIsDetailOpen(!isDetailOpen)}
                >
                    {isDetailOpen ? '접기 ▲' : '상세검색 ▼'}
                </button>
            </div>

            {/* 상세 검색 패널 */}
            {isDetailOpen && (
                <div className="detail-search-panel">
                    <div className="detail-grid">
                        <div className="input-group">
                            <label>카테고리</label>
                            <select
                                className="common-select"
                                value={searchParams.category}
                                onChange={(e) => setSearchParams({ ...searchParams, category: e.target.value })}
                            >
                                <option value="">전체</option>
                                {categories.map((cat) => (
                                    <option key={cat.categoryCode} value={cat.categoryName}>
                                        {cat.categoryName} ({cat.categoryCode})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="input-group">
                            <label>저자</label>
                            <input
                                value={searchParams.bookAuthor}
                                onChange={(e) => setSearchParams({ ...searchParams, bookAuthor: e.target.value })}
                                placeholder="저자명 입력"
                            />
                        </div>

                        <div className="input-group">
                            <label>출판사</label>
                            <input
                                value={searchParams.publisherName}
                                onChange={(e) => setSearchParams({ ...searchParams, publisherName: e.target.value })}
                            />
                        </div>

                        <div className="input-group">
                            <label>ISBN</label>
                            <input
                                value={searchParams.bookIsbn}
                                onChange={(e) => setSearchParams({ ...searchParams, bookIsbn: e.target.value })}
                            />
                        </div>

                        {/* 발행년도 기간 필드 */}
                        <div className="input-group date-range-group" style={{ gridColumn: 'span 2' }}>
                            <label>발행일</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                {/* 시작일 입력창 */}
                                <input
                                    type="date"
                                    max="9999-12-31"
                                    value={searchParams.publicationDateStart}
                                    onChange={(e) => handleDateChange(e, 'publicationDateStart')}
                                    className="date-input"
                                />
                                <span>~</span>
                                {/* 종료일 입력창 */}
                                <input
                                    type="date"
                                    max="9999-12-31"
                                    value={searchParams.publicationDateEnd}
                                    onChange={(e) => handleDateChange(e, 'publicationDateEnd')}
                                    className="date-input"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="detail-bottom-row">
                        <div className="bottom-select-group">
                            {/* 정렬 기준  */}
                            <div className="input-group">
                                <label>정렬 기준</label>
                                <select
                                    className="common-select"
                                    value={searchParams.sort}
                                    onChange={(e) => setSearchParams({ ...searchParams, sort: e.target.value })}
                                >
                                    <option value="createdAt,desc">최신 등록순</option>
                                    <option value="createdAt,asc">오래된 등록순</option>
                                    <option value="bookTitle,asc">제목 오름차순 (ㄱ-ㅎ)</option>
                                    <option value="bookTitle,desc">제목 내림차순 (ㅎ-ㄱ)</option>
                                    <option value="author,asc">저자명 오름차순</option>
                                    <option value="publicationDate,desc">최신 발행일순</option>
                                    <option value="publicationDate,asc">오래된 발행일순</option>
                                </select>
                            </div>
                            {/* 건수 설정 */}
                            <div className="input-group">
                                <label>한 페이지 당 건수</label>
                                <select
                                    className="common-select"
                                    value={searchParams.size}
                                    onChange={(e) => setSearchParams({ ...searchParams, size: e.target.value })}
                                >
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                            </div>
                        </div>
                        <div className="bottom-btn-group">
                            <button className="reset-btn" onClick={handleReset}>🔄 초기화</button>
                            <button className="submit-btn" onClick={handleSearch}>🔍 검색</button>
                        </div>
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
                                <span className="meta-label">카테고리</span>
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
            {books.length > 0 && (
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

export default BookListView;