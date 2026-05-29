function AboutLocation({ info }) {
    return (
        <div>
            <div className="map-wrapper">
                <div id="map" style={{ width: '100%', height: '100%' }}></div>
            </div>

            {/* 2. 하단 정보 영역 */}
            <div className="info-section">
                <div className="info-left">
                    <div className="info-row">
                        <span className="info-label">📍 주소</span>
                        <span className="info-value">{info.address}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">📞 번호</span>
                        <span className="info-value">{info.phone}</span>
                    </div>
                </div>

                <div className="info-right">
                    {/* 네이버 지도 바로가기 버튼 */}
                    <a
                        href={info.naverMapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-map btn-naver"
                    >
                        <span className="icon-n">N</span> 네이버지도
                    </a>
                    {/* 카카오 맵 바로가기 버튼 */}
                    <a
                        href={info.kakaoMapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-map btn-kakao"
                    >
                        <span className="icon-k">k</span> 카카오지도
                    </a>
                </div>
            </div>
        </div>
    );
}

export default AboutLocation;