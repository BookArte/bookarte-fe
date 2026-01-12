import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/page.css';

function BookDetail() {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getBookDetail = async () => {
            try {
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

        getBookDetail();
    }, [bookId]);

    // 삭제 핸들러
    const handleDelete = async () => {
        if (window.confirm("정말로 이 도서를 삭제하시겠습니까?")) {
            try {
                const response = await axios.delete(`http://localhost:8080/api/book/${bookId}`);

                if (response.data.success) {
                    alert("삭제되었습니다.");
                    navigate('/book/list');
                } else {
                    alert("삭제에 실패했습니다: " + response.data.message);
                }
            } catch (error) {
                console.error("삭제 요청 중 오류 발생:", error);
                alert("삭제 처리 중 서버 오류가 발생했습니다.");
            }
        }
    };

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
                        onClick={() => navigate(`/book/update/${bookId}`)}

                    >
                        수정
                    </button>
                    <button
                        className='delete-btn'
                        onClick={handleDelete}
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

            <div className="detail-section">
                <h2 className="section-title">책소개</h2>
                <div className="contents-box">
                    {book.bookContents || "등록된 책소개가 없습니다."}
                </div>
            </div>
        </div>
    );
}


export default BookDetail;