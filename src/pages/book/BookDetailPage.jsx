import BookDetail from "../../components/book/BookDetail";
import { useBookDetail } from "../../hooks/domain/book/useBookDetail";

function BookDetailPage() {
    const { book, stats, relatedBooks, loading, handlers } = useBookDetail();

    if (loading) {
        return <div className="book-detail-container">로딩 중...</div>;
    }

    return (
        <BookDetail
            book={book}
            stats={stats}
            relatedBooks={relatedBooks}
            handlers={handlers}
        />
    )
}

export default BookDetailPage;