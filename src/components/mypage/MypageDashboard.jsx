import { useOutletContext } from 'react-router-dom';
import MypageHeader from './MypageHeader';
import MypagePointBox from './MypagePointBox';
import MypageStatusCard from './MypageStatusCard';

function MypageDashboard() {

    const { userData, stats } = useOutletContext();

    return (
        <>
            <MypageHeader name={userData.name} />
            <MypagePointBox point={userData.point} grade={userData.grade} />
            <div className="mypage-status-grid">
                {stats.map((item, index) => (
                    <MypageStatusCard key={index} {...item} />
                ))}
            </div>
        </>
    );
}
export default MypageDashboard;