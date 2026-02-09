import MypageSidebar from './MypageSidebar';
import MypageHeader from './MypageHeader';
import MypageStatusCard from './MypageStatusCard';
import MypagePointBox from './MypagePointBox';
import { MYPAGE_MENUS } from '@/constants/mypage';

function MypageForm({ userData, stats }) {

    return (
        <div className="mypage-container">
            <MypageSidebar menus={MYPAGE_MENUS} />

            <main className="mypage-content">
                <MypageHeader name={userData.name} />

                <MypagePointBox point={userData.point} grade={userData.grade} />

                <div className="mypage-status-grid">
                    {stats.map((item, index) => (
                        <MypageStatusCard key={index} {...item} />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default MypageForm;