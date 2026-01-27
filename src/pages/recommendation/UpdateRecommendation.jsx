import UpdateRecommendationForm from "../../components/recommendation/UpdateRecommendationForm";
import { useUpdateRecommendation } from "../../hooks/domain/recommendation/useUpdateRecommendation";

function UpdateRecommendation() {
    return < UpdateRecommendationForm {...useUpdateRecommendation()} />
}

export default UpdateRecommendation;