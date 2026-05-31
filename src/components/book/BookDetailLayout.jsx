import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

function BookDetailLayout({
    book,
    stats,
    loading,
    handlers,
    showLibraryActions = true,
    renderBorrowGraph,
    renderRelatedBooks,
}) {
    const navigate = useNavigate();

    if (loading) return <div className="book-detail-container">로딩 중...</div>;
    if (!book) return <div className="book-detail-container">도서 정보를 찾을 수 없습니다.</div>;

    return (
        <div className="book-detail-container">
            {/* 상단 버튼 영역 */}
            <div className="back-btn">
                <button onClick={() => navigate(-1)} >
                    ← 목록으로 돌아가기
                </button>
            </div>

            <div className="detail-header">

                <img
                    src={book.bookThumbnail || 'https://via.placeholder.com/200x280'}
                    alt={book.bookTitle}
                    className="detail-thumbnail"
                />

                <div className="detail-main-info">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h1 className="detail-title">{book.bookTitle}</h1>
                        {showLibraryActions && (
                            <button
                                className={`wish-btn ${book.wish ? 'active' : ''}`}
                                onClick={() => handlers.handleToggleWish(book.bookId)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                                <Heart
                                    size={28}
                                    color={book.wish ? "#e74c3c" : "#ccc"}
                                    fill={book.wish ? "#e74c3c" : "none"}
                                    style={{ transition: 'all 0.3s ease' }}
                                />
                            </button>
                        )}
                    </div>

                    <table className="info-table">
                        <tbody>
                            <tr>
                                <th>저자</th>
                                <td>{book.bookAuthor}</td>
                                <th>역자</th>
                                <td>{book.bookTranslator || '-'}</td>
                            </tr>
                            <tr>
                                <th>출판사</th>
                                <td>{book.publisherName}</td>
                                <th>발행일</th>
                                <td>{book.publicationDate}</td>
                            </tr>
                            <tr>
                                <th>카테고리</th>
                                <td>{book.bookCategory}</td>
                                <th>ISBN</th>
                                <td>{book.bookIsbn}</td>
                            </tr>
                            <tr>
                                <th>청구기호</th>
                                <td colSpan="3" className="call-number-highlight">
                                    {book.bookCallNumber || '정보 없음'}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {showLibraryActions && (
                    <div className="button-area">
                        <button
                            className={`borrow-btn ${!book.canBorrow ? 'disabled' : ''}`}
                            onClick={() => handlers.handleBorrow(book.bookId)}
                            disabled={!book.canBorrow}
                        >
                            {book.canBorrow ? '대출' : '대출 불가'}
                        </button>
                    </div>
                    )}
                </div>
            </div>

            <div className="detail-section">
                <h2 className="section-title">책소개</h2>
                <div className="contents-box">
                    {book.bookContents || "등록된 책소개가 없습니다."}
                </div>
            </div>

            {/* 대출 통계 섹션 */}
            {renderBorrowGraph()}

            {/* 연관 도서 섹션 */}
            {renderRelatedBooks()}
        </div>
    );
}

export default BookDetailLayout;
