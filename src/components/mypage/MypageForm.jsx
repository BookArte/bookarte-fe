import MypageSidebar from './MypageSidebar';
import MypageHeader from './MypageHeader';
import MypageStatusCard from './MypageStatusCard';
import MypagePointBox from './MypagePointBox';

function MypageForm(data) {

    const { userData, stats } = data;

    console.log(data)

    return (
        <div className="mypage-container">
            <MypageSidebar />

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