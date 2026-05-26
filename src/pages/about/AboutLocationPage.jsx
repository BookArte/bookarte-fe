import { useEffect } from "react";

function AboutLocationPage() {
    // 국립중앙도서관 실제 정보 및 좌표
    const libraryInfo = {
        name: '국립중앙도서관',
        address: '서울특별시 서초구 반포대로 201',
        phone: '02-xxx-xxxx',
        // 카카오맵 등에 활용할 실제 위경도 좌표
        lat: 37.497689,
        lng: 127.0028333,
        // 외부 지도 길찾기/상세보기용 공유 링크
        naverMapUrl: 'https://map.naver.com/p/entry/place/11591186',
        kakaoMapUrl: 'https://map.kakao.com/link/map/국립중앙도서관,37.497689,127.0028333'
    };

    useEffect(() => {
        // 카카오맵 스크립트가 로드되었는지 확인 후 지도 생성
        if (window.kakao && window.kakao.maps) {
            const container = document.getElementById('map');
            const options = {
                center: new window.kakao.maps.LatLng(libraryInfo.lat, libraryInfo.lng),
                level: 3 // 확대 레벨
            };
            const map = new window.kakao.maps.Map(container, options);

            // 마커 생성
            const markerPosition = new window.kakao.maps.LatLng(libraryInfo.lat, libraryInfo.lng);
            const marker = new window.kakao.maps.Marker({
                position: markerPosition
            });
            marker.setMap(map);

            // 인포윈도우(말풍선) 생성
            const iwContent = `
                <div style="padding:10px; font-size:14px; text-align:center; min-width:150px;">
                    <strong>${libraryInfo.name}</strong><br/>
                    <span style="font-size:11px; color:#666;">서초구 반포대로 201</span>
                </div>
            `;
            const infowindow = new window.kakao.maps.InfoWindow({
                content: iwContent
            });
            infowindow.open(map, marker);
        }
    }, [libraryInfo.lat, libraryInfo.lng]);

    return (
        <div className="about-page-wrapper">
            <div className="location-container">
                {/* 타이틀 */}
                <h2 className="page-title">찾아오시는 길</h2>

                {/* 1. 상단 지도 영역 (카카오맵 API 렌더링 또는 static 이미지 대체 가능) */}
                <div className="map-wrapper">
                    <div id="map" style={{ width: '100%', height: '100%' }}>
                        {/* API를 쓰지 않을 경우, 여기에 국립중앙도서관 캡처 이미지로 대체 가능. */}
                        {/* <img src={mapFallbackImg} alt="국립중앙도서관 지도" /> */}
                    </div>
                </div>

                {/* 2. 하단 정보 영역 */}
                <div className="info-section">
                    <div className="info-left">
                        <div className="info-row">
                            <span className="info-label">📍 주소</span>
                            <span className="info-value">{libraryInfo.address}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">📞 번호</span>
                            <span className="info-value">{libraryInfo.phone}</span>
                        </div>
                    </div>

                    <div className="info-right">
                        {/* 네이버 지도 바로가기 버튼 */}
                        <a
                            href={libraryInfo.naverMapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-map btn-naver"
                        >
                            <span className="icon-n">N</span> 네이버지도
                        </a>
                        {/* 카카오 맵 바로가기 버튼 */}
                        <a
                            href={libraryInfo.kakaoMapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-map btn-kakao"
                        >
                            <span className="icon-k">k</span> 카카오지도
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutLocationPage;