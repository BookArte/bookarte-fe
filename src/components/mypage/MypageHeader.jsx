import { useNavigate } from "react-router-dom";
import URL from "@/constants/url"

function MypageHeader({ name }) {
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate(URL.MYPAGE_INFO)
    }
    return (
        <div className="mypage-header-container">
            <h1 className="mypage-main-title">도서관서비스</h1>

            <div className="mypage-welcome-box">
                <h2 className="mypage-welcome-text">
                    <strong>{name}</strong>님, 안녕하세요.
                </h2>
                <button className="edit-info-btn" onClick={handleEditClick}>내정보 수정</button>
            </div>
        </div>
    );
}

export default MypageHeader;