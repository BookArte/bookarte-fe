import { useEffect } from "react";
import { getAllBookList } from "../../../api/book.api";
import { useBookList } from "./useBookList";

export function useTotalBookList() {
    const TYPE = 'totalBook';
    const {
        books,
        categories,
        params,
        status,
        pagination,
        handlers,
        getVirtualNumber
    } = useBookList({
        type: TYPE,
        fetchFn: getAllBookList,
        idKey: 'id',
        initialParams: {
            bookTitle: '',
            bookAuthor: '',
            publisherName: '',
            bookIsbn: '',
            publicationDateStart: '',
            publicationDateEnd: '',
            category: '',
            size: 10,
            sort: 'createdAt,desc'
        }
    });

    useEffect(() => {
        handlers.fetchBooks(0, params.searchParams);
    }, []);

    return {
        books,
        categories,
        status,
        pagination,
        params,
        handlers,
        getVirtualNumber
    };
}