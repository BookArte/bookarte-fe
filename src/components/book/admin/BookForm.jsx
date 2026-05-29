import ErrorMsg from "../../common/ErrorMsg";
import Editor from "../../common/Editor";

const BookForm = ({
    formData,
    loading,
    errors,
    handlers,
    refs,
    isEdit = false
}) => {

    const submitBtnText = isEdit ? "수정 완료" : "등록 완료";
    const processingText = isEdit ? "수정 중..." : "등록 중...";

    return (
        <div>
            <form onSubmit={handlers.handleSubmit} className='input-form' autoComplete="off">
                <div style={{ display: 'flex', gap: '30px', marginBottom: '30px' }}>
                    <div className='input-thumbnail-flex'>
                        <label className='input-label'>도서 표지</label>
                        <div
                            className={`thumbnail-preview-section ${formData.bookThumbnail ? 'has-image' : ''}`}
                            onClick={handlers.onThumbnailClick}
                            style={{ cursor: 'pointer' }}
                        >
                            {formData.bookThumbnail ? (
                                <img src={formData.bookThumbnail} alt="미리보기" className="thumbnail-preview-style" />
                            ) : (
                                <span className="thumbnail-no-img">이미지 등록</span>
                            )}
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            ref={refs.thumbnailInputRef}
                            onChange={handlers.handleThumbnailChange}
                            style={{ display: 'none' }}
                        />
                        <ErrorMsg message={errors.fieldErrors.bookThumbnail} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label className='input-label'>도서 제목</label>
                            <input name="bookTitle" value={formData.bookTitle} onChange={handlers.handleChange} className='input-style' placeholder="제목이 자동 입력됩니다" />
                            <ErrorMsg message={errors.fieldErrors.bookTitle} />
                        </div>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <div style={{ flex: 1 }}>
                                <label className='input-label'>카테고리</label>
                                <input name="bookCategory" value={formData.bookCategory} onChange={handlers.handleChange} className='input-style' />
                                <ErrorMsg message={errors.fieldErrors.bookCategory} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label className='input-label'>ISBN</label>
                                <input name="bookIsbn" value={formData.bookIsbn} onChange={handlers.handleChange} className='input-style' />
                                <ErrorMsg message={errors.fieldErrors.bookIsbn} />
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div>
                        <label className='input-label'>저자</label>
                        <input name="bookAuthor" value={formData.bookAuthor} onChange={handlers.handleChange} className='input-style' />
                        <ErrorMsg message={errors.fieldErrors.bookAuthor} />
                    </div>
                    <div>
                        <label className='input-label'>역자</label>
                        <input name="bookTranslator" value={formData.bookTranslator} onChange={handlers.handleChange} className='input-style' />
                        <ErrorMsg message={errors.fieldErrors.bookTranslator} />
                    </div>
                    <div>
                        <label className='input-label'>출판사</label>
                        <input name="publisherName" value={formData.publisherName} onChange={handlers.handleChange} className='input-style' />
                        <ErrorMsg message={errors.fieldErrors.publisherName} />
                    </div>
                    <div>
                        <label className='input-label'>출판일</label>
                        <input type="date" name="publicationDate" value={formData.publicationDate} onChange={handlers.handleChange} className='input-style' />
                        <ErrorMsg message={errors.fieldErrors.publicationDate} />
                    </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label className='input-label input-unique-label'>청구기호 (필수)</label>
                    <input name="bookCallNumber" value={formData.bookCallNumber} onChange={handlers.handleChange} className='input-style input-unique-style' placeholder="예: 813.6-박24-ㄴ" />
                    <ErrorMsg message={errors.fieldErrors.bookCallNumber} />
                </div>

                <div>
                    <label className='input-label'>책 소개</label>
                    <Editor
                        value={formData.editor}
                        onChange={handlers.handleEditorChange}
                        height="300px"
                    />
                    <ErrorMsg message={errors.fieldErrors.bookContents} />
                </div>

                <div className='form-btn-group'>
                    <button type="button" className="cnl-btn" onClick={handlers.handleCancel}>취소</button>
                    <button type="submit" className="input-btn" disabled={loading}>
                        {loading ? processingText : submitBtnText}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BookForm;