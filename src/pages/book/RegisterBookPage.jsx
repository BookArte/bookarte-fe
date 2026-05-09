import RegisterBook from "../../components/book/admin/RegisterBook";
import { useBookRegister } from "../../hooks/domain/book/admin/useBookRegister";


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