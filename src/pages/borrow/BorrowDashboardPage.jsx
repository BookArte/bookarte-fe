import BorrowDashboard from "../../components/borrow/BorrowDashboard";
import { useBorrowDashboard } from "../../hooks/domain/borrow/useBorrowDashboard";

function BorrowDashboardPage() {
    return <BorrowDashboard {...useBorrowDashboard()} />
}

export default BorrowDashboardPage;