import { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBookForm } from "@/hooks/domain/book/admin/useBookForm";
import { getBookDetailByBookId, updateBookByBookId } from "@/api/book.api";

export function useBookUpdate() {
    const { bookId } = useParams();
    const [initialData, setInitialData] = useState(null);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await getBookDetailByBookId(bookId);
                if (res.success) {
                    setInitialData(res.data);
                }
            } catch (error) {
                console.error("데이터 로드 실패:", error);
            } finally {
                setFetching(false);
            }
        };

        fetchDetail();
    }, [bookId]);

    const formProps = useBookForm({
        initialData: initialData,
        submitFn: (data) => updateBookByBookId(bookId, data),
        isEdit: true
    });

    return {
        ...formProps,
        fetching
    };
}