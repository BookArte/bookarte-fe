import MyBorrowHistoryView from "../../components/borrow/MyBorrowHistoryView";
import { useMyBorrowHistory } from "../../hooks/domain/borrow/useMyBorrowHistory";

function MyBorrowHistory() {
    return <MyBorrowHistoryView {...useMyBorrowHistory()} />
}
export default MyBorrowHistory;