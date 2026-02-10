function MyBorrowStatus({ borrows, loading, getStatusConfig, handlers }) {
    const { handleExtend, handleReturnRequest, handleViewBook } = handlers;

    if (loading) return <div className="book-detail-container">로딩 중...</div>;

    return (
        <div className="borrow-status-wrapper">
            <div className="status-content-container">
                <div className="borrow-status-header">
                    <h2 className="borrow-status-title">대출현황</h2>
                    <p className="borrow-status-subtitle">
                        대출 후 일주일이 지나면 1회에 한하여 반납 기한을 연장할 수 있습니다.
                        단, 연체 중인 도서에 대해서는 연장이 불가합니다.
                    </p>
                </div>

                <div className="list-container">
                    {borrows.length > 0 ? (
                        borrows.map((item) => {
                            const statusConfig = getStatusConfig(item.status);
                            return (

                                /* 카드 객체: shadow와 border로 구분감 부여 */
                                <div key={item.borrowId} className="list-item borrow-card">
                                    <div className="thumbnail-container">
                                        <img
                                            src={item.bookThumbnail || 'https://via.placeholder.com/120x170'}
                                            alt={item.bookTitle}
                                            className="thumbnail-img"
                                        />
                                    </div>

                                    <div className="info-container">
                                        <h3 className="title" onClick={() => handleViewBook(item.bookId)}>
                                            {item.bookTitle}
                                        </h3>

                                        <div className="author-row">
                                            <span className="text-item">{item.bookAuthor} 지음</span>
                                            <span className="text-item"> | {item.publisherName}</span>
                                        </div>

                                        {/* 대출 세부 정보 바 (이미지 참고) */}
                                        <div className="borrow-info-bar">
                                            <div className="info-group">
                                                <span className="label">대출일</span>
                                                <span className="value">{item.borrowDate}</span>
                                            </div>
                                            <div className="info-group">
                                                <span className="label">반납예정일</span>
                                                <span className={`value ${item.overdue ? 'red' : ''}`}>
                                                    {item.returnDueDate}
                                                </span>
                                            </div>
                                            <div className="info-group">
                                                <span className="label">상태</span>
                                                {item.overdue ? (
                                                    <span className="status-badge red">연체 {item.overdueDays}일</span>
                                                ) : (
                                                    <span className={statusConfig.className}>
                                                        {statusConfig.label}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* 우측 하단 버튼 배치 */}
                                        <div className="action-area">
                                            <button
                                                className="btn-small btn-white"
                                                onClick={() => handleExtend(item.borrowId)}
                                                disabled={!item.canExtend}
                                            >
                                                연장 신청
                                            </button>
                                            <button
                                                className="btn-small btn-primary"
                                                onClick={() => handleReturnRequest(item.borrowId)}
                                            >
                                                반납 요청
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        )
                    ) : (
                        <div className="empty-status-box">
                            <div className="empty-icon">🔍</div>
                            <p>현재 대출 중인 내역이 없습니다.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyBorrowStatus