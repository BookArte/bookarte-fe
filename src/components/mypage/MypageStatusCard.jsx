function MypageStatusCard({ icon, label, count }) {
    return (
        <div className="status-card">
            <div className="status-card-left">
                <div className="status-card-icon-box">
                    <img src={icon} alt={label} />
                </div>
                <span className="status-card-label">{label}</span>
            </div>
            <div className="status-card-right">
                <span className="status-card-count">{count}</span>
            </div>
        </div>
    );
}

export default MypageStatusCard;