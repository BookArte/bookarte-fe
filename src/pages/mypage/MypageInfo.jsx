import MypageInfoForm from '@/components/mypage/MypageInfoForm';
import { useOutletContext } from 'react-router-dom';

function MypageInfo() {

    const { userData } = useOutletContext();

    return <MypageInfoForm userData={userData} />;
}

export default MypageInfo;