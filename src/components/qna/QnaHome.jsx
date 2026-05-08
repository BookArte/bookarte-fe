import { useNavigate } from "react-router-dom";
import URL from "@/constants/url";

function QnaHome() {
    const navigate = useNavigate();

    return (
        <div className="qna-home-container">
            <div className="contents-header">
                <h2 className="contents-title">QNA</h2>
            </div>

            <div className="qna-card-grid">
                <div className="qna-card" onClick={() => navigate(URL.MYPAGE_QNA)}>
                    <div className="qna-card-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#008161" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                    </div>
                    <h3>내 QNA 보기</h3>
                    <p>내가 작성한 문의 내역과 답변을 바로 확인할 수 있습니다.</p>
                    <span className="qna-card-link">바로가기 &rarr;</span>
                </div>

                <div className="qna-card" onClick={() => navigate(URL.QNA_WRITE)}>
                    <div className="qna-card-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#008161" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                    </div>
                    <h3>QNA 질문하기</h3>
                    <p>서비스 이용 중 궁금하신 점을 보내주시면 신속하게 답변해 드립니다.</p>
                    <span className="qna-card-link">문의 등록 &rarr;</span>
                </div>
            </div>

            <div className="qna-footer-notice">
                <h3>유의사항</h3>
                <ul>
                    <li>QNA 답변은 영업일 기준 평균 1~2일 정도 소요됩니다.</li>
                    <li>작성하신 1:1 문의는 <strong>마이페이지 &gt; QNA 내역</strong>에서도 언제든지 확인하실 수 있습니다.</li>
                </ul>
            </div>
        </div>
    );
}

export default QnaHome;