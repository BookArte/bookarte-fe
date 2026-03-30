import AdminNewsWrite from "@/components/news/AdminNewsWrite";
import { useNewsWrite } from "@/hooks/domain/news/useNewsWrite";

function AdminNewsWritePage() {

    const { formData, loading, handlers, refs } = useNewsWrite();

    return (
        <AdminNewsWrite
            formData={formData}
            loading={loading}
            handlers={handlers}
            refs={refs}
        />
    );
}

export default AdminNewsWritePage;