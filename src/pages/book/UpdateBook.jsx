import UpdateBookForm from "../../components/Book/UpdateBookForm";
import { useUpdate } from "../../hooks/domain/book/useUpdate";

function UpdateBook() {
    return <UpdateBookForm {...useUpdate()} />
}

export default UpdateBook