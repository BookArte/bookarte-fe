import QnaWrite from "@/components/qna/QnaWrite";
import { useQnaWrite } from "@/hooks/domain/qna/useQnaWrite";

function QnaWritePage() {

    const { formData, loading, handlers, refs } = useQnaWrite();

    return (
        <QnaWrite
            formData={formData}
            loading={loading}
            handlers={handlers}
            refs={refs}
        />
    );
}

export default QnaWritePage;