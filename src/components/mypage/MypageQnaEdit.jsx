import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function MypageQnaEdit({ formData, loading, handlers, refs }) {

    if (loading) return <div className="qna-loading">데이터를 불러오는 중...</div>;

    return (
        <div className="mypage-qna-form-container">
            <h2>문의내역 수정</h2>
            <p className="qna-desc">작성하신 1:1 문의를 수정하실 수 있습니다.</p>

            <form onSubmit={handlers.handleSubmit} className="qna-edit-form">

                {/* 제목 입력 */}
                <div className="form-group row-group">
                    <label htmlFor="title">제목</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handlers.handleChange}
                        placeholder="제목을 입력해주세요 (최대 50자)"
                        maxLength={50}
                        required
                    />
                </div>

                {/* 내용 입력 */}
                <div className="form-group row-group contents-group">
                    <label htmlFor="contents">내용</label>
                    <textarea
                        id="contents"
                        name="contents"
                        value={formData.contents}
                        onChange={handlers.handleChange}
                        placeholder="문의하실 내용을 상세히 입력해주세요."
                        rows="12"
                        required
                    />
                </div>

                {/* 첨부파일 영역 */}
                <div className="form-group row-group">
                    <label>첨부파일</label>
                    <div className="file-input-wrapper">
                        <input
                            type="file"
                            multiple
                            ref={refs.fileInputRef}
                            onChange={handlers.handleFileChange}
                            style={{ display: 'none' }}
                        />

                        <div style={{ marginBottom: '10px' }}>
                            <button
                                type="button"
                                onClick={handlers.onFileAddClick}
                                style={{ padding: '6px 12px', border: '1px solid #ccc', borderRadius: '4px', background: '#fff', cursor: 'pointer' }}
                            >
                                파일 추가
                            </button>
                            <span className="file-info-text" style={{ marginLeft: '10px' }}>
                                * 최대 10개, 10MB 이하 파일 첨부 가능
                            </span>
                        </div>

                        {/* 기존 첨부파일 리스트 */}
                        {formData.existingFiles && formData.existingFiles.length > 0 && (
                            <div className="file-list">
                                {formData.existingFiles.map((file, idx) => (
                                    <div key={file.fileId || idx} style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px', fontSize: '14px' }}>
                                        <span>📎 [기존] {file.originalName || file.originName}</span>
                                        <button
                                            type="button"
                                            onClick={() => handlers.handleFileDelete(idx, true, file.fileId)}
                                            style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer', fontSize: '12px' }}
                                        >
                                            [삭제]
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* 새로 추가된 첨부파일 리스트 */}
                        {formData.files && formData.files.length > 0 && (
                            <div className="file-list" style={{ marginTop: '8px' }}>
                                {formData.files.map((file, idx) => (
                                    <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px', fontSize: '14px', color: '#007350' }}>
                                        <span>➕ [신규] {file.name}</span>
                                        <button
                                            type="button"
                                            onClick={() => handlers.handleFileDelete(idx, false)}
                                            style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer', fontSize: '12px' }}
                                        >
                                            [취소]
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* 버튼 영역 */}
                <div className="form-btn-wrap">
                    <button
                        type="button"
                        onClick={handlers.handleCancel}
                        className="my_btn-cancel"
                        disabled={loading}
                    >
                        취소
                    </button>
                    <button
                        type="submit"
                        className="my_btn-submit"
                        disabled={loading}
                    >
                        {loading ? '수정 처리 중...' : '수정 완료'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default MypageQnaEdit;