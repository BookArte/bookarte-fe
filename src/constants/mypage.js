export const MEMBER_GRADES = {
    VIP: { NAME: 'VIP회원', MIN_POINT: 10000 },
    GOLD: { NAME: '우수회원', MIN_POINT: 5000 },
    BASIC: { NAME: '일반회원', MIN_POINT: 0 },
};

export const MYPAGE_STATS_CONFIG = [
    {
        label: "도서 대출현황",
        icon: "/assets/images/ico_loan.png",
        dataKey: "loanCount"
    },
    {
        label: "도서 예약현황",
        icon: "/assets/images/ico_reserve.png",
        dataKey: "reserveCount"
    },
    {
        label: "프로그램 신청현황",
        icon: "/assets/images/ico_program.png",
        dataKey: "programCount"
    },
    {
        label: "문의내역",
        icon: "/assets/images/ico_facility.png",
        dataKey: "qnaCount"
    },
    {
        label: "나의 관심도서",
        icon: "/assets/images/ico_heart.png",
        dataKey: "heartCount"
    },
];