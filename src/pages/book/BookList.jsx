import GetBookList from "../../components/GetBookList"
import { getBookList } from "../../hooks/domain/getBookList";


function BookList() {

    return < GetBookList {...getBookList()} />;
}


export default BookList;