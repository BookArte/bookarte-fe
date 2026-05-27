import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function BorrowGraph({ stats }) {
    const midIndex = Math.ceil(stats.length / 2);
    const firstCol = stats.slice(0, midIndex);
    const secondCol = stats.slice(midIndex);

    return (
        <div className="detail-section stats-section">
            <div className="section-header">
                <h2 className="section-title">대출 건수</h2>
                <span className="stats-source">* 본 도서관 사이트에서 제공되는 대출 건수입니다.</span>
            </div>

            {/* 그래프 영역 */}
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={stats} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                        <XAxis dataKey="label" tick={{ fontSize: 12 }} axisLine={{ stroke: '#ddd' }} />
                        <YAxis allowDecimals={false} tickFormatter={(value) => Math.floor(value)} tick={{ fontSize: 12 }} axisLine={{ stroke: '#ddd' }} />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
                            formatter={(value) => [Math.floor(value), "대출 건수"]}
                        />
                        <Line
                            type="monotone"
                            dataKey="count"
                            stroke="#3498db"
                            strokeWidth={2}
                            dot={{ r: 4, fill: '#3498db' }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* 통계 표 영역 (2열 레이아웃) */}
            <div className="stats-table-wrapper">
                <table className="stats-grid-table">
                    <thead>
                        <tr>
                            <th>대출연월</th><th>대출건수</th>
                            <th>대출연월</th><th>대출건수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {firstCol.map((item, idx) => (
                            <tr key={idx}>
                                <td className="bg-light">{item.year}년 {String(item.month).padStart(2, '0')}월</td>
                                <td>{item.count}</td>
                                {secondCol[idx] ? (
                                    <>
                                        <td className="bg-light">{secondCol[idx].year}년 {String(secondCol[idx].month).padStart(2, '0')}월</td>
                                        <td>{secondCol[idx].count}</td>
                                    </>
                                ) : (
                                    <><td className="bg-light">-</td><td>-</td></>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default BorrowGraph;