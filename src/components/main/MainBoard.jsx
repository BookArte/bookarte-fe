import { useState } from "react";

function MainBoard({ currentList, loading, activeTab, setActiveTab, handleView }) {

    const BoardRow = ({ id, title, date }) => (
        <div className="board-row" onClick={() => handleView(id)} style={{ cursor: 'pointer' }}>
            <span className="row-title">{title}</span>
            <span className="row-date">{date}</span>
        </div>
    );

    return (
        <section className="bottom-board-section">
            <div className="board-container">
                <div className="board-header">
                    <div className="board-tabs">
                        <button
                            className={activeTab === 'notice' ? 'active' : ''}
                            onClick={() => setActiveTab('notice')}
                        >공지사항</button>
                        <button
                            className={activeTab === 'news' ? 'active' : ''}
                            onClick={() => setActiveTab('news')}
                        >뉴스</button>
                    </div>
                    <a href={`/${activeTab}`} className="btn-more-link">전체보기 +</a>
                </div>

                <div className="board-content-list">
                    {loading ? (
                        <div className="board-loading">데이터를 불러오는 중입니다...</div>
                    ) :
                        currentList.length === 0 ? (
                            <div className="board-empty">게시물이 존재하지 않습니다.</div>
                        ) : (
                            currentList.map((item) => (
                                < BoardRow
                                    id={item.id}
                                    title={item.title}
                                    date={item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}
                                />
                            ))
                        )}
                </div>
            </div>
        </section>
    );
}

export default MainBoard;