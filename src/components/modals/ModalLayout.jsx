import '@/css/modal.css';

function ModalLayout({ isOpen, onClose, title, children, width = "500px" }) {
    if (!isOpen) return null;

    return (
        <div className="common-modal__overlay" onClick={onClose}>
            <div
                className="common-modal__content"
                style={{ maxWidth: width }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="common-modal__header">
                    <h3>{title}</h3>
                    <button className="common-modal__close-btn" onClick={onClose}>&times;</button>
                </div>
                <div className="common-modal__body">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default ModalLayout;