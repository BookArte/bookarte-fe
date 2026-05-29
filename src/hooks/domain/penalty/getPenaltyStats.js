export function getPenaltyStats(penalties) {
    if (!penalties || penalties.length === 0) return null;

    const startDates = penalties.map(p => new Date(p.penaltyStartDate));
    const endDates = penalties.map(p => new Date(p.penaltyEndDate));

    const finalStart = new Date(Math.min(...startDates));
    const finalEnd = new Date(Math.max(...endDates));

    const today = new Date();
    today.setHours(0, 0, 0, 0); // 시간 제외

    const diffTime = finalEnd - today;
    const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return {
        startDate: finalStart.toISOString().split('T')[0],
        endDate: finalEnd.toISOString().split('T')[0],
        remainingDays: remainingDays > 0 ? remainingDays : 0
    };

}
