import { useRef } from 'react';
import '@/css/modal.css';

function ModalLayout({ isOpen, onClose, title, children, width = "500px" }) {
    const mouseDownTarget = useRef(null);

    if (!isOpen) return null;

    const handleMouseDown = (e) => {
        mouseDownTarget.current = e.target;
    };

    const handleMouseUp = (e) => {
        if (e.target === e.currentTarget && mouseDownTarget.current === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="common-modal__overlay"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <div
                className="common-modal__content"
                style={{ maxWidth: width }}
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