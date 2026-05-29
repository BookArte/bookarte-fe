function AboutIntro() {
    return (
        <>
            <section className="intro-hero-section">
                <div className="hero-content">
                    <h3>Artistic Reading, Smart Rental</h3>
                    <p className="hero-subtitle">예술적인 독서, 스마트 대여</p>
                    <p className="hero-description">
                        북아티(BookArte)는 단순히 책을 빌려주는 공간을 넘어,<br />
                        당신의 일상에 예술적 영감을 채워주는 스마트 도서관입니다.
                    </p>
                </div>
            </section>

            <section className="intro-core-values">
                <h3 className="section-title">우리의 핵심 가치</h3>
                <div className="value-cards">
                    <div className="value-card">
                        <span className="value-icon">📚</span>
                        <h4>다양한 지식의 보고</h4>
                        <p>베스트셀러부터 전문 서적까지, 폭넓은 도서 컬렉션을 제공합니다.</p>
                    </div>
                    <div className="value-card">
                        <span className="value-icon">✨</span>
                        <h4>맞춤형 큐레이션</h4>
                        <p>독자의 취향을 분석하여 가장 알맞은 책을 제안하는 스마트한 경험을 선사합니다.</p>
                    </div>
                    <div className="value-card">
                        <span className="value-icon">💻</span>
                        <h4>편리한 서비스</h4>
                        <p>언제 어디서나 쉽고 빠른 도서 검색과 대출 서비스를 지원합니다.</p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AboutIntro;