import { NavLink } from "react-router-dom";

function MypageStatusCard({ icon, label, count, path }) {
    return (
        <div className="status-card-wrapper">
            <NavLink
                to={path}
                end={path === ''}
                className="status-card">
                <div className="status-card-left">
                    <div className="status-card-icon-box">
                        <img src={icon} alt={label} />
                    </div>
                    <span className="status-card-label">{label}</span>
                </div>
                <div className="status-card-right">
                    <span className="status-card-count">{count}</span>
                </div>
            </NavLink>
        </div>
    );
}

export default MypageStatusCard;