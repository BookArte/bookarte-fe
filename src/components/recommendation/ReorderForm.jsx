import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

function ReorderForm({ items, isChanged, onDragEnd, handlers }) {
    const { delHandle, updateHandle, setBtn, handleSave } = handlers;

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

            <p className="reorder-guide">도서 카드를 아무 곳이나 잡고 드래그하여 순서를 바꿀 수 있습니다.</p>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="recommend-list">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="reorder-list">
                            {items.map((item, index) => (
                                <Draggable
                                    key={item.recommendationId.toString()}
                                    draggableId={item.recommendationId.toString()}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className={`reorder-item ${snapshot.isDragging ? 'dragging' : ''}`}
                                        >
                                            <div className="reorder-rank-badge">{index + 1}</div>
                                            <div className="reorder-card-content">
                                                <img src={item.bookThumbnail} alt="" className="reorder-thumb" />
                                                <div className="reorder-info">
                                                    <strong className="reorder-title">{item.bookTitle}</strong>
                                                    <span className="reorder-author">{item.bookAuthor} | {item.publisherName} | {item.startDate}~{item.endDate}</span>
                                                </div>
                                            </div>
                                            <button
                                                className="reorder-update-btn"
                                                onClick={() => updateHandle(item.recommendationId)}
                                            >
                                                수정
                                            </button>
                                            <button
                                                className="reorder-del-btn"
                                                onClick={() => delHandle(item.recommendationId)}
                                            >
                                                삭제
                                            </button>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}

export default ReorderForm;