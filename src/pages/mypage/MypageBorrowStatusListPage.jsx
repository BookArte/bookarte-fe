import MypageBorrowStatus from "../../components/borrow/MypageBorrowStatus";
import { useMyBorrowList } from "../../hooks/domain/borrow/useMyBorrowStatus";

function MypageBorrowStatusListPage() {
    return < MypageBorrowStatus {...useMyBorrowList()} />
}

export default MypageBorrowStatusListPage;