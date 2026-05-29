import { useParams } from "react-router-dom";
import { searchBookWithAPiByIsbn } from "../../../../api/book.api";
import { useEffect, useState } from "react";
import { handleApiError } from "../../../utils/errorHandler";

export function useBestSellerDetail() {
    const { isbn } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBestSeller = async () => {
            setLoading(true);
            try {
                // Assuming you have an API function to fetch a single bestseller book by ISBN
                const res = await searchBookWithAPiByIsbn(isbn);
                setBook(res.data);
            } catch (error) {
                handleApiError(error, "베스트셀러 책 로드 실패");
            } finally {
                setLoading(false);
            }
        };
        fetchBestSeller();
    }, [isbn]);

    return {
        book,
        loading
    }
}