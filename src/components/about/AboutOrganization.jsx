function AboutOrganization({ TEAMS_DATA, CORE_DUTIES }) {
    return (
        <div>
            {/* [섹션 1] 조직기구도 */}
            <section className="org-chart-section">
                <div className="org-section-header">
                    <h3>조직기구</h3>
                </div>
                <div className="chart-box">
                    <div className="library-logo">📚 북아티 도서관</div>
                    <div className="director-node"><span>북아티 도서관장</span></div>
                    <div className="chart-line-wrapper"><div className="horizontal-line"></div></div>
                    <div className="team-nodes">
                        {TEAMS_DATA.map(team => (
                            <div key={team.id} className="team-node-item">{team.name}</div>
                        ))}
                    </div>
                </div>
            </section>

            {/* [섹션 2] 팀별업무 */}
            <section className="team-tasks-section">
                <div className="org-section-header"><h3>팀별업무</h3></div>
                <div className="tasks-grid">
                    {TEAMS_DATA.map(team => (
                        <div key={team.id} className="task-card">
                            <div className="card-head">
                                <span className="card-icon">{team.icon}</span>
                                <h4>{team.name}</h4>
                            </div>
                            <ul className="card-body">
                                {team.tasks.map((task, idx) => <li key={idx}>{task}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* [섹션 3] 주요업무 */}
            <section className="core-duties-section">
                <div className="org-section-header"><h3>주요업무</h3></div>
                <div className="duties-list-box">
                    <ol className="duties-list">
                        {CORE_DUTIES.map((duty, idx) => (
                            <li key={idx}>
                                <span className="duty-number">{idx + 1}</span>
                                <p className="duty-text">{duty}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>
        </div>
    );
}

export default AboutOrganization;