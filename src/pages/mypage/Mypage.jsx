import { useMypage } from '@/hooks/domain/mypage/useMypage';
import Loading from '@/components/common/Loading';
import { Outlet } from 'react-router-dom';
import { useMyPenalties } from '../../hooks/domain/penalty/useMyPenalties';

function Mypage() {
    const { data, isLoading, refetch } = useMypage();
    const { penalties, isPenaltyLoading } = useMyPenalties();

    if (isLoading || isPenaltyLoading) return <Loading />;

    return <Outlet context={{ userData: data.userData, stats: data.stats, penalties, refetch }} />;
}

export default Mypage;