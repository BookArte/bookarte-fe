const BookListSearchBar = ({ categories, search, status, handlers }) => {
    return (
        <section>
            {/* 기본 검색바 */}
            <div className="basic-search-wrapper">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="도서명으로 빠르게 검색하세요..."
                        value={search.bookTitle}
                        onChange={(e) => search.setSearchParams({ ...search.searchParams, bookTitle: e.target.value })}
                        onKeyPress={(e) => e.key === 'Enter' && handlers.handleSearch()}
                    />
                    <button className="search-icon-btn" onClick={handlers.handleSearch}>🔍</button>
                </div>
                <button
                    className={`detail-toggle-btn ${status.isDetailOpen ? 'active' : ''}`}
                    onClick={() => status.setIsDetailOpen(!status.isDetailOpen)}
                >
                    {status.isDetailOpen ? '접기 ▲' : '상세검색 ▼'}
                </button>
            </div>

            {/* 상세 검색 패널 */}
            {status.isDetailOpen && (
                <div className="detail-search-panel">
                    <div className="detail-grid">
                        <div className="input-group">
                            <label>카테고리</label>
                            <select
                                className="common-select"
                                value={search.searchParams.category}
                                onChange={(e) => search.setSearchParams({ ...search.searchParams, category: e.target.value })}
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
                                value={search.searchParams.bookAuthor}
                                onChange={(e) => search.setSearchParams({ ...search.searchParams, bookAuthor: e.target.value })}
                                placeholder="저자명 입력"
                            />
                        </div>

                        <div className="input-group">
                            <label>출판사</label>
                            <input
                                value={search.searchParams.publisherName}
                                onChange={(e) => search.setSearchParams({ ...search.searchParams, publisherName: e.target.value })}
                            />
                        </div>

                        <div className="input-group">
                            <label>ISBN</label>
                            <input
                                value={search.searchParams.bookIsbn}
                                onChange={(e) => search.setSearchParams({ ...search.searchParams, bookIsbn: e.target.value })}
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
                                    value={search.searchParams.publicationDateStart}
                                    onChange={(e) => search.handleDateChange(e, 'publicationDateStart')}
                                    className="date-input"
                                />
                                <span>~</span>
                                {/* 종료일 입력창 */}
                                <input
                                    type="date"
                                    max="9999-12-31"
                                    value={search.searchParams.publicationDateEnd}
                                    onChange={(e) => search.handleDateChange(e, 'publicationDateEnd')}
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
                                    value={search.searchParams.sort}
                                    onChange={(e) => search.setSearchParams({ ...search.searchParams, sort: e.target.value })}
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
                                    value={search.searchParams.size}
                                    onChange={(e) => search.setSearchParams({ ...search.searchParams, size: e.target.value })}
                                >
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                            </div>
                        </div>
                        <div className="bottom-btn-group">
                            <button className="reset-btn" onClick={handlers.handleReset}>🔄 초기화</button>
                            <button className="submit-btn" onClick={handlers.handleSearch}>🔍 검색</button>
                        </div>
                    </div>
                </div>
            )
            }
        </section>
    )
}

export default BookListSearchBar;