import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
    return (
        <aside className="admin_sidebar">
            <div className="sidebar_header">
                <h2>업무 관리 시스템</h2>
            </div>
            <nav className="sidebar_nav">
                <div className="menu_group">
                    <h3 className="group_title">도서 관리</h3>
                    <ul>
                        <li><NavLink to="/admin/book/list" className={({ isActive }) => isActive ? "active" : ""}>등록된 도서 현황</NavLink></li>
                        <li><NavLink to="/admin/book/register" className={({ isActive }) => isActive ? "active" : ""}>신규 도서 등록</NavLink></li>
                    </ul>
                </div>

                <div className="menu_group">
                    <h3 className="group_title">추천 도서 관리</h3>
                    <ul>
                        <li><NavLink to="/admin/recommendation/set" className={({ isActive }) => isActive ? "active" : ""}>추천 도서 설정</NavLink></li>
                        <li><NavLink to="/admin/recommendation/reorder" className={({ isActive }) => isActive ? "active" : ""}>순서 변경</NavLink></li>
                    </ul>
                </div>

                <div className="menu_group">
                    <h3 className="group_title">대출 관리</h3>
                    <ul>
                        <li><NavLink to="/admin/borrow/list" className={({ isActive }) => isActive ? "active" : ""}>전체 대출 이력</NavLink></li>
                        <li><NavLink to="/admin/borrow/dashboard" className={({ isActive }) => isActive ? "active" : ""}>대출 현황</NavLink></li>
                    </ul>
                </div>

                <div className="menu_group">
                    <h3 className="group_title">연체 패널티 관리</h3>
                    <ul>
                        <li><NavLink to="/admin/penalty/management" className={({ isActive }) => isActive ? "active" : ""}>패널티 관리 페이지</NavLink></li>
                    </ul>
                </div>
            </nav>
        </aside>
    );
};

export default AdminSidebar;