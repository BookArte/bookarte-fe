function RegisterBookForm({ search, form, handlers }) {
    const {
        searchQuery, setSearchQuery,
        searchResults,
        isSearching,
    } = search;
    const { form: bookForm } = form;
    const {
        handleChange,
        handleSearch,
        handleSelectBook,
        handleSubmit
    } = handlers;
    return (
        <div className='form-container'>
            <h2 style={{ textAlign: 'center' }}>도서 등록</h2>

            {/* 검색 섹션 */}
            <section className='search-section'>
                <form onSubmit={handleSearch} style={{ display: 'flex' }}>
                    <input
                        className='search-form'
                        type="text"
                        placeholder="등록할 도서 제목을 검색하세요..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}

                    />
                    <button className='search-button' type="submit">
                        {isSearching ? '검색 중...' : '검색'}
                    </button>
                </form>

                {/* 검색 결과 레이어 */}
                {searchResults.length > 0 && (
                    <div className='search-result-layer'>
                        {searchResults.map((book) => (
                            <div
                                className='search-result'
                                key={book.bookIsbn}
                                onClick={() => handleSelectBook(book)}
                            >
                                <img src={book.bookThumbnail} alt="cover" className='search-result-img' />
                                <div>
                                    <div className='search-result-title'>{book.bookTitle}</div>
                                    <div className='search-result-element'>
                                        {book.bookAuthor} | {book.publisherName} | {book.bookCategory}
                                    </div>
                                    <div className='search-result-ISBN'>ISBN: {book.bookIsbn}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '30px 0' }} />

            {/* 등록 폼 섹션 */}
            <form onSubmit={handleSubmit} className='input-form'>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <div className='input-title-flex'>
                        <label className='input-label'>제목</label>
                        <input name="bookTitle" value={bookForm.bookTitle} onChange={handleChange} required className='input-style' />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label className='input-label'>카테고리</label>
                        <input name="bookCategory" value={bookForm.bookCategory} onChange={handleChange} className='input-style' />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ flex: 1 }}>
                        <label className='input-label'>저자</label>
                        <input name="bookAuthor" value={bookForm.bookAuthor} onChange={handleChange} required className='input-style' />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label className='input-label'>역자</label>
                        <input name="bookTranslator" value={bookForm.bookTranslator} onChange={handleChange} className='input-style' />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ flex: 1 }}>
                        <label className='input-label'>출판사</label>
                        <input name="publisherName" value={bookForm.publisherName} onChange={handleChange} className='input-style' />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label className='input-label'>출판일</label>
                        <input type="date" name="publicationDate" value={bookForm.publicationDate} onChange={handleChange} className='input-style' />
                    </div>
                </div>

                <div>
                    <label className='input-label'>ISBN</label>
                    <input name="bookIsbn" value={bookForm.bookIsbn} onChange={handleChange} className='input-style' />
                </div>

                <div>
                    <label className='input-unique-label'>청구기호 (필수 입력)</label>
                    <input name="bookCallNumber" value={bookForm.bookCallNumber} onChange={handleChange} className='input-style' placeholder="도서관 내부 청구기호를 입력하세요" />
                </div>

                <div>
                    <label className='input-label'>책소개</label>
                    <textarea name="bookContents" value={bookForm.bookContents} onChange={handleChange} rows="4" className='input-style' />
                </div>

                <button type="submit" className='input-btn'>
                    도서 등록
                </button>
            </form>
        </div>
    );
}

export default RegisterBookForm;