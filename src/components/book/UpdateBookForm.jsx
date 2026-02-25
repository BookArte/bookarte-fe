import ErrorMsg from "../common/ErrorMsg";

function UpdateBookForm({ loading, bookForm, handlers, fieldErrors }) {
    const { handleChange, handleSubmit, handleCancel } = handlers;

    if (loading) return <div className="book-detail-container">로딩 중...</div>;

    return (
        <div className='book-form-container'>
            <h2 className='book-work-title'>도서 정보 수정</h2>

            {/* 수정 폼 섹션 */}
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
                    <button type="submit" className='input-btn'>도서 수정 완료</button>
                </div>
            </form>
        </div>
    )

}
export default UpdateBookForm;