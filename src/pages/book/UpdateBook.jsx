import UpdateBookForm from "../../components/book/UpdateBookForm";
import { useUpdate } from "../../hooks/domain/book/useUpdate";

function UpdateBook() {
    return <UpdateBookForm {...useUpdate()} />
}

export default UpdateBook