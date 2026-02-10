function BorrowDashboard({ borrow, stats, loading, handleApprove, getStatusConfig }) {
    const { totalElements, pendingReturns, overdueCount } = stats;
    const { content, pageable } = borrow;

    if (loading) return <div className="book-detail-container">로딩 중...</div>;
    if (!borrow) return <div className="book-detail-container">대출 이력 정보를 찾을 수 없습니다.</div>;

    return (
        <div className='borrow-dashboard-background' >
            <div className='borrow-dashboard-container'>
                <h2 className="borrow-dashboard-title">대출 및 반납 현황 관리</h2>

                {/* 상단 요약 지표 */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                    <div className="stat-card">
                        <span className="stat-label">전체 대출</span>
                        <span className="stat-value">{totalElements}</span>
                    </div>
                    <div className="stat-card active-orange">
                        <span className="stat-label">반납 승인 대기</span>
                        <span className="stat-value">{pendingReturns}</span>
                    </div>
                    <div className="stat-card active-red">
                        <span className="stat-label">연체 도서</span>
                        <span className="stat-value">{overdueCount}</span>
                    </div>
                </div>

                {/* 대출 목록 테이블 섹션 */}
                <div className='table-card-container'>
                    <div className='table-header-tool'>
                        <span>총 <b>{totalElements}</b>건 검색</span>
                    </div>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th style={{ width: '150px' }}>대출자(ID)</th>
                                <th>도서명</th>
                                <th style={{ width: '120px' }}>대출일</th>
                                <th style={{ width: '120px' }}>반납예정일</th>
                                <th style={{ width: '120px' }}>상태</th>
                                <th style={{ width: '150px' }}>반납 승인</th>
                            </tr>
                        </thead>
                        <tbody>
                            {content?.map((item) => {
                                const statusConfig = getStatusConfig(item.status);
                                const isActionRequired = item.status === 'RETURN_REQUESTED';

                                return (
                                    <tr key={item.borrowId} className={isActionRequired ? 'row-highlight' : ''}>
                                        <td className="text-center"><b>{item.memberName}</b><br /><small>({item.memberUserId})</small></td>
                                        <td className="text-left">{item.bookTitle}</td>
                                        <td className="text-center">{item.borrowDate}</td>
                                        <td className="text-center">{item.returnDueDate}</td>
                                        <td className="text-center">
                                            {item.overdue ? (
                                                <span className="status-badge red">연체 {item.overdueDays}일</span>
                                            ) : (
                                                <span className={statusConfig.className}>
                                                    {statusConfig.label}
                                                </span>
                                            )}
                                        </td>
                                        <td className="text-center">
                                            <button
                                                className={`btn-approve ${isActionRequired ? 'active' : 'disabled'}`}
                                                onClick={() => handleApprove(item.borrowId)}
                                                disabled={!isActionRequired}
                                            >
                                                {isActionRequired ? '승인' : '대기'}
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                            )}
                        </tbody>
                    </table>

                    {/*  페이지네이션 */}
                    <div className="pagination-wrapper">
                        {/* 페이지네이션 컴포넌트 */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BorrowDashboard;