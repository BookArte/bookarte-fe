import MypageForm from '@/components/mypage/MypageForm';
import { useMypage } from '@/hooks/domain/mypage/useMypage';
import Loading from '@/components/common/Loading';

function Mypage() {
    const { data, isLoading } = useMypage();

    if (isLoading) return <Loading />;

    return <MypageForm {...data} />;
}

export default Mypage;