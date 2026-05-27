import BestSellerDetail from "../../components/book/BestSellerDetail";
import { useBestSellerDetail } from "../../hooks/domain/book/bestseller/useBestSellerDetail";

function BestSellerDetailPage() {
    const { book, loading } = useBestSellerDetail();

    return (
        <BestSellerDetail
            book={book}
            loading={loading}
        />
    )
}

export default BestSellerDetailPage;