import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBookList } from "../../api/book.api";

export function getBookList() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalElements, setTotalElements] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const res = await getAllBookList();
            if (res.success) {
                setBooks(res.data.content);
                setTotalElements(res.data.totalElements);
            }
        } catch (error) {
            console.error("도서 목록 로딩 실패:", error);
        } finally {
            setLoading(false);
        }
    };

    return {
        books,
        loading,
        totalElements,
        navigate
    };


}