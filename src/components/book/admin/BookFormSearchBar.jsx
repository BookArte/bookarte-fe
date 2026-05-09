const BookFormSearchBar = ({
    search,
    errors,
    handlers,
    refs
}) => {
    return (
        <section className='book-search-section'>
            <form onSubmit={handlers.handleSearch} style={{ display: 'flex' }}>
                <input
                    ref={refs.searchInputRef}
                    className='book-search-form'
                    type="text"
                    placeholder="도서 제목 또는 ISBN으로 검색하세요"
                    value={search.searchQuery}
                    onChange={(e) => search.setSearchQuery(e.target.value)}
                    autoComplete="off"
                />
                <button className='book-search-button' type="submit">
                    {search.isSearching ? '조회 중...' : '도서 조회'}
                </button>
            </form>
            {errors.duplicateError && <div className='book-error-message'>{errors.duplicateError}</div>}

            {search.searchResults.length > 0 && (
                <div className='search-result-layer'>
                    {search.searchResults.map((book) => (
                        <div className='book-search-result' key={book.bookIsbn} onClick={() => handlers.handleSelectBook(book)}>
                            <img src={book.bookThumbnail} alt="cover" className='book-search-result-img' />
                            <div>
                                <div className='book-search-result-title'>{book.bookTitle}</div>
                                <div className='book-search-result-element'>
                                    {book.bookAuthor} | {book.publisherName} | {book.bookCategory}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}

export default BookFormSearchBar;