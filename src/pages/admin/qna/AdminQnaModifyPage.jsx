import AdminQnaModify from "@/components/qna/AdminQnaModify";
import { useQnaModify } from "@/hooks/domain/qna/useQnaModify";

function AdminQnaModifyPage() {

    const { formData, loading, handlers, refs } = useQnaModify();

    return (
        <AdminQnaModify
            formData={formData}
            loading={loading}
            handlers={handlers}
            refs={refs}
        />
    );
}

export default AdminQnaModifyPage;