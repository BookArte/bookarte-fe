import PenaltyManagementForm from '../../components/penalty/PenaltyMangementForm';
import { usePenaltyManage } from '../../hooks/domain/penalty/usePenaltyManage';

function PenaltyManagement() {
    return < PenaltyManagementForm {...usePenaltyManage()} />
}

export default PenaltyManagement;