function QnaForm({ formData, loading, handlers, refs, isEdit = false }) {
    return (
        <form className="qna-write-form" onSubmit={handlers.handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">제목</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="제목을 입력해주세요."
                    value={formData.title}
                    onChange={handlers.handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="contents">내용</label>
                <textarea
                    id="contents"
                    name="contents"
                    rows="10"
                    placeholder="문의하실 내용을 상세히 입력해주세요."
                    value={formData.contents}
                    onChange={handlers.handleChange}
                    required
                ></textarea>
            </div>

            <div className="form-group">
                <label>파일 첨부</label>
                <div className="file-upload-wrapper">
                    <input
                        type="text"
                        className="file-name-display"
                        value={formData.files.length > 0 ? `총 ${formData.files.length}개의 파일 선택됨` : "선택된 파일 없음"}
                        readOnly
                    />
                    <label htmlFor="file-upload" className="btn-file-select">
                        파일 추가
                    </label>
                    <input
                        type="file"
                        id="file-upload"
                        ref={refs.fileInputRef}
                        onChange={handlers.handleFileChange}
                        hidden
                        multiple
                    />
                </div>

                {formData.files.length > 0 && (
                    <ul className="qna-attached-file-list">
                        {formData.files.map((file, index) => (
                            <li key={index} className="qna-file-item">
                                <span className="file-info">
                                    <span className="file-name">{file.name}</span>
                                    <span className="file-size">({(file.size / 1024 / 1024).toFixed(2)}MB)</span>
                                </span>
                                <button
                                    type="button"
                                    className="btn-file-remove"
                                    onClick={() => handlers.handleFileDelete(index)}
                                >
                                    삭제
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
                <p className="file-notice">※ 최대 10MB까지 업로드 가능하며, 여러 개 등록할 수 있습니다.</p>
            </div>

            <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={handlers.handleCancel}>
                    취소
                </button>
                <button type="submit" className="btn-submit" disabled={loading}>
                    {loading ? "등록 중..." : isEdit ? "수정 완료" : "등록하기"}
                </button>
            </div>
        </form>
    );
}

export default QnaForm;