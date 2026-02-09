import MypageInfoForm from '@/components/mypage/MypageInfoForm';
import { useOutletContext } from 'react-router-dom';
import { useMypageInfo } from '@/hooks/domain/mypage/useMypageInfo';

function MypageInfo() {

    const { userData, refetch } = useOutletContext();

    const MypageInfoProps = useMypageInfo(userData, refetch);

    return <MypageInfoForm {...MypageInfoProps} />;
}

export default MypageInfo;