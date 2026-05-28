import InfoField from './InfoField';
import InfoActionButtons from './InfoActionButtons';

function MypageInfoForm({
    formData,
    userData,
    handlers,
    status
}) {

    const {
        handleChange,
        handleTelChange,
        onEdit,
        onCancel,
        onSave,
        onOpenPasswordModal,
        onOpenWithdrawalModal
    } = handlers;
    const {
        isEditing,
        isSubmitting
    } = status;

    if (!userData) return null;

    return (
        <div className="member-info-container">
            <h1 className="mypage-main-title">내 정보 조회/수정</h1>

            <div className="my_info-section">
                <InfoField
                    label="아이디"
                    value={userData.userId}
                    readOnly={true}
                />
                <InfoField
                    label="이름"
                    name="name"
                    isEditing={isEditing}
                    value={isEditing ? formData.name : userData.name}
                    onChange={handleChange}
                />
                <InfoField
                    label="이메일"
                    name="email"
                    isEditing={isEditing}
                    value={isEditing ? formData.email : userData.email}
                    onChange={handleChange}
                />
                <InfoField
                    label="연락처"
                    name="tel"
                    isEditing={isEditing}
                    value={isEditing ? formData.tel : userData.tel}
                    onChange={handleTelChange}
                />

                <div className="info-row">
                    <label className="info-label">비밀번호</label>
                    <div className="info-content">
                        <button
                            type="button"
                            className="btn-password-change"
                            onClick={onOpenPasswordModal}
                        >
                            비밀번호 변경하기
                        </button>
                    </div>
                </div>

                <InfoField
                    label="포인트 등급"
                    name="grade"
                    value={userData.grade}
                    readOnly={true}
                />
            </div>

            <InfoActionButtons
                isEditing={isEditing}
                onEdit={onEdit}
                onCancel={onCancel}
                onSave={onSave}
                disabled={isSubmitting}
            />

            {!isEditing && (
                <div style={{ marginTop: '40px', textAlign: 'right' }}>
                    <button
                        type="button"
                        onClick={onOpenWithdrawalModal}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#999',
                            textDecoration: 'underline',
                            fontSize: '13px',
                            cursor: 'pointer'
                        }}
                    >
                        회원 탈퇴하기
                    </button>
                </div>
            )}
        </div>
    );
}

export default MypageInfoForm;