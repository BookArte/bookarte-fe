import BorrowHistoryView from "../../components/borrow/BorrowHistoryView";
import { useBorrowHistory } from "../../hooks/domain/borrow/useBorrowHisory";

function BorrowHistory() {
    return <BorrowHistoryView {...useBorrowHistory()} />;
}

export default BorrowHistory;