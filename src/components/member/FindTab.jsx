import { Link, useLocation } from 'react-router-dom';
import URL from '@/constants/url';

function FindTab() {
    const { pathname } = useLocation();

    const tabs = [
        { id: 'id', label: '아이디 찾기', path: URL.MEMBER_FIND_ID },
        { id: 'pw', label: '비밀번호 찾기', path: URL.MEMBER_FIND_PASSWORD },
    ];

    return (
        <div className='find-tab-group'>
            {tabs.map((tab) => (
                <Link
                    key={tab.id}
                    to={tab.path}
                    className={`tab-item ${pathname === tab.path ? 'active' : ''}`}
                >
                    {tab.label}
                </Link>
            ))}
        </div>
    );
}

export default FindTab;