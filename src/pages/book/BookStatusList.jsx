import BookStatusListView from "../../components/book/BookStatusListView";
import { useBookStatusList } from "../../hooks/domain/book/useBookStatusList";

function BookStatusList() {
    return <BookStatusListView {...useBookStatusList()} />
}

export default BookStatusList;