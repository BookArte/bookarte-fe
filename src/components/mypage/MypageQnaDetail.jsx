import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import URL from '@/constants/url';

function MypageQnaDetail({ data, onDelete }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const isCompleted = data.answerStatus === '답변 완료' || data.admAnswer;

    const handleDelete = () => {
        if (window.confirm("문의 내역을 정말 삭제하시겠습니까?")) {
            if (onDelete) onDelete(id);
        }
    };

    return (
        <div className="mypage-qna-detail">
            <h2>문의내역</h2>
            <p className="qna-desc">회원님이 작성하신 1:1 문의 상세 내용입니다.</p>

            <div className="qna-detail-header">
                <div className="qna-detail-title-row">
                    <h3 className="qna-detail-title">{data.title}</h3>
                    <span className={`status-badge ${isCompleted ? 'completed' : 'pending'}`}>
                        {data.answerStatus || (isCompleted ? '답변 완료' : '답변 대기')}
                    </span>
                </div>
                <div className="qna-detail-date">
                    작성일: {data.createdAt ? data.createdAt.replace('T', ' ').substring(0, 16) : '-'}
                </div>
            </div>

            <div className="qna-detail-content">
                {data.contents}
            </div>

            {data.fileList && data.fileList.length > 0 && (
                <div className="qna-detail-file">
                    <strong>첨부파일:</strong>
                    {data.fileList.map((file, idx) => (
                        <a key={idx} href={`${import.meta.env.VITE_API_BASE_URL}/board/file/download/${file.fileId}`} download>{file.originalName}</a>
                    ))}
                </div>
            )}

            {isCompleted && data.admAnswer && (
                <div className="qna-admin-answer">
                    <div className="qna-answer-header">
                        <strong>관리자 답변</strong>
                        <span className="qna-answer-date">
                            {data.admAnswerDate ? data.admAnswerDate.replace('T', ' ').substring(0, 16) : ''}
                        </span>
                    </div>
                    <div className="qna-answer-content">
                        {data.admAnswer && <div dangerouslySetInnerHTML={{ __html: data.admAnswer }} />}
                    </div>
                </div>
            )}

            <div className="qna-btn-wrap">
                <button onClick={() => navigate(URL.MYPAGE_QNA)} className="btn-list">
                    목록
                </button>
                {!isCompleted && (
                    <div className="qna-action-btns">
                        <button onClick={() => navigate(URL.MYPAGE_QNA_EDIT(id))} className="btn-edit">
                            수정
                        </button>
                        <button onClick={handleDelete} className="btn-delete">
                            삭제
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MypageQnaDetail;