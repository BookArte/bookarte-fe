import MypageBorrowHistoryList from "../../components/mypage/MypageBorrowHistoryList";
import { useMyBorrowHistory } from "../../hooks/domain/borrow/useMyBorrowHistory";

function MypageBorrowHistoryListPage() {
    const { data, status, handlers, getVirtualNumber } = useMyBorrowHistory();

    return (
        <MypageBorrowHistoryList
            data={data}
            status={status}
            handlers={handlers}
            getVirtualNumber={getVirtualNumber}
        />
    );
}

export default MypageBorrowHistoryListPage;