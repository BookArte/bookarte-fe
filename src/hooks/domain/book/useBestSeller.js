import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getBestSellerBookList } from "../../../api/book.api";

export function useBestSeller() {
    const [bestSellers, setBestSellers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBestSellers = async () => {
        setLoading(true);
        try {
            const res = await getBestSellerBookList();
            setBestSellers(res.data);
        } catch (error) {
            toast.error("베스트셀러 목록을 불러오는 중 오류가 발생했습니다.");
            console.error("Error fetching best sellers list:", error);
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