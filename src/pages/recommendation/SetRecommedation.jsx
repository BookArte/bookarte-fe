import { useRecommend } from '../../hooks/domain/recommendation/useRecommend';
import RecommendationForm from '../../components/recommendation/RecommendationForm';


function SetRecommedation() {
    return <RecommendationForm {...useRecommend()} />
}

export default SetRecommedation;