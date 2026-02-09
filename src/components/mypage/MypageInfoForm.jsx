import InfoField from './InfoField';
import InfoActionButtons from './InfoActionButtons';

function MypageInfoForm({ userData }) {

    const isEditing = false;

    return (
        <div className="member-info-container">
            <h1 className="mypage-main-title">내 정보 조회/수정</h1>

            <div className="info-section">
                <InfoField label="아이디" value={userData.userId} readOnly={true} />
                <InfoField label="이름" name="name" value={userData.name} isEditing={isEditing} />
                <InfoField label="이메일" name="email" value={userData.email} isEditing={isEditing} />
                <InfoField label="연락처" name="tel" value={userData.tel} isEditing={isEditing} />
                <InfoField label="포인트 등급" name="grade" value={userData.grade} readOnly={true} />
            </div>

            <InfoActionButtons isEditing={isEditing} />
        </div>
    );
}

export default MypageInfoForm;