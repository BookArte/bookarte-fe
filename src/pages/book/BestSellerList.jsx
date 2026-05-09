import BestSellerListView from "@/components/book/BestSellerListView";
import { useBestSeller } from "@/hooks/domain/book/bestseller/useBestSeller";

function BestSellerList() {
    return <BestSellerListView {...useBestSeller()} />;
}

export default BestSellerList;