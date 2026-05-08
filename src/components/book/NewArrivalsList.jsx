import BookListLayout from "./BookListLayout";

function NewArrivalsList({ arrivals, handlers, pagination, status }) {
    const MonthSelector = (
        <div className="month-selector">
            <button onClick={() => handlers.handleMonthChange(-1)} className="month-btn">◀ 이전 달</button>
            <span className="current-month">
                {status.selectedDate.getFullYear()}년 {String(status.selectedDate.getMonth() + 1).padStart(2, '0')}월
            </span>
            <button onClick={() => handlers.handleMonthChange(1)} className="month-btn">다음 달 ▶</button>
        </div>
    );

    const customHeader = (
        <p>이번 달에 총 <strong>{status.totalElements}</strong>권의 도서가 입고되었습니다.</p>
    );

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
            title="신착 도서"
            data={arrivals}
            pagination={pagination}
            status={status}
            searchBar={MonthSelector}
            customHeader={customHeader}
            renderItem={renderBooks}
        />
    );

}

export default NewArrivalsList;