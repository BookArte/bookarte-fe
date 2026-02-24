import ErrorMsg from "../common/ErrorMsg";

function RegisterBookForm({ search, form, handlers }) {
    const {
        searchQuery, setSearchQuery,
        searchResults,
        isSearching,
        duplicateError,
        searchInputRef,
    } = search;

    const { form: bookForm } = form;

    const {
        handleChange,
        handleSearch,
        handleSelectBook,
        handleSubmit,
        handleCancel
    } = handlers;

    const { fieldErrors } = search;

    return (
        <div className='book-form-container'>
            <h2 className='book-form-title'>새 도서 등록</h2>

            <section className='book-search-section'>
                <form onSubmit={handleSearch} style={{ display: 'flex' }}>
                    <input
                        ref={searchInputRef}
                        className='book-search-form'
                        type="text"
                        placeholder="도서 제목 또는 ISBN으로 검색하세요"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoComplete="off"
                    />
                    <button className='book-search-button' type="submit">
                        {isSearching ? '조회 중...' : '도서 조회'}
                    </button>
                </form>
                {duplicateError && <div className='book-error-message'>{duplicateError}</div>}

                {searchResults.length > 0 && (
                    <div className='search-result-layer'>
                        {searchResults.map((book) => (
                            <div className='book-search-result' key={book.bookIsbn} onClick={() => handleSelectBook(book)}>
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

            <form onSubmit={handleSubmit} className='input-form' autoComplete="off">
                <div style={{ display: 'flex', gap: '30px', marginBottom: '30px' }}>
                    <div className='input-thumbnail-flex'>
                        <label className='input-label'>도서 표지</label>
                        <div className={`thumbnail-preview-section ${bookForm.bookThumbnail ? 'has-image' : ''}`}>
                            {bookForm.bookThumbnail ? (
                                <img src={bookForm.bookThumbnail} alt="미리보기" className="thumbnail-preview-style" />
                            ) : (
                                <span style={{ fontSize: '13px', color: '#adb5bd' }}>이미지 없음</span>
                            )}
                        </div>
                    </div>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label className='input-label'>도서 제목</label>
                            <input name="bookTitle" value={bookForm.bookTitle} onChange={handleChange} className='input-style' placeholder="제목이 자동 입력됩니다" />
                            <ErrorMsg message={fieldErrors.bookTitle} />
                        </div>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <div style={{ flex: 1 }}>
                                <label className='input-label'>카테고리</label>
                                <input name="bookCategory" value={bookForm.bookCategory} onChange={handleChange} className='input-style' />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label className='input-label'>ISBN</label>
                                <input name="bookIsbn" value={bookForm.bookIsbn} onChange={handleChange} className='input-style' />
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div>
                        <label className='input-label'>저자</label>
                        <input name="bookAuthor" value={bookForm.bookAuthor} onChange={handleChange} className='input-style' />
                    </div>
                    <div>
                        <label className='input-label'>역자</label>
                        <input name="bookTranslator" value={bookForm.bookTranslator} onChange={handleChange} className='input-style' />
                    </div>
                    <div>
                        <label className='input-label'>출판사</label>
                        <input name="publisherName" value={bookForm.publisherName} onChange={handleChange} className='input-style' />
                    </div>
                    <div>
                        <label className='input-label'>출판일</label>
                        <input type="date" name="publicationDate" value={bookForm.publicationDate} onChange={handleChange} className='input-style' />
                    </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label className='input-label input-unique-label'>청구기호 (필수)</label>
                    <input name="bookCallNumber" value={bookForm.bookCallNumber} onChange={handleChange} className='input-style input-unique-style' placeholder="예: 813.6-박24-ㄴ" />
                    <ErrorMsg message={fieldErrors.bookCallNumber} />
                </div>

                <div>
                    <label className='input-label'>책 소개</label>
                    <textarea name="bookContents" value={bookForm.bookContents} onChange={handleChange} rows="5" className='input-style' style={{ resize: 'none' }} />
                </div>

                <div className='form-btn-group'>
                    <button type="button" className="cnl-btn" onClick={handleCancel}>취소</button>
                    <button type="submit" className='input-btn'>도서 등록 완료</button>
                </div>
            </form>
        </div>
    );
}

export default RegisterBookForm;