import { reorderRecommendation } from '../../hooks/domain/reorderRecommendation';
import ReorderForm from '../../components/ReorderForm';

function ReorderRecommendation() {
    return <ReorderForm {...reorderRecommendation()} />
}

export default ReorderRecommendation;