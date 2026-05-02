import RegisterBook from "../../components/book/RegisterBook";
import { useBookForm } from "../../hooks/domain/book/useBookForm";
import { useBookRegister } from "../../hooks/domain/book/useBookRegister";

function RegisterBookPage() {
    const { search, formData, loading, errors, handlers, refs } = useBookRegister();
    return (
        <RegisterBook
            search={search}
            formData={formData}
            loading={loading}
            errors={errors}
            handlers={handlers}
            refs={refs}
        />
    );
}

export default RegisterBookPage;