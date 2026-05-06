import TotalBookList from "../../components/book/TotalBookList";
import { useTotalBookList } from "../../hooks/domain/book/useTotalBookList";

function TotalBookListPage() {
    const {
        books,
        categories,
        params,
        status,
        handlers,
        pagination
    } = useTotalBookList();
    return (
        <TotalBookList
            books={books}
            categories={categories}
            status={status}
            params={params}
            handlers={handlers}
            pagination={pagination}
        />
    );
}

export default TotalBookListPage;