import { Outlet, useLocation } from 'react-router-dom';
import BoardSidebar from "./BoardSidebar";
import { BOARD_MENUS, BOARD_SERVICE_MENUS } from '@/constants/board';

function BoardLayout() {
    const location = useLocation();

    const menuMap = {
        '/notice': BOARD_MENUS,
        '/news': BOARD_MENUS,
        '/faq': BOARD_SERVICE_MENUS,
        '/qna': BOARD_SERVICE_MENUS,
        '/event': BOARD_SERVICE_MENUS,
    };

    const matchedPath = Object.keys(menuMap).find(path =>
        location.pathname.startsWith(path)
    );

    const currentMenuData = matchedPath ? menuMap[matchedPath] : BOARD_MENUS;

    const currentActiveMenu = currentMenuData.items.find(item =>
        item.path !== '/' ? location.pathname.startsWith(item.path) : location.pathname === '/'
    );

    return (
        <div className="board-list-user-container">
            <div className="board-list-user-wrap">

                <div className="board-list-user-location">
                    <ul>
                        <li><a href="/" className="home-icon">Home</a></li>
                        <li>{currentMenuData.title}</li>
                        <li>{currentActiveMenu ? currentActiveMenu.name : '상세보기'}</li>
                    </ul>
                </div>

                <div className="board-list-user-layout">

                    <BoardSidebar
                        title={currentMenuData.title}
                        menus={currentMenuData.items}
                    />

                    <div className="board-list-user-contents">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );

}

export default BoardLayout;