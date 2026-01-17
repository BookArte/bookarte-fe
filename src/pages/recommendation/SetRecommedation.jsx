import { setRecommendation } from '../../hooks/domain/setRecommendation';
import RecommendationForm from '../../components/RecommendationForm';


function SetRecommedation() {
    ;
    return <RecommendationForm {...setRecommendation()} />
}

export default SetRecommedation;