import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/page.css'

function BookDetail() {
    const { bookId } = useParams(); // URL 파라미터에서 ID 추출
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookDetail = async () => {
            try {
                // 상세 조회 API (엔드포인트는 실제 서버 설정에 맞게 수정)
                const response = await axios.get(`http://localhost:8080/api/book/view/${bookId}`);
                if (response.data.success) {
                    setBook(response.data.data);
                }
            } catch (error) {
                console.error("상세 정보 로딩 실패:", error);
                alert("존재하지 않는 도서이거나 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetail();
    }, [bookId]);

    if (loading) return <div className="book-detail-container">로딩 중...</div>;
    if (!book) return <div className="book-detail-container">도서 정보를 찾을 수 없습니다.</div>;

    return (
        <div className="book-detail-container">
            {/* 뒤로가기 버튼 */}
            <button onClick={() => navigate(-1)} style={{ marginBottom: '20px', cursor: 'pointer' }}>
                ← 목록으로 돌아가기
            </button>

            <div className="detail-header">
                {/* 도서 표지 */}
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
                                <td>{book.bookCategoryName}</td>
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

            {/* 책소개 섹션 */}
            <div className="detail-section">
                <h2 className="section-title">책소개</h2>
                <div className="contents-box">
                    {book.bookContents || "등록된 책소개가 없습니다."}
                </div>
            </div>
        </div>
    )
}


export default BookDetail