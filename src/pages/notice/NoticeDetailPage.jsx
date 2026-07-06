import { useNoticeDetail } from "@/hooks/domain/notice/useNoticeDetail";
import NoticeDetail from "@/components/notice/NoticeDetail";

function NoticeDetailPage() {
    const { data, loading, handlers } = useNoticeDetail();

    if (loading) {
        return <div>로딩 중...</div>;
    }

    return (
        <NoticeDetail data={data} handlers={handlers} />
    );
}

export default NoticeDetailPage;