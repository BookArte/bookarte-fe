import { useNewsDetail } from "@/hooks/domain/news/useNewsDetail";
import NewsDetail from "@/components/news/NewsDetail";

function NewsDetailPage() {
    const { data, loading } = useNewsDetail();

    if (loading) {
        return <div>로딩 중...</div>;
    }

    return (
        <NewsDetail data={data} />
    );
}

export default NewsDetailPage;