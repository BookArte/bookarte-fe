import AdminNewsModify from "@/components/news/AdminNewsModify";
import { useNewsModify } from "@/hooks/domain/news/useNewsModify";

function AdminNewsModifyPage() {

    const { formData, loading, handlers, refs } = useNewsModify();

    return (
        <AdminNewsModify
            formData={formData}
            loading={loading}
            handlers={handlers}
            refs={refs}
        />
    );
}

export default AdminNewsModifyPage;