import { useState } from 'react';
import '../../css/Modal.css';
import { getBookList } from '../../api/book.api';

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
            const res = await getBookList({
                params: { [searchType]: keyword, size: 10 }
            });
            if (res.success) {
                setResults(res.data.content);
            }
        } catch (error) {
            console.error("검색 실패", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="book-search-modal__overlay">
            <div className="book-search-modal__content">
                <div className="book-search-modal__header">
                    <h3>추천 도서 검색</h3>
                    <button className="book-search-modal__close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="book-search-modal__search-bar">
                    <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                        <option value="bookTitle">제목</option>
                        <option value="bookAuthor">저자</option>
                        <option value="bookIsbn">ISBN</option>
                    </select>
                    <input
                        type="text"
                        placeholder="검색어를 입력하세요..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <button className="book-search-modal__search-btn" onClick={handleSearch}>검색</button>
                </div>

                <div className="book-search-modal__results">
                    {loading ? <p style={{ textAlign: 'center', padding: '40px' }}>데이터를 불러오는 중입니다...</p> : (
                        <table className="book-search-modal__table">
                            <thead>
                                <tr>
                                    <th>표지</th>
                                    <th>도서명</th>
                                    <th>저자/출판사</th>
                                    <th>ISBN</th>
                                    <th style={{ textAlign: 'center' }}>선택</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map(book => (
                                    <tr key={book.bookId}>
                                        <td><img src={book.bookThumbnail} className="book-search-modal__img" alt="" /></td>
                                        <td><strong>{book.bookTitle}</strong></td>
                                        <td>{book.bookAuthor} <br /> <span style={{ fontSize: '12px', color: '#999' }}>{book.publisherName}</span></td>
                                        <td style={{ fontSize: '12px', color: '#666' }}>{book.bookIsbn}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <button
                                                className="book-search-modal__select-btn"
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