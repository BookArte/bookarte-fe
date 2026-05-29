import ModalLayout from './ModalLayout';
import InfoField from '../mypage/InfoField';

function WithdrawalModal({ isOpen, onClose, formData, handlers, status }) {
    const { handleChange, onSubmit } = handlers;
    const { isSubmitting } = status;

    return (
        <ModalLayout
            isOpen={isOpen}
            onClose={onClose}
            title="회원 탈퇴"
            width="450px"
        >
            <div className="withdrawal-container">
                <div style={{ marginBottom: '20px', color: '#666', fontSize: '14px', lineHeight: '1.5' }}>
                    <p style={{ color: '#d32f2f', fontWeight: 'bold', marginBottom: '8px' }}>
                        정말 탈퇴하시겠습니까?
                    </p>
                    탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.<br />
                    본인 확인을 위해 현재 비밀번호를 입력해주세요.
                </div>

                <div className="withdrawal__fields">
                    <InfoField
                        label="비밀번호 확인"
                        name="password"
                        type="password"
                        isEditing={true}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="비밀번호를 입력하세요"
                    />
                </div>

                <div className="password-change__actions" style={{ marginTop: '24px' }}>
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
                        style={{ backgroundColor: '#d32f2f', borderColor: '#d32f2f' }} // 붉은색 경고 버튼
                        onClick={onSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? '처리 중...' : '탈퇴하기'}
                    </button>
                </div>
            </div>
        </ModalLayout>
    );
}

export default WithdrawalModal;