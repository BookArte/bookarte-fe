import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function BookDetailView({ book, loading, stats, handlers }) {
    const { handleDelete, handleUpdate, handleBorrow } = handlers;
    const navigate = useNavigate();

    if (loading) return <div className="book-detail-container">로딩 중...</div>;
    if (!book) return <div className="book-detail-container">도서 정보를 찾을 수 없습니다.</div>;

    const midIndex = Math.ceil(stats.length / 2);
    const firstCol = stats.slice(0, midIndex);
    const secondCol = stats.slice(midIndex);

    return (
        <div className="book-detail-container">
            {/* 상단 버튼 영역 */}
            <div className="back-btn" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <button onClick={() => navigate(-1)} >
                    ← 목록으로 돌아가기
                </button>

                {/* 수정 및 삭제 버튼 세트 */}
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        className="update-btn"
                        onClick={() => handleUpdate(book.bookId)}

                    >
                        수정
                    </button>
                    <button
                        className="delete-btn"
                        onClick={() => handleDelete(book.bookId)}
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
                                <td>{book.bookCategory}</td>
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
                    <div className="button-area">
                        <button
                            className={`borrow-btn ${!book.canBorrow ? 'disabled' : ''}`}
                            onClick={() => handleBorrow(book.bookId)}
                            disabled={!book.canBorrow}
                        >
                            {book.canBorrow ? '대출' : '대출 불가'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="detail-section">
                <h2 className="section-title">책소개</h2>
                <div className="contents-box">
                    {book.bookContents || "등록된 책소개가 없습니다."}
                </div>
            </div>

            {/* 대출 통계 섹션 추가 */}
            <div className="detail-section stats-section">
                <div className="section-header">
                    <h2 className="section-title">대출 건수</h2>
                    <span className="stats-source">* 본 도서관 사이트에서 제공되는 대출 건수입니다.</span>
                </div>

                {/* 그래프 영역 */}
                <div className="chart-container">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={stats} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                            <XAxis dataKey="label" tick={{ fontSize: 12 }} axisLine={{ stroke: '#ddd' }} />
                            <YAxis allowDecimals={false} tickFormatter={(value) => Math.floor(value)} tick={{ fontSize: 12 }} axisLine={{ stroke: '#ddd' }} />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
                                formatter={(value) => [Math.floor(value), "대출 건수"]}
                            />
                            <Line
                                type="monotone"
                                dataKey="count"
                                stroke="#3498db"
                                strokeWidth={2}
                                dot={{ r: 4, fill: '#3498db' }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* 통계 표 영역 (2열 레이아웃) */}
                <div className="stats-table-wrapper">
                    <table className="stats-grid-table">
                        <thead>
                            <tr>
                                <th>대출연월</th><th>대출건수</th>
                                <th>대출연월</th><th>대출건수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {firstCol.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="bg-light">{item.year}년 {String(item.month).padStart(2, '0')}월</td>
                                    <td>{item.count}</td>
                                    {secondCol[idx] ? (
                                        <>
                                            <td className="bg-light">{secondCol[idx].year}년 {String(secondCol[idx].month).padStart(2, '0')}월</td>
                                            <td>{secondCol[idx].count}</td>
                                        </>
                                    ) : (
                                        <><td className="bg-light">-</td><td>-</td></>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default BookDetailView;