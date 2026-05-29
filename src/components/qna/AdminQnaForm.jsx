import Editor from "../common/Editor";

const BoardForm = ({
    formData,
    loading,
    handlers,
    refs,
    isEdit = false
}) => {

    const submitBtnText = isEdit ? "수정 완료" : "등록 완료";
    const processingText = isEdit ? "수정 중..." : "등록 중...";

    return (
        <form className="input-form board-form" autoComplete="off" onSubmit={handlers.handleSubmit}>
            <div className="form-top-section">

                <div className="input-info-group">

                    {/* <div className="input-row">
                        <div className="input-col">
                            <label className="input-label">카테고리<span className="required">*</span></label>
                            <input
                                name="category"
                                className="input-style"
                                value={formData.category}
                                onChange={handlers.handleChange}
                                readOnly={isEdit}
                            />
                        </div>
                    </div> */}

                    <div>
                        <label className="input-label">제목<span className="required">*</span></label>
                        <input
                            name="title"
                            className="input-style"
                            placeholder="제목"
                            value={formData.title}
                            onChange={handlers.handleChange}
                            readOnly={isEdit}
                        />
                    </div>
                </div>
            </div>

            <div>
                <label className="input-label">내용<span className="required">*</span></label>
                <textarea name="contents" className="qna-textarea" onChange={handlers.handleChange} value={formData.contents} readOnly={isEdit} />
            </div>

            <div className="form-file-attachment-section">
                <div className="file-attach-header">
                    <label className="input-label">첨부파일</label>
                    <button type="button" className="file-add-btn" onClick={handlers.onFileAddClick}>
                        파일 추가
                    </button>
                    <input
                        type="file"
                        ref={refs.fileInputRef}
                        onChange={handlers.handleFileChange}
                        style={{ display: 'none' }}
                        multiple
                    />
                </div>

                <div className="attached-file-list">
                    {isEdit && formData.existingFiles && formData.existingFiles.length > 0 && (
                        formData.existingFiles.map((file, index) => (
                            <div key={`ex-${file.fileId}`} className="attached-file-item existing">
                                <a href={`${import.meta.env.VITE_API_BASE_URL}/board/file/download/${file.fileId}`} download={file.originalName} >
                                    <span className="file-name">{file.originalName}</span>
                                </a>
                            </div>
                        ))
                    )}

                    {formData.files && formData.files.length > 0 ? (
                        formData.files.map((file, index) => (
                            <div key={`new-${index}`} className="attached-file-item new">
                                <span className="file-name">{file.name} (새 파일)</span>
                                <button
                                    type="button"
                                    className="file-del-btn"
                                    onClick={() => handlers.handleFileDelete(index)}
                                >
                                    삭제
                                </button>
                            </div>
                        ))
                    ) : (
                        (!formData.existingFiles || formData.existingFiles.length === 0) && (
                            <p className="no-file-msg">첨부된 파일이 없습니다.</p>
                        )
                    )}
                </div>
            </div>

            {isEdit && (
                <div className="form-file-attachment-section" >
                    <div>
                        <label className="input-label">답변 상태</label>
                        <input type="text" className="input-style" readOnly value={formData.answerStatus} />
                    </div>
                    <br />
                    <div>
                        <label className="input-label">관리자 답변</label>
                        <Editor
                            value={formData.admAnswer}
                            onChange={handlers.handleAdmAnswerChange}
                            height="400px"
                        />
                    </div>
                    <br /><br /><br />
                    <div>
                        <label className="input-label">답변일</label>
                        <input type="text" className="input-style" readOnly value={formData.admAnswerDate} />
                    </div>
                </div>

            )}

            <div className="form-btn-group">
                <button type="button" className="cnl-btn" onClick={handlers.handleCancel}>취소</button>
                <button type="submit" className="input-btn" disabled={loading}>
                    {loading ? processingText : submitBtnText}
                </button>
            </div>
        </form>
    );
};

export default BoardForm;