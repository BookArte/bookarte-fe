import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/Modal.css';

function BookSearchModal({ onSelect, onClose }) {
    const [keyword, setKeyword] = useState('');
    const [searchType, setSearchType] = useState('keyword');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!keyword.trim()) return alert("검색어를 입력하세요.");
        setLoading(true);
        try {
            //도서  검색
            const res = await axios.get(`http://localhost:8080/api/book/list`, {
                params: { [searchType]: keyword, size: 10 }
            });
            if (res.data.success) {
                setResults(res.data.data.content);
            }
        } catch (error) {
            console.error("검색 실패", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>추천 도서 검색</h3>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-search-bar">
                    <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                        <option value="bookTitle">제목</option>
                        <option value="bookAuthor">저자</option>
                        <option value="bookIsbn">ISBN</option>
                    </select>
                    <input
                        type="text"
                        placeholder="검색어를 입력하세요"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <button onClick={handleSearch}>검색</button>
                </div>

                <div className="modal-results">
                    {loading ? <p>검색 중...</p> : (
                        <table>
                            <thead>
                                <tr>
                                    <th>표지</th>
                                    <th>도서명</th>
                                    <th>저자/출판사</th>
                                    <th>선택</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map(book => (
                                    <tr key={book.bookId}>
                                        <td><img src={book.bookThumbnail} width="40" alt="" /></td>
                                        <td className="text-left">{book.bookTitle}</td>
                                        <td className="text-left">{book.bookAuthor} / {book.publisherName}</td>
                                        <td>
                                            <button
                                                className="select-btn"
                                                onClick={() => onSelect(book)}
                                            >
                                                선택
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BookSearchModal;