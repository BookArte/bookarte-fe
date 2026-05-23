import BestSellerList from "../../components/book/BestSellerList";
import { useBestSeller } from "../../hooks/domain/book/bestseller/useBestSeller";

function BestSellerListPage() {
    const { bestSellers, status, handlers, pagination } = useBestSeller();

    return (
        <BestSellerList
            bestSellers={bestSellers}
            status={status}
            handlers={handlers}
            pagination={pagination}
        />
    );
}

export default BestSellerListPage;