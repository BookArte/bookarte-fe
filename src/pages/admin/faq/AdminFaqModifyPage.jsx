import AdminFaqModify from "@/components/faq/AdminFaqModify";
import { useFaqModify } from "@/hooks/domain/faq/useFaqModify";

function AdminFaqModifyPage() {

    const { formData, loading, handlers, refs } = useFaqModify();

    return (
        <AdminFaqModify
            formData={formData}
            loading={loading}
            handlers={handlers}
            refs={refs}
        />
    );
}

export default AdminFaqModifyPage;