import { useMypage } from '@/hooks/domain/mypage/useMypage';
import Loading from '@/components/common/Loading';
import { Outlet } from 'react-router-dom';

function Mypage() {
    const { data, isLoading } = useMypage();

    if (isLoading) return <Loading />;

    return <Outlet context={{ userData: data.userData, stats: data.stats }} />;
}

export default Mypage;