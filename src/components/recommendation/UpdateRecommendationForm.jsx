import ErrorMsg from "../common/ErrorMsg";

function UpdateRecommendationForm({ loading, form, fieldErrors, handlers }) {
    const { handleChange, handleSubmit, handleCancel } = handlers;

    if (loading) return <div className="book-detail-container">로딩 중...</div>;

    return (
        <div className="book-work-container">
            <h2 className='book-work-title'> 관리자 추천 도서 수정</h2>
            <div className="recommendation-set-container">
                {/* 상세 내용 섹션 */}
                <div className="recommendation-form-section">
                    <label>추천 코멘트</label>
                    <textarea
                        placeholder="관리자 추천평을 입력하세요 (최대 200자)"
                        name='comments'
                        value={form.comments}
                        onChange={handleChange}
                    />
                    <ErrorMsg message={fieldErrors.comments} />
                </div>

                <div className="recommendation-form-section row">
                    <div>
                        <label>전시 시작일</label>
                        <input type="date" name='startDate' value={form.startDate} onChange={handleChange} />
                        <ErrorMsg message={fieldErrors.startDate} />
                    </div>
                    <div>
                        <label>전시 종료일</label>
                        <input type="date" name='endDate' value={form.endDate} onChange={handleChange} />
                        <ErrorMsg message={fieldErrors.endDate} />
                    </div>
                </div>

                <div className="button-group">
                    <button className="cancel-btn" onClick={handleCancel}>취소</button>
                    <button className="submit-btn" onClick={handleSubmit}>수정</button>
                </div>
            </div>

        </div>

    );
}

export default UpdateRecommendationForm;