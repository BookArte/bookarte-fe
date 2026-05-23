import { getAllBookList } from "@/api/book.api";
import { useState } from "react";
import { useDataFetch } from "@/hooks/utils/useDataFetch";

export function useBookSearch() {
    const [bookTitle, setbookTitle] = useState('');
    const [searchType, setSearchType] = useState('bookTitle');

    const handleSearch = async () => {
        if (!bookTitle.trim()) return alert("검색어를 입력하세요.");
        fetchData(0, {
            [searchType]: bookTitle,
            size: 10
        });
    };

    const {
        data: results,
        status,
        fetchData
    } = useDataFetch(getAllBookList);

    const { loading } = status;



    return {
        state: {
            bookTitle,
            setbookTitle,
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