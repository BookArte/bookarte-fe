import DeleteBook from "../../components/book/admin/DeleteBook";
import { useBookDelete } from "../../hooks/domain/book/admin/useBookDelete";

function DeleteBookPage() {

    const { formData, loading, errors, handlers, refs, isAlreadyDeleted } = useBookDelete();

    return (
        <DeleteBook
            formData={formData}
            loading={loading}
            errors={errors}
            handlers={handlers}
            refs={refs}
            isAlreadyDeleted={isAlreadyDeleted}
        />
    );
}

export default DeleteBookPage;