import { useNavigate } from "react-router-dom";


function BookDetailView({ book, loading, handlers }) {
    const { handleDelete, handleUpdate } = handlers;
    const navigate = useNavigate();

    if (loading) return <div className="book-detail-container">로딩 중...</div>;
    if (!book) return <div className="book-detail-container">도서 정보를 찾을 수 없습니다.</div>;

    return (
        <div className="book-detail-container">
            {/* 상단 버튼 영역 */}
            <div className='back-btn' style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <button onClick={() => navigate(-1)} >
                    ← 목록으로 돌아가기
                </button>

                {/* 수정 및 삭제 버튼 세트 */}
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        className='update-btn'
                        onClick={() => handleUpdate(book.bookId)}

                    >
                        수정
                    </button>
                    <button
                        className='delete-btn'
                        onClick={() => handleDelete(book.bookId)}
                    >
                        삭제
                    </button>
                </div>
            </div>

            <div className="detail-header">
                <img
                    src={book.bookThumbnail || 'https://via.placeholder.com/200x280'}
                    alt={book.bookTitle}
                    className="detail-thumbnail"
                />

                <div className="detail-main-info">
                    <h1 className="detail-title">{book.bookTitle}</h1>

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
                </div>
            </div>

            <div className="detail-section">
                <h2 className="section-title">책소개</h2>
                <div className="contents-box">
                    {book.bookContents || "등록된 책소개가 없습니다."}
                </div>
            </div>
        </div>
    );
}
export default BookDetailView;