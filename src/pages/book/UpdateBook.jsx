import UpdateBookForm from "../../components/UpdateBookForm";
import { updateBook } from "../../hooks/domain/updateBook";

function UpdateBook() {
    return <UpdateBookForm {...updateBook()} />
}

export default UpdateBook