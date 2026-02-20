import RecommendationHistoryView from "../../components/recommendation/RecommendationHistoryView";
import { useRecommendationHistory } from "../../hooks/domain/recommendation/useRecommendationHistory";

function RecommendationHistory() {
    return < RecommendationHistoryView {...useRecommendationHistory()} />;
}

export default RecommendationHistory;