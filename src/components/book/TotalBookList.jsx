import BookListSearchBar from "./BookListSearchBar"
import BookListLayout from "./BookListLayout"

function TotalBookList({ books, categories, status, params, handlers, pagination }) {
    const renderBooks = (book) => {
        return (
            <div key={book.bookId} className="list-item">
                <div className="thumbnail-container">
                    <img
                        src={book.bookThumbnail}
                        alt={book.bookTitle}
                        className="thumbnail-img"
                    />
                </div>

                <div className="info-container">
                    <h3 className="title" onClick={() => handlers.handleViewBook(book.bookId)}>
                        {book.bookTitle}
                    </h3>

                    <div className="author-row">
                        <span className="text-item">{book.bookAuthor} 지음</span>
                        {book.bookTranslator && <span className="text-item"> | {book.bookTranslator} 옮김</span>}
                        <span className="text-item"> | {book.publisherName}</span>
                        <span className="text-item"> | {book.publicationDate}</span>
                    </div>

                    <div className="meta-container">
                        <div className="meta-item">
                            <span className="meta-label">카테고리</span>
                            <span className="meta-value">{book.bookCategory}</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">청구기호</span>
                            <span className="meta-value">{book.bookCallNumber}</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">ISBN</span>
                            <span className="meta-value">{book.bookIsbn}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <BookListLayout
            title="도서 검색"
            data={books}
            pagination={pagination}
            status={status}
            searchBar={
                <BookListSearchBar
                    categories={categories}
                    search={params}
                    status={status}
                    handlers={handlers}
                    categories={categories}
                />
            }
            renderItem={renderBooks}
        />
    )
}

export default TotalBookList;