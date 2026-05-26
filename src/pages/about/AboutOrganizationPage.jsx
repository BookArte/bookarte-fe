function AboutOrganizationPage() {

    // 섹션 2: 팀별 업무 데이터
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

    // 섹션 3: 주요 업무 데이터
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
        <div className="about-page-wrapper">
            <div className="org-container">

                {/* [섹션 1] 조직기구도 */}
                <section className="org-chart-section">
                    <div className="org-section-header">
                        <h2>조직기구</h2>
                        <button className="btn-org-link" onClick={() => window.open('/org-detail.pdf')}>
                            전체 조직도 바로가기 ↗
                        </button>
                    </div>

                    <div className="chart-box">
                        <div className="library-logo">📚 북아티 도서관</div>
                        <div className="director-node">
                            <span>북아티 도서관장</span>
                        </div>
                        <div className="chart-line-wrapper">
                            {/* CSS로 트리 라인을 그려줄 영역 */}
                            <div className="horizontal-line"></div>
                        </div>
                        <div className="team-nodes">
                            {teams.map(team => (
                                <div key={team.id} className="team-node-item">
                                    {team.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* [섹션 2] 팀별업무 */}
                <section className="team-tasks-section">
                    <div className="org-section-header">
                        <h2>팀별업무</h2>
                    </div>
                    <div className="tasks-grid">
                        {teams.map(team => (
                            <div key={team.id} className="task-card">
                                <div className="card-head">
                                    <span className="card-icon">{team.icon}</span>
                                    <h3>{team.name}</h3>
                                </div>
                                <ul className="card-body">
                                    {team.tasks.map((task, idx) => (
                                        <li key={idx}>{task}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* [섹션 3] 주요업무 */}
                <section className="core-duties-section">
                    <div className="org-section-header">
                        <h2>주요업무</h2>
                    </div>
                    <div className="duties-list-box">
                        <ol className="duties-list">
                            {coreDuties.map((duty, idx) => (
                                <li key={idx}>
                                    <span className="duty-number">{idx + 1}</span>
                                    <p className="duty-text">{duty}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

            </div>
        </div>
    );
}

export default AboutOrganizationPage;