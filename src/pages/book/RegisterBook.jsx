import RegisterBookForm from "../../components/book/RegisterBookForm";
import { useRegister } from "../../hooks/domain/book/useRegister";

function RegisterBook() {
    return <RegisterBookForm {...useRegister()} />;
}

export default RegisterBook;