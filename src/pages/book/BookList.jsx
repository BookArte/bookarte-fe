import BookListView from "../../components/book/BookListView";
import { useBookList } from "../../hooks/domain/book/useBookList";


function BookList() {

    return < BookListView {...useBookList()} />;
}


export default BookList;