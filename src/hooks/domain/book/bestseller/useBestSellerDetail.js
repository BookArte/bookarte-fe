import { useLocation, useNavigate, useParams } from "react-router-dom";
import { searchBookWithAPiByIsbn } from "../../../../api/book.api";
import { useEffect, useState } from "react";
import { handleApiError } from "../../../utils/errorHandler";
import URL from '@/constants/url';

export function useBestSellerDetail() {
    const { isbn } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const fetchBestSeller = async () => {
            setLoading(true);
            try {
                const res = await searchBookWithAPiByIsbn(isbn);
                if (res.success === false || !res.data) {
                    throw new Error('Book not found');
                }
                setBook(res.data);
            } catch (error) {
                handleApiError(error, "베스트셀러 도서 상세 정보 로드 실패");
                const savedPage = location.state?.fromPage !== undefined ? location.state.fromPage : 0;
                const fallbackPath = location.state?.fromPath || URL.BOOK_BEST;
                navigate(fallbackPath, { replace: true, state: { restorePage: savedPage } });
            } finally {
                setLoading(false);
            }
        };
        fetchBestSeller();
    }, [isbn, navigate, location.state]);

    return {
        book,
        loading
    }
}
