import AdminQnaWrite from "@/components/qna/AdminQnaWrite";
import { useQnaWrite } from "@/hooks/domain/qna/useQnaWrite";

function AdminQnaWritePage() {

    const { formData, loading, handlers, refs } = useQnaWrite();

    return (
        <AdminQnaWrite
            formData={formData}
            loading={loading}
            handlers={handlers}
            refs={refs}
        />
    );
}

export default AdminQnaWritePage;