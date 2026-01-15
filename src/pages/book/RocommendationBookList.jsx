import { useState, useEffect } from 'react';
import '../../css/page.css'
import { useNavigate } from 'react-router-dom'
import { recommendationBookList } from '../../api/recommendation.api';

function RecommendationBookList() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await recommendationBookList();
            if (response.success) {
                setBooks(response.data);
            }
        } catch (error) {
            console.error("도서 목록 로딩 실패:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>로딩 중...</div>;

    return (
        <div className="book-list-container">
            <h2 className="recommend-list-title">🏆 추천 도서 TOP {books.length}</h2>

            {books.map((book) => (
                <div key={book.recommendationId} className="list-item recommend-item">
                    {/* 순위 배지 추가 */}
                    <div className="rank-badge">
                        <span className="rank-num">{book.priority}</span>
                        <span className="rank-text">위</span>
                    </div>

                    <div className="thumbnail-container">
                        <img
                            src={book.bookThumbnail}
                            alt={book.bookTitle}
                            className="thumbnail-img"
                        />
                    </div>

                    <div className="info-container">
                        <h3 className="title" onClick={() => navigate(`/book/view/${book.bookId}`)}>
                            {book.bookTitle}
                        </h3>

                        <div className="author-row">
                            <span className="text-item">{book.bookAuthor} 지음</span>
                            {book.bookTranslator && <span className="text-item"> | {book.bookTranslator} 옮김</span>}
                            <span className="text-item"> | {book.publisherName}</span>
                            <span className="text-item"> | {book.publicationDate}</span>
                        </div>

                        {/* 관리자 코멘트 섹션 추가 */}
                        {book.comments && (
                            <div className="admin-comment-box">
                                <span className="quote-icon">"</span>
                                <p className="comment-text">{book.comments}</p>
                                <span className="quote-icon">"</span>
                            </div>
                        )}

                        <div className="meta-container">
                            <div className="meta-item">
                                <span className="meta-label">자료실</span>
                                <span className="meta-value">{book.bookCategoryName}</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">ISBN</span>
                                <span className="meta-value">{book.bookIsbn}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}


export default RecommendationBookList;