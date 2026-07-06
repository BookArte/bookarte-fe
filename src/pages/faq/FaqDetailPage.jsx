import { useFaqDetail } from "@/hooks/domain/faq/useFaqDetail";
import FaqDetail from "@/components/faq/FaqDetail";

function FaqDetailPage() {
    const { data, loading, handlers } = useFaqDetail();

    if (loading) {
        return <div>로딩 중...</div>;
    }

    return (
        <FaqDetail data={data} handlers={handlers} />
    );
}

export default FaqDetailPage;