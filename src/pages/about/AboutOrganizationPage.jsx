import AboutOrganization from "@/components/about/AboutOrganization";
import AboutLayout from "@/components/about/AboutLayout";

function AboutOrganizationPage() {

    // 팀별 업무 데이터
    const teams = [
        {
            id: 'policy',
            name: '도서관정책팀',
            icon: '🏢',
            tasks: [
                '북아티 도서관 중장기 정책 수립 및 발전 방향 연구',
                '지역 공공도서관 등록·평가 및 운영위원회 지원'
            ]
        },
        {
            id: 'operation',
            name: '도서관운영팀',
            icon: '🎧',
            tasks: [
                '북아티 도서관 개관·운영 및 이용자 맞춤형 서비스 계획 수립',
                '도서관 특화 콘텐츠 및 공간 활성화 프로그램 개발·운영'
            ]
        },
        {
            id: 'culture',
            name: '독서문화진흥팀',
            icon: '📖',
            tasks: [
                '시민 독서 생활화 및 지역 독서문화 저변 확대',
                '독서문화 진흥 사업 추진 및 북아티 독서 축제 개최'
            ]
        },
        {
            id: 'cooperation',
            name: '도서관협력팀',
            icon: '🤝',
            tasks: [
                '지역 공공도서관 확충·개선 및 연장 운영 지원',
                '작은도서관 조성 지원 및 네트워크 운영 활성화'
            ]
        }
    ];

    // 주요 업무 데이터
    const coreDuties = [
        '지역도서관 발전 및 도서관서비스 강화를 위한 시책 수립·시행',
        '종합적인 도서관자료의 수집·정리·보존 및 제공',
        '지역도서관 지원 및 협력사업 수행',
        '지역도서관 업무 및 운영개선에 관한 조사·연구',
        '지역도서관의 자료수집 활동 지원 및 이관받은 도서관자료의 보존관리',
        '지역도서관 협력네트워크 구축 및 운영',
        '국립중앙도서관의 도서관자료 수집 활동 및 도서관 협력사업 등 지원',
        '도서관 근무 직원의 업무능력 향상을 위한 교육 운영',
        '그 밖에 대표도서관으로서 기능을 수행하기 위하여 필요한 사무'
    ];

    return (
        <AboutLayout title="조직소개">
            <AboutOrganization TEAMS_DATA={teams} CORE_DUTIES={coreDuties} />
        </AboutLayout>
    );
}

export default AboutOrganizationPage;