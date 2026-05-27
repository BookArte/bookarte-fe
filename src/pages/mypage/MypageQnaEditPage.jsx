import { useParams } from "react-router-dom";
import MypageQnaEdit from "@/components/mypage/MypageQnaEdit";
import { useQnaModify } from "@/hooks/domain/qna/useQnaModify";
import URL from "@/constants/url";

function MypageQnaEditPage() {
    const { id } = useParams();

    const { formData, loading, handlers, refs } = useQnaModify({ redirectUrl: URL.MYPAGE_QNA_VIEW(id) });

    return (
        <MypageQnaEdit
            formData={formData}
            loading={loading}
            handlers={handlers}
            refs={refs}
        />
    );
}

export default MypageQnaEditPage;