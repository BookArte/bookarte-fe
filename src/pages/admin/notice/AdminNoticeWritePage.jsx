import AdminNoticeWrite from "@/components/notice/AdminNoticeWrite";
import { useNoticeWrite } from "@/hooks/domain/notice/useNoticeWrite";

function AdminNoticeWritePage() {

    const { formData, loading, handlers, refs } = useNoticeWrite();

    return (
        <AdminNoticeWrite
            formData={formData}
            loading={loading}
            handlers={handlers}
            refs={refs}
        />
    );
}

export default AdminNoticeWritePage;