import ModalLayout from "./ModalLayout";

function PenaltyModal({ isOpen, onClose, penalties, stats }) {
    return (
        <ModalLayout
            isOpen={isOpen}
            onClose={onClose}
            title="나의 이용 제한 상세 내역"
            width="460px"
        >
            <div className="penalty-modal-inner">
                <div className="penalty-summary-card">
                    <span className="summary-label">최종 제한 기간</span>
                    <h3 className="summary-date-range">
                        {stats.startDate} ~ {stats.endDate}
                    </h3>
                    <p className="summary-countdown">
                        서비스 이용 재개까지 <strong>{stats.remainingDays}일</strong> 남았습니다.
                    </p>
                </div>
                <div className="penalty-detail-section">
                    <h4 className="detail-title">상세 제한 사유 ({penalties.length}건)</h4>
                    <ul className="penalty-reason-list">
                        {penalties.map((item) => (
                            <li key={item.penaltyId} className="penalty-reason-item">
                                {item.penaltyReason}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="penalty-modal-footer">
                    <p className="footer-notice">※ {stats.endDate}일 00:00 이후부터 정상 이용이 가능합니다.</p>
                    <button className="penalty-confirm-btn" onClick={onClose}>확인</button>
                </div>
            </div>
        </ModalLayout>
    );
}

export default PenaltyModal;