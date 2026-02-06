function MypagePointBox({ point = 0 }) {
    return (
        <div className="mypage-point-box">
            <div className="point-content">
                <div className="point-text-area">
                    <span className="point-label">나의 독서 활동 포인트</span>
                    <div className="point-amount">
                        <strong>{point.toLocaleString()}</strong>
                        <span className="unit">P</span>
                    </div>
                </div>

                <div className="point-info-area">
                    <div className="point-status">
                        <span>포인트 등급: </span>
                        <span className="status-badge">일반회원</span>
                    </div>
                    <button className="point-guide-link">포인트 사용 안내</button>
                </div>
            </div>
        </div>
    );
}

export default MypagePointBox;