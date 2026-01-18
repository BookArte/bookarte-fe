import { getAllBookList } from "../../../api/book.api";
import { useState } from "react";

export function useBookSearch() {
    const [keyword, setKeyword] = useState('');
    const [searchType, setSearchType] = useState('keyword');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!keyword.trim()) return alert("검색어를 입력하세요.");
        setLoading(true);
        try {
            //도서  검색
            const res = await getAllBookList({
                params: { [searchType]: keyword, size: 10 }
            });
            if (res.success) {
                setResults(res.data.content);
            }
        } catch (error) {
            console.error("검색 실패", error);
        } finally {
            setLoading(false);
        }
    };
    return {
        state: {
            keyword,
            setKeyword,
            searchType,
            setSearchType,
            results,
            loading
        },
        handlers: {
            handleSearch
        }
    };
}