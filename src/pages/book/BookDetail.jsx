import BookDetailView from "../../components/BookDetailView";
import { useBookDetail } from "../../hooks/domain/useBookDetail";

function BookDetail() {
    return <BookDetailView {...useBookDetail()} />;
}


export default BookDetail;