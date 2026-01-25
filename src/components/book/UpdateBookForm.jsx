function UpdateBookForm({ loading, bookForm, handlers, fieldErrors }) {
    const { handleChange, handleSubmit, handleCancel } = handlers;

    if (loading) return <div className="book-detail-container">로딩 중...</div>;

    const ErrorMsg = ({ field }) => {
        if (fieldErrors[field]) {
            return <div className='book-error-message'>{fieldErrors[field]}</div>;
        }
        return null;
    }

    return (
        <div className='form-container'>
            <h2 style={{ textAlign: 'center' }}>도서 정보 수정</h2>

            {/* 수정 폼 섹션 */}
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
                        <ErrorMsg field="bookThumbnail" />
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
                            <ErrorMsg field="bookTitle" />
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
                            <ErrorMsg field="bookCategory" />
                        </div>
                    </div>
                </div>


                <div style={{ display: 'flex', gap: '15px' }}>
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

                <div style={{ display: 'flex', gap: '15px' }}>
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

                <div>
                    <label className='input-label'>ISBN</label>
                    <input name="bookIsbn" value={bookForm.bookIsbn} onChange={handleChange} className='input-style' />
                    <ErrorMsg field="bookIsbn" />
                </div>

                <div>
                    <label className='input-unique-label'>청구기호 (필수 입력)</label>
                    <input name="bookCallNumber" value={bookForm.bookCallNumber} onChange={handleChange} className='input-style' placeholder="도서관 내부 청구기호를 입력하세요" />
                    <ErrorMsg field="bookCallNumber" />
                </div>

                <div>
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
    )

}
export default UpdateBookForm;