import { useState } from "react";
import PenaltyModal from "../modals/PenaltyModal";
import { getPenaltyStats } from "../../hooks/domain/penalty/getPenaltyStats";

function MypagePenaltyStatus({ penalties }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const stats = getPenaltyStats(penalties);

    if (!stats) return null;

    return (
        <div className="penalty-badge-wrapper">
            <span
                className="penalty-badge-trigger"
                onClick={() => setIsModalOpen(true)}
            >
                ⚠️ 패널티 적용 중 (D-{stats.remainingDays})
            </span>

            <PenaltyModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                penalties={penalties}
                stats={stats}
            />
        </div>
    );
}

export default MypagePenaltyStatus;