import MypageQnaDetail from "@/components/mypage/MypageQnaDetail";
import { useQnaDetail } from "@/hooks/domain/qna/useQnaDetail";

function MypageQnaDetailPage() {
    const { data, loading, onDelete } = useQnaDetail();

    if (loading) {
        return <div>로딩 중...</div>;
    }

    return (
        <MypageQnaDetail data={data} onDelete={onDelete} />
    );
}

export default MypageQnaDetailPage;