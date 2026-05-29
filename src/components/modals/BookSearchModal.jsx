import { useBookSearch } from '@/hooks/domain/book/admin/useBookSearch';
import '@/css/modal.css';
import ModalLayout from './ModalLayout';

function BookSearchModal({ isOpen, onSelect, onClose }) {
    const { state: { bookTitle, setbookTitle, searchType, setSearchType, results, loading },
        handlers: { handleSearch }
    } = useBookSearch();

    return (
        <ModalLayout
            isOpen={isOpen}
            onClose={onClose}
            title="추천 도서 검색"
            width="900px"
        >
            <div className="book-search-modal__search-bar">
                <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                    <option value="bookTitle">제목</option>
                    <option value="bookAuthor">저자</option>
                    <option value="bookIsbn">ISBN</option>
                </select>
                <input
                    type="text"
                    placeholder="검색어를 입력하세요..."
                    value={bookTitle}
                    onChange={(e) => setbookTitle(e.target.value)}
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
        </ModalLayout>
    );
}

export default BookSearchModal;