import RegisterBookForm from "../../components/RegisterBookForm";
import { registerBook } from "../../hooks/domain/registerBook";

function RegisterBook() {
    return <RegisterBookForm {...registerBook()} />;
}

export default RegisterBook;