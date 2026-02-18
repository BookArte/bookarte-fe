import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import React from "react";

function ReorderForm({ items, displayItems, activeTab, isChanged, onDragEnd, handlers }) {
    const { handleTabChange, handleDel, updateHandle, setBtn, handleSave } = handlers;

    const getStatusBadge = (status) => {
        switch (status) {
            case 'ACTIVE': return <span className="badge active">노출 중</span>;
            case 'UPCOMING': return <span className="badge upcoming">예약됨</span>;
            case 'EXPIRED': return <span className="badge expired">만료</span>;
            default: return null;
        }
    };

    return (
        <div className="reorder-container">
            <div className="reorder-header">
                <h2>추천 도서 순서 변경</h2>
                <div className="reorder-btn-group">
                    <button
                        className={`save-btn ${isChanged ? 'active' : ''}`}
                        onClick={handleSave}
                        disabled={!isChanged}
                    >
                        {isChanged ? '변경사항 저장하기' : '순서 유지됨'}
                    </button>
                    <button
                        className="set-btn"
                        onClick={setBtn}
                    >
                        추천 도서 추가
                    </button>
                </div>
            </div>

            {/* 탭 메뉴 */}
            <div className="reorder-tabs">
                <button
                    className={`tab-btn ${activeTab === 'ACTIVE' ? 'active' : ''}`}
                    onClick={() => handleTabChange('ACTIVE')}
                >
                    진행 중인 추천 <span className="count">({items.filter(i => i.status === 'ACTIVE').length})</span>
                </button>
                <button
                    className={`tab-btn ${activeTab === 'UPCOMING' ? 'active' : ''}`}
                    onClick={() => handleTabChange('UPCOMING')}
                >
                    예약된 추천 <span className="count">({items.filter(i => i.status === 'UPCOMING').length})</span>
                </button>
            </div>

            <p className="reorder-guide">
                {activeTab === 'ACTIVE'
                    ? "현재 추천 페이지에 노출 중인 도서들의 순서를 관리합니다."
                    : "게시 예정인 도서들의 순서를 미리 관리합니다."}
            </p>

            <p className="reorder-guide">도서 카드를 아무 곳이나 잡고 드래그하여 순서를 바꿀 수 있습니다.</p>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="recommend-list">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="reorder-list">
                            {displayItems.map((item, index) => {
                                const isFirstOfSection = index === 0 || displayItems[index - 1].status !== item.status;

                                return (
                                    <React.Fragment key={item.recommendationId}>
                                        {isFirstOfSection && (
                                            <div className="section-divider">
                                                {item.status === 'ACTIVE' ? '현재 진행 중인 추천 도서' : '예약된 추천 도서 목록'}
                                            </div>
                                        )}
                                        <Draggable
                                            draggableId={item.recommendationId.toString()}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={`reorder-item ${snapshot.isDragging ? 'dragging' : ''} ${item.status.toLowerCase()}`}
                                                >
                                                    <div className="reorder-rank-badge">{index + 1}</div>
                                                    <div className="reorder-card-content">
                                                        <img src={item.bookThumbnail} alt="" className="reorder-thumb" />
                                                        <div className="reorder-info">
                                                            <div className="title-row">
                                                                <strong className="reorder-title">{item.bookTitle}</strong>
                                                                {getStatusBadge(item.status)}
                                                            </div>
                                                            <span className="reorder-author">
                                                                {item.bookAuthor} | {item.publisherName}
                                                            </span>
                                                            <span className="reorder-date">
                                                                기간: {item.startDate} ~ {item.endDate}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="reorder-actions">
                                                        <button className="reorder-update-btn" onClick={() => updateHandle(item.recommendationId)}>수정</button>
                                                        <button className="reorder-del-btn" onClick={() => handleDel(item.recommendationId)}>삭제</button>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    </React.Fragment>
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}

export default ReorderForm;