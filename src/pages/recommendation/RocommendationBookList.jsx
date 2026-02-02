import RecommendationListView from "../../components/recommendation/RecomendationListView";
import { useRecommendationList } from "../../hooks/domain/recommendation/useRecommendationList";

function RecommendationBookList() {
    return <RecommendationListView{...useRecommendationList()} />;
}

export default RecommendationBookList;