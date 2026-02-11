import { Outlet } from 'react-router-dom';
import MypageSidebar from './MypageSidebar';
import { MYPAGE_MENUS } from '@/constants/mypage';

function MypageLayout() {
    return (
        <div className="mypage-container">
            <MypageSidebar menus={MYPAGE_MENUS} />
            <main className="mypage-content">
                <Outlet />
            </main>
        </div>
    );
}

export default MypageLayout;