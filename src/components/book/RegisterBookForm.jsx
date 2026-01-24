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

    const ErrorMsg = ({ field }) => {
        if (fieldErrors[field]) {
            return <div className='book-error-message'>{fieldErrors[field]}</div>;
        }
        return null;
    }

    return (
        <div className='form-container'>
            <h2 style={{ textAlign: 'center' }}>도서 등록</h2>

            {/* 검색 섹션 */}
            <section className='search-section'>
                <form onSubmit={handleSearch} style={{ display: 'flex' }}>
                    <input
                        ref={searchInputRef}
                        className='search-form'
                        type="text"
                        placeholder="등록할 도서 제목을 검색하세요..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoComplete="off"
                    />
                    <button className='search-button' type="submit">
                        {isSearching ? '검색 중...' : '검색'}
                    </button>
                </form>
                {duplicateError && <div className='book-error-message'>{duplicateError}</div>}

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
            <form onSubmit={handleSubmit} className='input-form' autoComplete="off">
                {/* 상단 레이아웃: 섬네일(좌) + 제목/카테고리(우) */}
                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '15px' }}>

                    {/* 섬네일 미리보기 영역 */}
                    <div className='input-thumbnail-flex' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <label className='input-label'>썸네일</label>
                        <div style={{
                            width: '120px',
                            height: '170px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            backgroundColor: '#f9f9f9'
                        }}>
                            {bookForm.bookThumbnail ? (
                                <img
                                    src={bookForm.bookThumbnail}
                                    alt="미리보기"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            ) : (
                                <span style={{ fontSize: '12px', color: '#aaa' }}>이미지 없음</span>
                            )}
                        </div>
                        {/* 입력창은 숨기되 값은 유지 */}
                        <input
                            name="bookThumbnail"
                            value={bookForm.bookThumbnail}
                            onChange={handleChange}
                            style={{ display: 'none' }}
                        />
                        <ErrorMsg field="bookThumbnail" />
                    </div>

                    {/* 제목 및 카테고리 영역 */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div className='input-title-flex'>
                            <label className='input-label'>제목</label>
                            <input name="bookTitle" value={bookForm.bookTitle} onChange={handleChange} className='input-style' />
                            <ErrorMsg field="bookTitle" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label className='input-label'>카테고리</label>
                            <input name="bookCategory" value={bookForm.bookCategory} onChange={handleChange} className='input-style' />
                            <ErrorMsg field="bookCategory" />
                        </div>
                    </div>
                </div>

                {/* 나머지 필드들 */}
                <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                    <div style={{ flex: 1 }}>
                        <label className='input-label'>저자</label>
                        <input name="bookAuthor" value={bookForm.bookAuthor} onChange={handleChange} className='input-style' />
                        <ErrorMsg field="bookAuthor" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label className='input-label'>역자</label>
                        <input name="bookTranslator" value={bookForm.bookTranslator} onChange={handleChange} className='input-style' />
                        <ErrorMsg field="bookTranslator" />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                    <div style={{ flex: 1 }}>
                        <label className='input-label'>출판사</label>
                        <input name="publisherName" value={bookForm.publisherName} onChange={handleChange} className='input-style' />
                        <ErrorMsg field="publisherName" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label className='input-label'>출판일</label>
                        <input type="date" name="publicationDate" value={bookForm.publicationDate} onChange={handleChange} className='input-style' />
                        <ErrorMsg field="publicationDate" />
                    </div>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label className='input-label'>ISBN</label>
                    <input name="bookIsbn" value={bookForm.bookIsbn} onChange={handleChange} className='input-style' />
                    <ErrorMsg field="bookIsbn" />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label className='input-unique-label'>청구기호 (필수 입력)</label>
                    <input name="bookCallNumber" value={bookForm.bookCallNumber} onChange={handleChange} className='input-style' placeholder="도서관 내부 청구기호를 입력하세요" />
                    <ErrorMsg field="bookCallNumber" />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label className='input-label'>책소개</label>
                    <textarea name="bookContents" value={bookForm.bookContents} onChange={handleChange} rows="4" className='input-style' />
                    <ErrorMsg field="bookContents" />
                </div>

                <div className='form-btn-group'>
                    <button type="button" className="cnl-btn" onClick={handleCancel}>
                        취소
                    </button>
                    <button type="submit" className='input-btn'>
                        도서 등록
                    </button>
                </div>
            </form>
        </div>
    );
}

export default RegisterBookForm;