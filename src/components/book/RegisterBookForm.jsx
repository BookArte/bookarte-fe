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
                {/* 상단 레이아웃: 썸네일(좌) + 정보 영역(우) */}
                <div style={{ display: 'flex', gap: '25px', alignItems: 'flex-start', marginBottom: '20px' }}>
                    {/* 섬네일 미리보기 영역 */}
                    <div className='input-thumbnail-flex'>
                        <label className='input-label'>썸네일</label>
                        <div className="thumbnail-preview-section">
                            {bookForm.bookThumbnail ? (
                                <img
                                    src={bookForm.bookThumbnail}
                                    alt="미리보기"
                                    className="thumbnail-preview-style"
                                />
                            ) : (
                                <span style={{ fontSize: '12px', color: '#aaa' }}>이미지 없음</span>
                            )}
                        </div>
                        <input
                            name="bookThumbnail"
                            value={bookForm.bookThumbnail}
                            onChange={handleChange}
                            style={{ display: 'none' }}
                        />
                        <ErrorMsg message={fieldErrors.bookThumbnail} />
                    </div>

                    {/* 제목 및 카테고리 영역 */}
                    <div className="input-tc-flex">
                        {/* 제목 */}
                        <div style={{ flex: 3 }}>
                            <label className='input-label'>제목</label>
                            <input
                                name="bookTitle"
                                value={bookForm.bookTitle}
                                onChange={handleChange}
                                className='input-style'
                                style={{ width: '100%' }}
                                placeholder="도서 제목을 입력하세요"
                            />
                            <ErrorMsg message={fieldErrors.bookTitle} />
                        </div>

                        {/* 카테고리 */}
                        <div style={{ flex: 1, minWidth: '150px' }}>
                            <label className='input-label'>카테고리</label>
                            <input
                                name="bookCategory"
                                value={bookForm.bookCategory}
                                onChange={handleChange}
                                className='input-style'
                                style={{ width: '100%' }}
                                placeholder="카테고리"
                            />
                            <ErrorMsg message={fieldErrors.bookCategory} />
                        </div>
                    </div>
                </div>

                {/* 나머지 필드들 */}
                <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                    <div style={{ flex: 1 }}>
                        <label className='input-label'>저자</label>
                        <input name="bookAuthor" value={bookForm.bookAuthor} onChange={handleChange} className='input-style' />
                        <ErrorMsg message={fieldErrors.bookAuthor} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label className='input-label'>역자</label>
                        <input name="bookTranslator" value={bookForm.bookTranslator} onChange={handleChange} className='input-style' />
                        <ErrorMsg message={fieldErrors.bookTranslator} />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                    <div style={{ flex: 1 }}>
                        <label className='input-label'>출판사</label>
                        <input name="publisherName" value={bookForm.publisherName} onChange={handleChange} className='input-style' />
                        <ErrorMsg message={fieldErrors.publisherName} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label className='input-label'>출판일</label>
                        <input type="date" name="publicationDate" value={bookForm.publicationDate} onChange={handleChange} className='input-style' />
                        <ErrorMsg message={fieldErrors.publicationDate} />
                    </div>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label className='input-label'>ISBN</label>
                    <input name="bookIsbn" value={bookForm.bookIsbn} onChange={handleChange} className='input-style' />
                    <ErrorMsg message={fieldErrors.bookIsbn} />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label className='input-unique-label'>청구기호 (필수 입력)</label>
                    <input name="bookCallNumber" value={bookForm.bookCallNumber} onChange={handleChange} className='input-style' placeholder="도서관 내부 청구기호를 입력하세요" />
                    <ErrorMsg message={fieldErrors.bookCallNumber} />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label className='input-label'>책소개</label>
                    <textarea name="bookContents" value={bookForm.bookContents} onChange={handleChange} rows="4" className='input-style' />
                    <ErrorMsg message={fieldErrors.bookContents} />

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