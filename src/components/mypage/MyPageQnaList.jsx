import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import Loading from '@/components/common/Loading';
import Pagination from '../common/Pagination';

function MyPageQnaList({ data, status, handlers, getVirtualNumber }) {
    const navigate = useNavigate();
    const { userData } = useOutletContext();

    return (
        <div className="mypage-content-container">
            <div className="mypage-section-header">
                <h2>문의내역</h2>
                <p>회원님이 작성하신 1:1 문의 목록입니다.</p>
            </div>

            <div className="qna-list-table-wrapper">
                <table className="qna-list-table">
                    <thead>
                        <tr>
                            <th style={{ width: '80px' }}>번호</th>
                            <th>제목</th>
                            <th style={{ width: '120px' }}>작성일</th>
                            <th style={{ width: '100px' }}>상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.length > 0 ? (
                            data.map((item, index) => (
                                <tr key={item.id} onClick={() => handlers.handleView(item.id)} className="cursor-pointer">
                                    <td>{getVirtualNumber(index)}</td>
                                    <td className="text-left">{item.title}</td>
                                    <td>{item.createdAt ? item.createdAt.split('T')[0] : '-'}</td>
                                    <td>
                                        <span className={`status-badge ${item.answerStatus === '답변 완료' ? 'completed' : 'pending'}`}>
                                            {item.answerStatus}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="empty-row">작성된 문의 내역이 없습니다.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {
                data.length > 0 && (
                    <Pagination
                        pageGroupSize={status.pageGroupSize}
                        currentPage={status.currentPage}
                        totalPages={status.totalPages}
                        handlePageChange={status.handlePageChange}
                    />
                )
            }
        </div>
    );
}

export default MyPageQnaList;