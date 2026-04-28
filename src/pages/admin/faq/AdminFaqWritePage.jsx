import AdminFaqWrite from "@/components/faq/AdminFaqWrite";
import { useFaqWrite } from "@/hooks/domain/faq/useFaqWrite";

function AdminFaqWritePage() {

    const { formData, loading, handlers, refs } = useFaqWrite();

    return (
        <AdminFaqWrite
            formData={formData}
            loading={loading}
            handlers={handlers}
            refs={refs}
        />
    );
}

export default AdminFaqWritePage;