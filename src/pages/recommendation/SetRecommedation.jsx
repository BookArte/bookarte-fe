import RecommendationForm from '../../components/recommendation/RecommendationForm';
import { useRecommendation } from '../../hooks/domain/recommendation/useRecommendation';


function SetRecommedation() {
    return <RecommendationForm {...useRecommendation()} />
}

export default SetRecommedation;