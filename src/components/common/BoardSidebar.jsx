import { NavLink } from "react-router-dom";

function BoardSidebar({ title, menus }) {

    return (
        <nav className="board-list-user-nav">
            <div className="nav-inner-box">
                <h2 className="nav-title">{title}</h2>
                <ul className="nav-menu-list">
                    {menus.map((menu, index) => (
                        <li key={index} className="nav-menu-item">
                            <NavLink
                                to={menu.path}
                                className={({ isActive }) =>
                                    `nav-menu-link ${isActive ? 'is-active' : ''}`
                                }
                            >
                                {menu.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default BoardSidebar;