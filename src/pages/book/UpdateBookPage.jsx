import UpdateBook from "@/components/book/admin/UpdateBook";
import { useBookUpdate } from "@/hooks/domain/book/admin/useBookUpdate";

function UpdateBookPage() {
    const { formData, loading, errors, handlers, refs } = useBookUpdate();
    return (
        <UpdateBook
            formData={formData}
            loading={loading}
            errors={errors}
            handlers={handlers}
            refs={refs}
        />
    );
}

export default UpdateBookPage;

