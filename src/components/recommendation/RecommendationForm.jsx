import ErrorMsg from "../common/ErrorMsg";

function RecommendationForm({ recommended, fieldErrors, book, handlers, openModal }) {

    const { selectedBook, setSelectedBook } = book;
    const { handleChange, handleSubmit, handleCancel } = handlers;

    return (
        <div className="recommendation-set-container">
            <h2 className='recommendation-set-title'>관리자 추천 도서 등록</h2>

            {/* 도서 검색 및  선택 섹션 */}
            <div className="book-search-section">
                <label>대상 도서</label>
                <div className="book-selector">
                    {selectedBook ? (
                        <div className="selected-card">
                            <img src={selectedBook.bookThumbnail} alt="" />
                            <div className="info">
                                <strong>{selectedBook.bookTitle}</strong>
                                <span>{selectedBook.bookAuthor} | {selectedBook.publisherName}</span>
                            </div>
                            <button onClick={() => setSelectedBook(null)}>변경</button>
                        </div>
                    ) : (
                        <button className="search-trigger" onClick={openModal}>
                            🔍 추천할 도서 검색하기
                        </button>
                    )}
                </div>
            </div>
            {recommended && <div className='book-error-message'>{recommended}</div>}

            {/* 상세 내용 섹션 */}
            <div className="recommendation-form-section">
                <label>추천 코멘트</label>
                <textarea
                    placeholder="관리자 추천평을 입력하세요 (최대 200자)"
                    name='comments'
                    onChange={handleChange}
                />
                <ErrorMsg message={fieldErrors.comments} />
            </div>

            <div className="recommendation-form-section row">
                <div>
                    <label>전시 시작일</label>
                    <input type="date" name='startDate' onChange={handleChange} />
                    <ErrorMsg message={fieldErrors.startDate} />
                </div>
                <div>
                    <label>전시 종료일</label>
                    <input type="date" name='endDate' onChange={handleChange} />
                    <ErrorMsg message={fieldErrors.endDate} />
                </div>
            </div>

            <div className="button-group">
                <button className="cancel-btn" onClick={handleCancel}>취소</button>
                <button className="submit-btn" onClick={handleSubmit}>등록</button>
            </div>

        </div>
    );
}

export default RecommendationForm;