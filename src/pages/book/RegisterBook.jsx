import React, { useState } from 'react';
import axios from 'axios';

function RegisterBook() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false); // 로딩 상태

    const [bookForm, setBookForm] = useState({
        bookTitle: '',
        bookAuthor: '',
        bookTranslator: '',
        publisherName: '',
        publicationDate: '',
        bookIsbn: '',
        bookContents: '',
        bookThumbnail: '',
        bookCallNumber: '',
        bookCategory: ''
    });

    // 검색 API 호출
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/book/library/search`, {
                params: { query: searchQuery }
            });
            // 응답 구조가 { data: { data: [...] } } 이므로 response.data.data를 세팅
            setSearchResults(response.data.data || []);
        } catch (error) {
            console.error("검색 중 오류 발생:", error);
            alert("도서 정보를 가져오는데 실패했습니다.");
        } finally {
            setIsSearching(false);
        }
    };

    // 도서 선택 시 폼 매핑
    const handleSelectBook = (book) => {
        setBookForm({
            ...bookForm,
            bookTitle: book.bookTitle || '',
            bookAuthor: book.bookAuthor || '',
            bookTranslator: book.bookTranslator || '',
            publisherName: book.publisherName || '',
            // ISO 날짜(2019-09-02T00:00:00)에서 날짜 부분(yyyy-MM-dd)만 추출
            publicationDate: book.publicationDate ? book.publicationDate.split('T')[0] : '',
            bookIsbn: book.bookIsbn || '',
            bookContents: book.bookContents || '',
            bookThumbnail: book.bookThumbnail || '',
            bookCategory: book.bookCategory || ''
        });
        setSearchResults([]); // 선택 후 리스트 닫기
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookForm({ ...bookForm, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/book/register', bookForm);
            alert("도서가 성공적으로 등록되었습니다!");
        } catch (error) {
            alert("도서 등록에 실패했습니다.");
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <h2 style={{ textAlign: 'center' }}>도서 등록</h2>

            {/* 검색 섹션 */}
            <section style={{ marginBottom: '30px', position: 'relative' }}>
                <form onSubmit={handleSearch} style={{ display: 'flex' }}>
                    <input
                        type="text"
                        placeholder="등록할 도서 제목을 검색하세요..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ padding: '12px', width: '100%', border: '1px solid #007bff', borderRadius: '4px 0 0 4px', outline: 'none' }}
                    />
                    <button type="submit" style={{ padding: '12px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '0 4px 4px 0', cursor: 'pointer' }}>
                        {isSearching ? '검색 중...' : '검색'}
                    </button>
                </form>

                {/* 검색 결과 레이어 (결과가 있을 때만 표시) */}
                {searchResults.length > 0 && (
                    <div style={{
                        position: 'absolute', top: '50px', left: 0, right: 0, backgroundColor: 'white',
                        border: '1px solid #ccc', borderRadius: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        zIndex: 100, maxHeight: '400px', overflowY: 'auto'
                    }}>
                        {searchResults.map((book) => (
                            <div
                                key={book.bookIsbn}
                                onClick={() => handleSelectBook(book)}
                                style={{
                                    display: 'flex', padding: '12px', cursor: 'pointer', borderBottom: '1px solid #eee',
                                    transition: 'background 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                            >
                                <img src={book.bookThumbnail} alt="cover" style={{ width: '50px', height: '70px', marginRight: '15px', objectFit: 'cover' }} />
                                <div>
                                    <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{book.bookTitle}</div>
                                    <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>
                                        {book.bookAuthor} | {book.publisherName} | {book.bookCategory}
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#999' }}>ISBN: {book.bookIsbn}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '30px 0' }} />

            {/* 등록 폼 섹션 */}
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ flex: 2 }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>제목</label>
                        <input name="bookTitle" value={bookForm.bookTitle} onChange={handleInputChange} required style={inputStyle} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>카테고리</label>
                        <input name="bookCategory" value={bookForm.bookCategory} onChange={handleInputChange} style={inputStyle} />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>저자</label>
                        <input name="bookAuthor" value={bookForm.bookAuthor} onChange={handleInputChange} required style={inputStyle} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>역자</label>
                        <input name="bookTranslator" value={bookForm.bookTranslator} onChange={handleInputChange} style={inputStyle} />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>출판사</label>
                        <input name="publisherName" value={bookForm.publisherName} onChange={handleInputChange} style={inputStyle} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>출판일</label>
                        <input type="date" name="publicationDate" value={bookForm.publicationDate} onChange={handleInputChange} style={inputStyle} />
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>ISBN</label>
                    <input name="bookIsbn" value={bookForm.bookIsbn} onChange={handleInputChange} style={inputStyle} />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#007bff' }}>청구기호 (필수 입력)</label>
                    <input name="bookCallNumber" value={bookForm.bookCallNumber} onChange={handleInputChange} placeholder="도서관 내부 청구기호를 입력하세요" style={{ ...inputStyle, borderColor: '#007bff' }} />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>책소개</label>
                    <textarea name="bookContents" value={bookForm.bookContents} onChange={handleInputChange} rows="4" style={inputStyle} />
                </div>

                <button type="submit" style={{
                    padding: '15px', backgroundColor: '#28a745', color: 'white', border: 'none',
                    borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px'
                }}>
                    도서 등록
                </button>
            </form>
        </div>
    );
}

const inputStyle = {
    width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box'
};

export default RegisterBook;