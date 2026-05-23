import BookListLayout from "./BookListLayout";

function BestSellerList({ bestSellers, status, handlers, pagination }) {

    const renderBooks = (bestSeller) => {
        return (
            <div key={bestSeller.bookIsbn} className="list-item">
                <div className="thumbnail-container">
                    <img
                        src={bestSeller.bookThumbnail}
                        alt={bestSeller.bookTitle}
                        className="thumbnail-img"
                    />
                </div>

                <div className="info-container">
                    <h3 className="title" onClick={() => handlers.handleViewBook(bestSeller.bookIsbn)}>
                        {bestSeller.bookTitle}
                    </h3>

                    <div className="author-row">
                        <span className="text-item">{bestSeller.bookAuthor} 지음</span>
                        {bestSeller.bookTranslator && <span className="text-item"> | {bestSeller.bookTranslator} 옮김</span>}
                        <span className="text-item"> | {bestSeller.publisherName}</span>
                        <span className="text-item"> | {bestSeller.publicationDate}</span>
                    </div>

                    <div className="meta-container">
                        <div className="meta-item">
                            <span className="meta-label">카테고리</span>
                            <span className="meta-value">{bestSeller.bookCategory}</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">청구기호</span>
                            <span className="meta-value">{bestSeller.bookCallNumber}</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">ISBN</span>
                            <span className="meta-value">{bestSeller.bookIsbn}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <BookListLayout
            title="베스트셀러"
            data={bestSellers}
            status={status}
            pagination={pagination}
            renderItem={renderBooks}

        />
    );
}

export default BestSellerList;