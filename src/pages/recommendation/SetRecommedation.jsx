import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BookSearchModal from '../book/BookSearchModal';

function SetRecommedation() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [formData, setFormData] = useState({
        comments: '',
        startDate: '',
        endDate: ''
    });

    // 도서 선택 완료 시 호출
    const handleSelectBook = (book) => {
        setSelectedBook(book);
        setIsModalOpen(false);
    };

    const handleSubmit = async () => {
        if (!selectedBook) return alert("도서를 먼저 선택해주세요.");

        const requestData = {
            bookId: selectedBook.bookId,
            ...formData
        };

        try {
            const res = await axios.post('http://localhost:8080/api/recommendation/set', requestData);
            if (res.data.success) {
                alert("추천 도서로 등록되었습니다.");
                navigate('/admin/recommend/list');
            }
        } catch (error) {
            alert("등록 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="register-container">
            <h2>✨ 관리자 추천 도서 등록</h2>

            {/* 1. 도서 선택 섹션 */}
            <div className="form-section">
                <label>대상 도서</label>
                <div className="book-selector">
                    {selectedBook ? (
                        <div className="selected-card">
                            <img src={selectedBook.bookThumbnail} alt="" />
                            <div className="info">
                                <strong>{selectedBook.bookTitle}</strong>
                                <span>{selectedBook.bookAuthor} | {selectedBook.publisherName}</span>
                            </div>
                            <button onClick={() => setSelectedBook(null)}>변경</button>
                        </div>
                    ) : (
                        <button className="search-trigger" onClick={() => setIsModalOpen(true)}>
                            🔍 추천할 도서 검색하기
                        </button>
                    )}
                </div>
            </div>

            {/* 상세 내용 섹션 */}
            <div className="form-section">
                <label>추천 코멘트</label>
                <textarea
                    placeholder="관리자 추천평을 입력하세요 (최대 200자)"
                    onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                />
            </div>

            <div className="form-section row">
                <div>
                    <label>전시 시작일</label>
                    <input type="date" onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />
                </div>
                <div>
                    <label>전시 종료일</label>
                    <input type="date" onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} />
                </div>
            </div>

            <div className="button-group">
                <button className="submit-btn" onClick={handleSubmit}>등록하기</button>
                <button className="cancel-btn" onClick={() => navigate(-1)}>취소</button>
            </div>

            {/* 도서 검색 모달 */}
            {isModalOpen && <BookSearchModal onSelect={handleSelectBook} onClose={() => setIsModalOpen(false)} />}
        </div>
    );

}

export default SetRecommedation;