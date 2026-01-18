import BookDetailView from "../../components/book/BookDetailView";
import { useBookDetail } from "../../hooks/domain/book/useBookDetail";

function BookDetail() {
    return <BookDetailView {...useBookDetail()} />;
}


export default BookDetail;