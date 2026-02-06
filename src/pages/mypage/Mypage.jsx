import MypageForm from '@/components/mypage/MypageForm';
// import { useMypage } from '@/hooks/domain/useMypage';

function Mypage() {
    const mypageProps = {
        userData: { name: "테스터" },
        stats: [
            { label: "도서 대출현황", count: 0, icon: "/assets/images/ico_loan.png" },
            { label: "도서 예약현황", count: 0, icon: "/assets/images/ico_reserve.png" },
            { label: "프로그램 신청현황", count: 0, icon: "/assets/images/ico_program.png" },
            { label: "문의내역", count: 0, icon: "/assets/images/ico_facility.png" },
            { label: "나의 관심도서", count: 0, icon: "/assets/images/ico_heart.png" },
        ]
    };

    return <MypageForm {...mypageProps} />;
}

export default Mypage;