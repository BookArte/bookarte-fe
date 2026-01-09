import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/page.css'

function BookList() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalElements, setTotalElements] = useState(0);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/book/list');
            // 응답 구조에서 data.content 배열을 추출
            if (response.data.success) {
                setBooks(response.data.data.content);
                setTotalElements(response.data.data.totalElements);
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

            {/* 총 건수 표기 */}
            <div className="list-header">
                전체 <strong>{totalElements}</strong> 건
            </div>

            {/* 도서 리스트 */}
            {books.map((book) => (
                <div key={book.bookId} className="list-item">
                    <div className="thumbnail-container">
                        <img
                            src={book.bookThumbnail}
                            alt={book.bookTitle}
                            className="thumbnail-img"
                        />
                    </div>

                    <div className="info-container">
                        <h3 className="title">{book.bookTitle}</h3>

                        <div className="author-row">
                            <span className="text-item">{book.bookAuthor} 지음</span>
                            {book.bookTranslator && <span className="text-item"> | {book.bookTranslator} 옮김</span>}
                            <span className="text-item"> | {book.publisherName}</span>
                            <span className="text-item"> | {book.publicationDate}</span>
                        </div>

                        <div className="meta-container">
                            <div className="meta-item">
                                <span className="meta-label">자료실명</span>
                                <span className="meta-value">{book.bookCategoryName}</span>
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
            ))}
        </div>
    );
}


export default BookList;