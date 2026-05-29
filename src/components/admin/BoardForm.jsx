import Editor from "../common/Editor";

const BoardForm = ({
    formData,
    loading,
    handlers,
    refs,
    thumbnail = true,
    isEdit = false
}) => {

    const submitBtnText = isEdit ? "수정 완료" : "등록 완료";
    const processingText = isEdit ? "수정 중..." : "등록 중...";

    return (
        <form className="input-form board-form" autoComplete="off" onSubmit={handlers.handleSubmit}>
            <div className="form-top-section">
                {thumbnail && (
                    <div className="input-thumbnail-flex">
                        <label className="input-label">썸네일<span className="required">*</span></label>
                        <div className={`thumbnail-preview-section ${formData.thumbnail ? 'has-image' : ''}`}
                            onClick={handlers.onThumbnailClick}
                        >
                            {formData.thumbnail ? (
                                <img src={formData.thumbnail} alt="미리보기" className="thumbnail-preview-style" />
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
                    </div>
                )}
                <div className="input-info-group">
                    <div>
                        <label className="input-label">공지여부</label>
                        <div className="notice-check-area">
                            <label htmlFor="notice-yes">
                                <input
                                    type="radio" name="noticeYn" id="notice-yes" value="Y"
                                    checked={formData.noticeYn === "Y"}
                                    onChange={handlers.handleChange}
                                /> 여
                            </label>
                            <label htmlFor="notice-no">
                                <input
                                    type="radio" name="noticeYn" id="notice-no" value="N"
                                    checked={formData.noticeYn === "N"}
                                    onChange={handlers.handleChange}
                                /> 부
                            </label>
                        </div>
                    </div>

                    <div className="input-row">
                        {/* <div className="input-col">
                            <label className="input-label">카테고리<span className="required">*</span></label>
                            <input
                                name="category"
                                className="input-style"
                                value={formData.category}
                                onChange={handlers.handleChange}
                            />
                        </div> */}
                        <div className="input-col">
                            <label className="input-label">정렬순서</label>
                            <input
                                type="number"
                                name="orderNum"
                                className="input-style"
                                value={formData.orderNum}
                                onChange={handlers.handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="input-label">제목<span className="required">*</span></label>
                        <input
                            name="title"
                            className="input-style"
                            placeholder="제목"
                            value={formData.title}
                            onChange={handlers.handleChange}
                        />
                    </div>
                </div>
            </div>

            <div>
                <label className="input-label">내용<span className="required">*</span></label>
                <Editor
                    value={formData.editor}
                    onChange={handlers.handleEditorChange}
                    height="400px"
                />
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
                                <button
                                    type="button"
                                    className="file-del-btn"
                                    onClick={() => handlers.handleFileDelete(index, true, file.fileId)}
                                >
                                    삭제
                                </button>
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