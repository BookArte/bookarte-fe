import { useNavigate, useParams } from "react-router-dom";
import '../../css/page.css';
import { useEffect, useState } from "react";
import axios from "axios";

function UpdateBook() {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

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


    useEffect(() => {
        const getBookDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/book/view/${bookId}`);
                if (response.data.success) {
                    const data = response.data.data;
                    setBookForm({
                        bookTitle: data.bookTitle || '',
                        bookAuthor: data.bookAuthor || '',
                        bookTranslator: data.bookTranslator || '',
                        publisherName: data.publisherName || '',
                        publicationDate: data.publicationDate || '',
                        bookIsbn: data.bookIsbn || '',
                        bookContents: data.bookContents || '',
                        bookThumbnail: data.bookThumbnail || '',
                        bookCallNumber: data.bookCallNumber || '',
                        bookCategory: data.bookCategoryName || ''
                    });
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookForm({ ...bookForm, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:8080/api/book/${bookId}`, bookForm)
            alert("도서 정보가 수정되었습니다.");
            navigate(`/book/view/${bookId}`);

        } catch (error) {
            alert("도서 수정에 실패했습니다.")
        }
    }

    if (loading) return <div className="book-detail-container">로딩 중...</div>;

    return (
        <div className='form-container'>
            <h2 style={{ textAlign: 'center' }}>도서 정보 수정</h2>

            {/* 수정 폼 섹션 */}
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
    )
}

export default UpdateBook