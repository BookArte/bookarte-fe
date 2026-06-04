import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import Loading from '@/components/common/Loading';
import Pagination from '../common/Pagination';
import URL from '@/constants/url';
import MypageListLayout from './MypageListLayout';

function MypageQnaList({ data, status, handlers, getVirtualNumber }) {
    const navigate = useNavigate();
    const { userData } = useOutletContext();

    const columns = [
        { label: "번호", width: "80px" },
        { label: "제목", width: "" },
        { label: "작성일", width: "120px" },
        { label: "상태", width: "100px" }
    ]

    const renderRow = (item, index) => {
        return (
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
        );
    };

    return (
        <div className="mypage-content-container">
            <div className="mypage-section-header">
                <div className="mypage-section-title-group">
                    <h2>문의내역</h2>
                    <p>회원님이 작성하신 1:1 문의 목록입니다.</p>
                </div>

                <button
                    className="write-qna-btn"
                    onClick={() => navigate('/qna/write')}
                >
                    질문하러 가기
                </button>
            </div>

            <MypageListLayout
                columns={columns}
                data={data}
                emptyMessage="작성된 문의 내역이 없습니다."
                renderRow={(item, index) => renderRow(item, index)}
                pagination={{
                    pageGroupSize: status.pageGroupSize,
                    currentPage: status.currentPage,
                    totalPages: status.totalPages,
                    handlePageChange: handlers.handlePageChange
                }}
            />
        </div>
    );
}

export default MypageQnaList;
