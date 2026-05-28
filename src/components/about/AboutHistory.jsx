function AboutHistory({ historyData }) {
    return (
        <div className="history-timeline">
            {historyData.map((data, index) => (
                <div className="history-year-group" key={index}>
                    <div className="year-label">{data.year}</div>
                    <ul className="event-list">
                        {data.events.map((event, idx) => (
                            <li className="event-item" key={idx}>
                                <span className="event-month">{event.month}월</span>
                                <span className="event-desc">{event.description}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default AboutHistory;