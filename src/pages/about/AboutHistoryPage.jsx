import AboutLayout from "@/components/about/AboutLayout";
import AboutHistory from "@/components/about/AboutHistory";

const historyData = [
    {
        year: '2026',
        events: [
            { month: '05', description: '북아티(BookArte) 정식 서비스 오픈' },
            { month: '03', description: '스마트 대여 시스템 구축 및 베타 테스트' },
            { month: '01', description: 'AI 도서 큐레이션 알고리즘 도입' }
        ]
    },
    {
        year: '2025',
        events: [
            { month: '11', description: '도서관 통합 관리 시스템(LMS) 개발 착수' },
            { month: '08', description: '초기 도서 데이터베이스 10만 권 확보' },
            { month: '05', description: '북아티 프로젝트 TF팀 결성' }
        ]
    }
];

function AboutHistoryPage() {
    return (
        <AboutLayout title="연혁">
            <AboutHistory historyData={historyData} />
        </AboutLayout>
    );
}

export default AboutHistoryPage;