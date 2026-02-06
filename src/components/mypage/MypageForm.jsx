import MypageSidebar from './MypageSidebar';
import MypageHeader from './MypageHeader';
import MypageStatusCard from './MypageStatusCard';
import MypagePointBox from './MypagePointBox';

function MypageForm({ userData, stats }) {
    return (
        <div className="mypage-container">
            <MypageSidebar />

            <main className="mypage-content">
                <MypageHeader name={userData.name} />

                <MypagePointBox point={1250} />

                <div className="mypage-status-grid">
                    {stats.map((item, index) => (
                        <MypageStatusCard
                            key={index}
                            label={item.label}
                            count={item.count}
                            icon={item.icon}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default MypageForm;