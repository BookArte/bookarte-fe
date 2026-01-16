import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { recommendationBookList, reorderRecommendation } from '../../api/recommendation.api';
import '../../css/page.css';

function ReorderRecommendation() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        const res = await recommendationBookList();
        if (res.success) setItems(res.data);
    };

    // 드래그가 끝났을 때 실행되는 함수
    const onDragEnd = async (result) => {
        if (!result.destination) return; // 리스트 밖으로 드롭한 경우

        // 1. UI 상태 변경 (사용자에게 즉각적인 피드백)
        const newItems = Array.from(items);
        const [reorderedItem] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, reorderedItem);

        setItems(newItems);

        // 2. 백엔드에 변경된 ID 리스트 전송
        const idList = newItems.map(item => item.recommendationId);
        try {
            await reorderRecommendation({ reorderedIds: idList });
            alert("순서가 저장되었습니다.");
        } catch (error) {
            alert("순서 저장에 실패했습니다.");
            fetchBooks(); // 실패 시 원래 순서로 복구
        }
    };

    return (
        <div className="admin-sort-container">
            <h2>↕️ 추천 도서 순서 변경 (드래그하여 이동)</h2>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="recommend-list">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="sort-list">
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
                                            className={`sort-item ${snapshot.isDragging ? 'dragging' : ''}`}
                                        >
                                            <span className="sort-rank">{index + 1}</span>
                                            <img src={item.bookThumbnail} alt="" className="sort-thumb" />
                                            <div className="sort-info">
                                                <strong>{item.bookTitle}</strong>
                                                <span>{item.bookAuthor}</span>
                                            </div>
                                            <div className="drag-handle">☰</div>
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