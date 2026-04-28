import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import URL from '@/constants/url';
import bannerImg from '@/assets/images/banner-image.png';

function Main(props) {
  const [activeTab, setActiveTab] = useState('notice');

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
            <input type="text" placeholder="어떤 책을 찾으시나요?" />
            <button className="search-icon-btn">🔍</button>
          </div>
        </div>

        {/* 3. AI 추천도서 */}
        <section className="section-recommend">
          <div className="section-head">
            <h3>북아티 <strong>AI 추천도서</strong></h3>
            <p className="tags">#미래/기술 #성장/자기계발 #위로/힐링</p>
          </div>
          <div className="recommend-slider">
            <div className="book-grid">
              <BookItem title="파도가 없는 바다" author="이미예 저" />
              <BookItem title="GPT 활용법" author="김철수 저" />
              <BookItem title="IT 트렌드 2025" author="박영희 저" />
              <BookItem title="인공지능의 시대" author="이영진 저" />
              <BookItem title="제목 없는 바다" author="김작가 저" />
            </div>
            <div className="slider-dots">
              <span className="dot active"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        </section>

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
        <section className="bottom-board-section">
          <div className="board-container">
            <div className="board-header">
              <div className="board-tabs">
                <button
                  className={activeTab === 'notice' ? 'active' : ''}
                  onClick={() => setActiveTab('notice')}
                >공지사항</button>
                <button
                  className={activeTab === 'news' ? 'active' : ''}
                  onClick={() => setActiveTab('news')}
                >뉴스</button>
              </div>
              <a href={`/${activeTab}`} className="btn-more-link">전체보기 +</a>
            </div>

            <div className="board-content-list">
              <BoardRow title="2024년 5월 개인정보 처리방침 개정 안내" date="2024-04-27" />
              <BoardRow title="북아티 도서관 가정의 달 맞이 독서 이벤트 안내" date="2024-04-25" />
              <BoardRow title="신규 대출 시스템 도입에 따른 일시 중단 안내" date="2024-04-20" />
              <BoardRow title="북아티 AI 추천 서비스 업그레이드 소식" date="2024-04-15" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

const BoardRow = ({ title, date }) => (
  <div className="board-row">
    <span className="row-title">{title}</span>
    <span className="row-date">{date}</span>
  </div>
);

const BookItem = ({ title, author }) => (
  <div className="book-item">
    <div className="book-img">도서 이미지</div>
    <div className="book-txt">
      <p className="b-title">{title}</p>
      <p className="b-author">{author}</p>
    </div>
  </div>
);

const QuickItem = ({ icon, label, link = "/" }) => (
  <NavLink to={link}>
    <div className="quick-item">
      <div className="q-icon">{icon}</div>
      <p>{label}</p>
    </div>
  </NavLink>
);

export default Main;
