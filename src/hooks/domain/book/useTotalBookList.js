import { getAllBookList } from "../../../api/book.api";
import { useBookList } from "./useBookList";

export function useTotalBookList() {
    const TYPE = 'totalBook';
    const {
        books,
        categories,
        params,
        status,
        total,
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
    return {
        books,
        categories,
        status,
        total,
        pagination,
        params,
        handlers,
        getVirtualNumber
    };
}