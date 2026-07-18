import BorrowHistoryView from "../../components/borrow/BorrowHistoryView";
import { useBorrowHistory } from "../../hooks/domain/borrow/useBorrowHistory";

function BorrowHistory() {
    return <BorrowHistoryView {...useBorrowHistory()} />;
}

export default BorrowHistory;