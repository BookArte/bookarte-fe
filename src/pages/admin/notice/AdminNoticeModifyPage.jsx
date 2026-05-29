import AdminNoticeModify from "@/components/notice/AdminNoticeModify";
import { useNoticeModify } from "@/hooks/domain/notice/useNoticeModify";

function AdminNoticeModifyPage() {

    const { formData, loading, handlers, refs } = useNoticeModify();

    return (
        <AdminNoticeModify
            formData={formData}
            loading={loading}
            handlers={handlers}
            refs={refs}
        />
    );
}

export default AdminNoticeModifyPage;