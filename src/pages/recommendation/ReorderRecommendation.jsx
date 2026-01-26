import { reorderRecommendation } from '../../hooks/domain/recommendation/reorderRecommendation';
import ReorderForm from '../../components/recommendation/ReorderForm';

function ReorderRecommendation() {
    return <ReorderForm {...reorderRecommendation()} />
}

export default ReorderRecommendation;