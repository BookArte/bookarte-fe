import ModalLayout from './ModalLayout';
import InfoField from '../mypage/InfoField';

function PasswordChangeModal({ isOpen, onClose, formData, handlers, status }) {
    const { handleChange, onSubmit } = handlers;
    const { isSubmitting } = status;

    return (
        <ModalLayout
            isOpen={isOpen}
            onClose={onClose}
            title="비밀번호 변경"
            width="450px"
        >
            <div className="password-change-container">
                <div className="password-change__fields">
                    <InfoField
                        label="현재 비밀번호"
                        name="currentPassword"
                        type="password"
                        isEditing={true}
                        value={formData.currentPassword}
                        onChange={handleChange}
                        placeholder="현재 비밀번호를 입력하세요"
                    />
                    <InfoField
                        label="새 비밀번호"
                        name="newPassword"
                        type="password"
                        isEditing={true}
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="새 비밀번호 (8~16자 영문/숫자)"
                    />
                    <InfoField
                        label="새 비밀번호 확인"
                        name="newPasswordConfirm"
                        type="password"
                        isEditing={true}
                        value={formData.newPasswordConfirm}
                        onChange={handleChange}
                        placeholder="새 비밀번호를 한 번 더 입력하세요"
                    />
                </div>

                <div className="password-change__actions">
                    <button
                        type="button"
                        className="btn-cancel"
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        취소
                    </button>
                    <button
                        type="button"
                        className="btn-save"
                        onClick={onSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? '변경 중...' : '비밀번호 변경'}
                    </button>
                </div>
            </div>
        </ModalLayout>
    );
}

export default PasswordChangeModal;