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
            <form onSubmit={handleSubmit} className='input-form'>
                <div style={{ display: 'flex', gap: '15px' }}>
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