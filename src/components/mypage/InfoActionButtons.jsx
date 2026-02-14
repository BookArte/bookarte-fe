function InfoActionButtons({ isEditing, onEdit, onCancel, onSave }) {
    return (
        <div className="info-actions">
            {!isEditing ? (
                <button type="button" className="btn-edit-mode" onClick={onEdit}>
                    정보 수정하기
                </button>
            ) : (
                <div className="edit-button-group">
                    <button type="button" className="btn-cancel" onClick={onCancel}>
                        취소
                    </button>
                    <button type="button" className="btn-save" onClick={onSave}>
                        저장하기
                    </button>
                </div>
            )}
        </div>
    );
}

export default InfoActionButtons;