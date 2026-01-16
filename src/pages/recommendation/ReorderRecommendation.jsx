import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { recommendationBookList, reorderRecommendation } from '../../api/recommendation.api';
import '../../css/page.css';

function ReorderRecommendation() {
    const [items, setItems] = useState([]);
    const [isChanged, setIsChanged] = useState(false); // 변경 사항 여부 추적

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        const res = await recommendationBookList();
        if (res.success) setItems(res.data);
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const newItems = Array.from(items);
        const [reorderedItem] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, reorderedItem);

        setItems(newItems);
        setIsChanged(true);
    };

    const handleSave = async () => {
        const idList = items.map(item => item.recommendationId);
        try {
            await reorderRecommendation({ reorderedIds: idList });
            alert("순서가 안전하게 저장되었습니다.");
            setIsChanged(false); // 저장 완료 후 상태 초기화
        } catch (error) {
            alert("저장에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className="reorder-container">
            <div className="reorder-header">
                <h2>↕️ 추천 도서 순서 변경</h2>
                <button
                    className={`save-btn ${isChanged ? 'active' : ''}`}
                    onClick={handleSave}
                    disabled={!isChanged}
                >
                    {isChanged ? '변경사항 저장하기' : '순서 유지됨'}
                </button>
            </div>

            <p className="reorder-guide">💡 도서 카드를 아무 곳이나 잡고 드래그하여 순서를 바꿀 수 있습니다.</p>

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
                                                    <span className="reorder-author">{item.bookAuthor} | {item.publisherName}</span>
                                                </div>
                                            </div>
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

export default ReorderRecommendation;