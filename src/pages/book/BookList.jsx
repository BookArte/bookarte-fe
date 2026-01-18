import BookListView from "../../components/BookListView";
import { useBookList } from "../../hooks/domain/useBookList";


function BookList() {

    return < BookListView {...useBookList()} />;
}


export default BookList;