import { useState } from "react";

function MainRecommend({ books, loading, handleViewBook }) {
    const [currentPage, setCurrentPage] = useState(0);
    const ITEMS_PER_PAGE = 5;

    const totalPages = Math.ceil(books.length / ITEMS_PER_PAGE);

    const startIndex = currentPage * ITEMS_PER_PAGE;
    const currentBooks = books.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const BookItem = ({ thumbnail, title, author, onClick }) => (
        <div className="book-item" onClick={onClick} style={{ cursor: 'pointer' }}>
            <img
                src={thumbnail}
                alt={title}
                className="thumbnail-img"
            />
            <div className="book-txt">
                <p className="b-title">{title}</p>
                <p className="b-author">{author}</p>
            </div>
        </div>
    );

    if (loading) {
        return (
            <section className="section-recommend">
                <div className="section-head">
                    <h3>북아티 <strong>추천도서</strong></h3>
                </div>
                <div style={{ padding: '40px', textAlign: 'center' }}>로딩 중입니다...</div>
            </section>
        );
    }

    return (
        <section className="section-recommend">
            <div className="section-head">
                <h3>북아티 <strong>추천도서</strong></h3>
            </div>
            <div className="recommend-slider">
                <div className="book-grid">
                    {currentBooks.length > 0 ? (
                        currentBooks.map((book) => (
                            <BookItem
                                key={book.bookId}
                                title={book.bookTitle}
                                author={book.bookAuthor}
                                thumbnail={book.bookThumbnail}
                                onClick={() => handleViewBook(book.bookId)}
                            />
                        ))
                    ) : (
                        <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '20px' }}>
                            추천 도서가 없습니다.
                        </div>
                    )}
                </div>

                {totalPages > 1 && (
                    <div className="slider-dots">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <span
                                key={index}
                                className={`dot ${currentPage === index ? 'active' : ''}`}
                                onClick={() => setCurrentPage(index)}
                                style={{ cursor: 'pointer' }}
                            ></span>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default MainRecommend;