import { useFaqDetail } from "@/hooks/domain/faq/useFaqDetail";
import FaqDetail from "@/components/faq/FaqDetail";

function FaqDetailPage() {
    const { data, loading } = useFaqDetail();

    if (loading) {
        return <div>로딩 중...</div>;
    }

    return (
        <FaqDetail data={data} />
    );
}

export default FaqDetailPage;