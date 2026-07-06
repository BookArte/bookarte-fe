import "@/css/error.css";

const NotFound = () => {
    return (
        <div className="not-found-container">
            <h1>404</h1>
            <p>앗! 찾으시는 페이지가 존재하지 않습니다.</p>
            <a href="/" className="home-link">홈으로 돌아가기</a>
        </div>
    );
}

export default NotFound;