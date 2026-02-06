function MypageSidebar() {
    const menus = [
        { name: '도서관서비스', active: true },
        { name: '내정보', active: false },
        { name: '대출현황', active: false },
        { name: '대출이력', active: false },
        { name: '프로그램 신청', active: false },
        { name: '문의내역', active: false },
        { name: '나의 관심도서', active: false },
        { name: '리뷰', active: false },
        { name: '독서 포인트', active: false },
    ];

    return (
        <aside className="mypage-sidebar">
            <h2 className="mypage-sidebar-title">마이페이지</h2>
            <ul className="mypage-menu-list">
                {menus.map((menu, index) => (
                    <li key={index} className={`mypage-menu-item ${menu.active ? 'active' : ''}`}>
                        {menu.name}
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default MypageSidebar;