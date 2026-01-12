import React, { useState } from 'react';
import axios from 'axios';
import '../../css/page.css';

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
        <div className='form-container'>
            <h2 style={{ textAlign: 'center' }}>도서 등록</h2>

            {/* 검색 섹션 */}
            <section className='search-section'>
                <form onSubmit={handleSearch} style={{ display: 'flex' }}>
                    <input
                        className='search-form'
                        type="text"
                        placeholder="등록할 도서 제목을 검색하세요..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className='search-button' type="submit">
                        {isSearching ? '검색 중...' : '검색'}
                    </button>
                </form>

                {/* 검색 결과 레이어 */}
                {searchResults.length > 0 && (
                    <div className='search-result-layer'>
                        {searchResults.map((book) => (
                            <div
                                className='search-result'
                                key={book.bookIsbn}
                                onClick={() => handleSelectBook(book)}
                            >
                                <img src={book.bookThumbnail} alt="cover" className='search-result-img' />
                                <div>
                                    <div className='search-result-title'>{book.bookTitle}</div>
                                    <div className='search-result-element'>
                                        {book.bookAuthor} | {book.publisherName} | {book.bookCategory}
                                    </div>
                                    <div className='search-result-ISBN'>ISBN: {book.bookIsbn}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '30px 0' }} />

            {/* 등록 폼 섹션 */}
            <form onSubmit={handleSubmit} className='input-form'>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <div className='input-title-flex'>
                        <label className='input-label'>제목</label>
                        <input name="bookTitle" value={bookForm.bookTitle} onChange={handleInputChange} required className='input-style' />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label className='input-label'>카테고리</label>
                        <input name="bookCategory" value={bookForm.bookCategory} onChange={handleInputChange} className='input-style' />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ flex: 1 }}>
                        <label className='input-label'>저자</label>
                        <input name="bookAuthor" value={bookForm.bookAuthor} onChange={handleInputChange} required className='input-style' />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label className='input-label'>역자</label>
                        <input name="bookTranslator" value={bookForm.bookTranslator} onChange={handleInputChange} className='input-style' />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ flex: 1 }}>
                        <label className='input-label'>출판사</label>
                        <input name="publisherName" value={bookForm.publisherName} onChange={handleInputChange} className='input-style' />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label className='input-label'>출판일</label>
                        <input type="date" name="publicationDate" value={bookForm.publicationDate} onChange={handleInputChange} className='input-style' />
                    </div>
                </div>

                <div>
                    <label className='input-label'>ISBN</label>
                    <input name="bookIsbn" value={bookForm.bookIsbn} onChange={handleInputChange} className='input-style' />
                </div>

                <div>
                    <label className='input-unique-label'>청구기호 (필수 입력)</label>
                    <input name="bookCallNumber" value={bookForm.bookCallNumber} onChange={handleInputChange} className='input-style' placeholder="도서관 내부 청구기호를 입력하세요" />
                </div>

                <div>
                    <label className='input-label'>책소개</label>
                    <textarea name="bookContents" value={bookForm.bookContents} onChange={handleInputChange} rows="4" className='input-style' />
                </div>

                <button type="submit" className='input-btn'>
                    도서 등록
                </button>
            </form>
        </div>
    );
}

export default RegisterBook;