import { useEffect, useState } from "react";
import { getBestSellerBookList } from "../../../api/book.api";
import { handleApiError } from "../../utils/errorHandler";

export function useBestSeller() {
    const [bestSellers, setBestSellers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBestSellers = async () => {
        setLoading(true);
        try {
            const res = await getBestSellerBookList();
            setBestSellers(res.data);
        } catch (error) {
            handleApiError(error, "베스트/스테디셀러 로드 실패");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBestSellers();
    }, []);

    return {
        bestSellers,
        status: {
            loading,
        }
    };

}