import MyBorrowStatus from "../../components/borrow/MyBorrowStatus";
import { useMyBorrowList } from "../../hooks/domain/borrow/useMyBorrowStatus";

function MyBorrowStatusList() {
    return < MyBorrowStatus {...useMyBorrowList()} />
}

export default MyBorrowStatusList;