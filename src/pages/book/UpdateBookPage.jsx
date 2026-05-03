import UpdateBook from "../../components/book/UpdateBook";
import { useBookUpdate } from "../../hooks/domain/book/useBookUpdate";

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

