import { useState } from "react";
import bannerImg from '@/assets/images/banner-image.png';
import { NavLink, useNavigate } from 'react-router-dom';
import URL from '@/constants/url';

function Main({ props, mainRecommend, mainBoard }) {
    const [keyword, setKeyword] = useState(''); // 2. 검색어 상태 추가
    const navigate = useNavigate();

    const QuickItem = ({ icon, label, link = "/" }) => (
        <NavLink to={link}>
            <div className="quick-item">
                <div className="q-icon">{icon}</div>
                <p>{label}</p>
            </div>
        </NavLink>
    );

    const onSearch = () => {
        if (!keyword.trim()) return;
        navigate('/book/list', {
            state: { bookTitle: keyword }
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSearch();
        }
    };

    return (
        <div className="main-page-wrapper">
            <div className="main-container">
                {/* 1. 상단 비주얼 배너 (단독 배치로 몰입감 향상) */}
                <section className="top-visual">
                    <div className="main-banner" style={{ backgroundImage: `url(${bannerImg})` }}>
                    </div>
                </section>

                {/* 2. 도서 검색바 */}
                <div className="search-wrapper">
                    <div className="search-inner">
                        <input
                            type="text"
                            placeholder="어떤 책을 찾으시나요?"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button className="search-icon-btn" onClick={onSearch}>🔍</button>
                    </div>
                </div>

                {/* 3. 관리자 추천 도서 목록 */}
                {mainRecommend}

                {/* 4. 퀵 메뉴 */}
                <section className="quick-nav">
                    <QuickItem icon="🏢" label="도서관 소개" link={URL.ABOUT_SITE} />
                    <QuickItem icon="🕰️" label="연혁" link={URL.ABOUT_HISTORY} />
                    <QuickItem icon="📖" label="추천도서" link={URL.BOOK_RECOMMEND} />
                    <QuickItem icon="✨" label="신착도서" link={URL.BOOK_NEW} />
                    <QuickItem icon="🥇" label="인기대출 도서" link={URL.BOOK_POPULAR} />
                    <QuickItem icon="❓" label="자주묻는질문" link={URL.FAQ} />
                    <QuickItem icon="📍" label="찾아오시는길" link={URL.INTRO} />
                </section>

                {/* 5. 하단 공지사항 및 뉴스 영역 (베스트셀러 위치로 이동) */}
                {mainBoard}
            </div>
        </div>
    );
}

export default Main;