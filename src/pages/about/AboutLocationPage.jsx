import AboutLayout from "../../components/about/AboutLayout";
import AboutLocation from "../../components/about/AboutLocation";
import { useKakaoMap } from "../../hooks/about/useKakaoMap";

function AboutLocationPage() {

    // 1. 국립중앙도서관 데이터 선언
    const libraryInfo = {
        name: '국립중앙도서관',
        address: '서울특별시 서초구 반포대로 201',
        subAddress: '서초구 반포대로 201', // 인포윈도우용 주소
        phone: '02-xxx-xxxx',
        lat: 37.497689,
        lng: 127.0028333,
        naverMapUrl: 'https://map.naver.com/p/entry/place/11591186',
        kakaoMapUrl: 'https://map.kakao.com/link/map/국립중앙도서관,37.497689,127.0028333'
    };

    // 2. DOM 렌더링 및 카카오맵 초기화 로직을 Custom Hook에 완전히 위임
    useKakaoMap({
        lat: libraryInfo.lat,
        lng: libraryInfo.lng,
        name: libraryInfo.name,
        subAddress: libraryInfo.subAddress
    });

    // 3. 레이아웃과 데이터 결합하여 반환
    return (
        <AboutLayout title="찾아오시는 길">
            <AboutLocation info={libraryInfo} />
        </AboutLayout>
    );
}

export default AboutLocationPage;