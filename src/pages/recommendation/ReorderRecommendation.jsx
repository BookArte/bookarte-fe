import { reorderRecommendation } from '../../hooks/domain/reorderRecommendation';
import ReorderForm from '../../components/recommendation/ReorderForm';

function ReorderRecommendation() {
    return <ReorderForm {...reorderRecommendation()} />
}

export default ReorderRecommendation;