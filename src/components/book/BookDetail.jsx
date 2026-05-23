import BookDetailLayout from "./BookDetailLayout";
import BorrowGraph from "./BorrowGraph";
import RelatedBooks from "./RelatedBooks";

function BookDetail({ book, stats, relatedBooks, loading, handlers }) {

    return (
        <BookDetailLayout
            book={book}
            stats={stats}
            loading={loading}
            handlers={handlers}
            renderBorrowGraph={() => <BorrowGraph stats={stats} />}
            renderRelatedBooks={() => <RelatedBooks relatedBooks={relatedBooks} handlers={handlers} />}
        />
    );
}

export default BookDetail;