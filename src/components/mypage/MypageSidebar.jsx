import { NavLink } from "react-router-dom";

function MypageSidebar({ menus }) {

    return (
        <aside className="mypage-sidebar">
            <h2 className="mypage-sidebar-title">마이페이지</h2>
            <ul className="mypage-menu-list">
                {menus.map((menu, index) => (
                    <li key={index} className="mypage-menu-item">
                        <NavLink
                            to={menu.path}
                            end={menu.path === ''}
                            className={({ isActive }) =>
                                `mypage-menu-item ${isActive ? 'active' : ''}`
                            }
                        >
                            {menu.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default MypageSidebar;