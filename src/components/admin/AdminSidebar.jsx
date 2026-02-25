import { NavLink } from 'react-router-dom';
import URL from '@/constants/url';
import { useState } from 'react';

const AdminSidebar = () => {
    const [openMenus, setOpenMenus] = useState({
        book: true,
        recommend: true,
        borrow: true,
        penalty: true
    });

    const toggleMenu = (menuName) => {
        setOpenMenus(prev => ({
            ...prev,
            [menuName]: !prev[menuName]
        }));
    };

    return (
        <aside className="admin_sidebar">
            <div className="sidebar_header">
                <h2>업무 관리 시스템</h2>
            </div>
            <nav className="sidebar_nav">

                {/* 도서 관리 */}
                <div className={`menu_group ${openMenus.book ? 'open' : ''}`}>
                    <h3 className="group_title" onClick={() => toggleMenu('book')}>
                        도서 관리
                        <span className="arrow_icon">{openMenus.book ? '▲' : '▼'}</span>
                    </h3>
                    <ul className="submenu">
                        <li><NavLink to={URL.BOOK_STATUS} className={({ isActive }) => isActive ? "active" : ""}>도서 현황</NavLink></li>
                        <li><NavLink to={URL.BOOK_REGISTER} className={({ isActive }) => isActive ? "active" : ""}>신규 도서 등록</NavLink></li>
                    </ul>
                </div>

                {/* 추천 도서 관리 */}
                <div className={`menu_group ${openMenus.recommend ? 'open' : ''}`}>
                    <h3 className="group_title" onClick={() => toggleMenu('recommend')}>
                        추천 도서 관리
                        <span className="arrow_icon">{openMenus.recommend ? '▲' : '▼'}</span>
                    </h3>
                    <ul className="submenu">
                        <li><NavLink to={URL.RECOMMENDATION_REORDER} className={({ isActive }) => isActive ? "active" : ""}>진행/예약 추천 도서 관리</NavLink></li>
                        <li><NavLink to={URL.RECOMMENDATION_HISTORY} className={({ isActive }) => isActive ? "active" : ""}>만료 추천 도서 기록</NavLink></li>
                    </ul>
                </div>

                {/* 대출 관리 */}
                <div className={`menu_group ${openMenus.borrow ? 'open' : ''}`}>
                    <h3 className="group_title" onClick={() => toggleMenu('borrow')}>
                        대출 관리
                        <span className="arrow_icon">{openMenus.borrow ? '▲' : '▼'}</span>
                    </h3>
                    <ul className="submenu">
                        <li><NavLink to={URL.BORROW_HISTORY} className={({ isActive }) => isActive ? "active" : ""}>대출 기록</NavLink></li>
                        <li><NavLink to={URL.BORROW_DASHBOARD} className={({ isActive }) => isActive ? "active" : ""}>대출 현황</NavLink></li>
                    </ul>
                </div>

                {/* 연체 패널티 관리 */}
                <div className={`menu_group ${openMenus.penalty ? 'open' : ''}`}>
                    <h3 className="group_title" onClick={() => toggleMenu('penalty')}>
                        연체 패널티 관리
                        <span className="arrow_icon">{openMenus.penalty ? '▲' : '▼'}</span>
                    </h3>
                    <ul className="submenu">
                        <li><NavLink to={URL.PENALTY_MANAGEMENT} className={({ isActive }) => isActive ? "active" : ""}>패널티 관리 페이지</NavLink></li>
                    </ul>
                </div>

            </nav>
        </aside>
    );
};

export default AdminSidebar;