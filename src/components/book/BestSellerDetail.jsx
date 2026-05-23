import BookDetailLayout from "./BookDetailLayout";

function BestSellerDetail({ book, loading }) {
    return (
        <BookDetailLayout
            book={book}
            loading={loading}
            renderBorrowGraph={() => null}
            renderRelatedBooks={() => null}
        />
    );
}

export default BestSellerDetail;