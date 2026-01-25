import { useRecommend } from '../../hooks/domain/useRecommend';
import RecommendationForm from '../../components/recommendation/RecommendationForm';


function SetRecommedation() {
    return <RecommendationForm {...useRecommend()} />
}

export default SetRecommedation;