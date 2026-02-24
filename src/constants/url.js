const URL = {
  //COMMON
  MAIN: "/", //메인페이지

  LOGIN: "/login", //로그인
  ERROR: "/error", //로그인

  //ABOUT
  ABOUT: "/about", //사이트소개
  ABOUT_SITE: "/about/site", // 사이트소개/소개
  ABOUT_HISTORY: "/about/history", // 사이트소개/연혁
  ABOUT_ORGANIZATION: "/about/organization", // 사이트소개/조직소개
  ABOUT_LOCATION: "/about/location", // 사이트소개/찾아오시는길

  //INTRO
  INTRO: "/intro/location", // 오시는길

  //BOOK
  BOOK_RECOMMEND: "/book/recommendation", // 도서관안내
  BOOK_NEW: "/book/new", // 도서관안내/신착도서
  BOOK_BEST: "/book/best", // 도서관안내/베스트셀러
  BOOK_POPULAR: "/book/popular", // 도서관안내/인기대출도서
  BOOK_VIEW: "/book/view/:bookId", // 도서 상세페이지
  BOOK_SEARCH: "/book/list", // 도서관안내/도서검색

  BOOK_VIEW_PATH: "/book/view/:bookId", // 도서 상세페이지
  BOOK_VIEW: (bookId) => `/book/view/${bookId}`, // 도서 상세페이지 함수

  //BOOK ADMIN
  BOOK_REGISTER: "/admin/book/register", // 관리자 도서등록
  BOOK_STATUS: "/admin/book/status", // 관리자 도서현황

  BOOK_UPDATE: "/admin/book/update/:bookId", // 도서 수정페이지
  BOOK_UPDATE: (bookId) => `/admin/book/update/${bookId}`, // 도서 수정페이지 함수

  //RECOMMENDATION
  RECOMMENDATION_SET: "/admin/recommendation/set", // 관리자 추천도서 등록
  RECOMMENDATION_REORDER: "/admin/recommendation/reorder", // 관리자 추천도서 순서변경
  RECOMMENDATEION_UPDATE: "/admin/recommendation/update/:recommendationId", // 관리자 추천도서 수정
  RECOMMENDATEION_UPDATE: (recommendationId) => `/admin/recommendation/update/${recommendationId}`, // 관리자 추천도서 수정 함수
  RECOMMENDATION_HISTORY: "/admin/recommendation/history", // 관리자 추천도서 이력

  //BORROW
  BORROW_HISTORY: "/admin/borrow/history", // 관리자 전체 대출 이력
  BORROW_DASHBOARD: "/admin/borrow/dashboard", // 관리자 대출 현황

  //PENALTY
  PENALTY_MANAGEMENT: "/admin/penalty/management", // 관리자 패널티 관리 페이지

  //EVENT
  EVENT: "/event", // 행사안내
  EVENT_VIEW: "/event/view", // 행사안내/행사상세

  //SUPPORT
  SUPPORT_FAQ: "/support/faq", // 고객지원/자주묻는질문
  SUPPORT_FAQ_VIEW: "/support/faq/view", // 고객지원/자주묻는질문/상세
  SUPPORT_QNA: "/support/qna", // 고객지원/묻고답하기
  SUPPORT_QNA_WRITE: "/support/qna/write", // 고객지원/묻고답하기/글쓰기
  SUPPORT_QNA_VIEW: "/support/qna/view", // 고객지원/묻고답하기/상세
  SUPPORT_QNA_MODIFY: "/support/qna/modify", // 고객지원/묻고답하기/수정

  //BOARD
  NOTICE: "/board/notice", // 게시판/공지사항
  NOTICE_VIEW: "/board/notice/view", // 게시판/공지사항/상세
  NEWS: "/board/news", // 게시판/새소식
  NEWS_VIEW: "/board/news/view", // 게시판/새소식/상세

  //MEMBER
  MEMBER_AGREEMENT: "/member/agreement", // 회원가입약관
  MEMBER_JOIN: "/member/join", // 회원가입
  MEMBER_LOGIN: "/member/login", // 로그인
  MEMBER_FIND_ID: "/member/find_id", // 아이디찾기
  MEMBER_FIND_PASSWORD: "/member/find_password", // 비밀번호찾기
  MEMBER_RESET_PASSWORD: "/member/reset_password",  // 비밀번호 재설정
  MYPAGE: "/mypage",  // 마이페이지
  MYPAGE_INFO: "/mypage/info", // 마이페이지/회원정보
  MYPAGE_BORROW: "/mypage/borrow", // 마이페이지/대출현황
  MYPAGE_EVENT: "/mypage/event", // 마이페이지/참여행사
  MYPAGE_QNA: "/mypage/qna", // 마이페이지/묻고답하기
  MYPAGE_WISH_LIST: "/mypage/wish_list", // 마이페이지/위시리스트
  MYPAGE_REVIEW: "/mypage/review", // 마이페이지/내서평
  MYPAGE_POINT: "/mypage/point", // 마이페이지/포인트

  //ADMIN
  ADMIN_ACCESS_TRAFFIC: "/admin/access_traffic", // 사이트관리/접속통계

  ADMIN_POPUP: "/admin/popup", // 사이트관리/팝업관리
  ADMIN_POPUP_VIEW: "/admin/popup/view", // 사이트관리/팝업관리상세
  ADMIN_POPUP_WRITE: "/admin/popup/write", // 사이트관리/팝업관리등록

  ADMIN_AGREEMENT: "/admin/agreement", // 사이트관리/약관관리
  ADMIN_SEO: "/admin/seo", // 사이트관리/SEO관리

  ADMIN_MANAGER: "/admin/manager", // 사이트관리/사이트관리자관리
  ADMIN_MANAGER_VIEW: "/admin/manager/view", // 사이트관리/사이트관리자관리상세
  ADMIN_MANAGER_WRITE: "/admin/manager/write", // 사이트관리/사이트관리자관리등록

  ADMIN_MEMBER: "/admin/member", // 사이트관리/회원관리
  ADMIN_MEMBER_VIEW: "/admin/member/view", // 사이트관리/회원관리상세
  ADMIN_MEMBER_WRITE: "/admin/member/write", // 사이트관리/회원관리등록

  ADMIN_WITHDRAWAL: "/admin/withdrawal", // 사이트관리/회원탈퇴관리
  ADMIN_WITHDRAWAL_VIEW: "/admin/withdrawal/view", // 사이트관리/회원탈퇴관리상세
  ADMIN_WITHDRAWAL_WRITE: "/admin/withdrawal/write", // 사이트관리/회원탈퇴관리등록

  ADMIN_BOOK: "/admin/book", // 사이트관리/도서관리
  ADMIN_BOOK_VIEW: "/admin/book/view", // 사이트관리/도서관리상세
  ADMIN_BOOK_WRITE: "/admin/book/write", // 사이트관리/도서관리등록

  ADMIN_CATEGORY: "/admin/category", // 사이트관리/도서분류관리
  ADMIN_CATEGORY_VIEW: "/admin/category/view", // 사이트관리/도서분류관리상세
  ADMIN_CATEGORY_WRITE: "/admin/category/write", // 사이트관리/도서분류관리등록

  ADMIN_REVIEW: "/admin/review", // 사이트관리/도서서평관리
  ADMIN_REVIEW_VIEW: "/admin/review/view", // 사이트관리/도서서평관리상세
  ADMIN_REVIEW_WRITE: "/admin/review/write", // 사이트관리/도서서평관리등록

  ADMIN_EVENT: "/admin/event", // 사이트관리/행사관리
  ADMIN_EVENT_VIEW: "/admin/event/view", // 사이트관리/행사관리상세
  ADMIN_EVENT_WRITE: "/admin/event/write", // 사이트관리/행사관리등록

  ADMIN_FAQ: "/admin/faq", // 사이트관리/자주묻는질문관리
  ADMIN_FAQ_VIEW: "/admin/faq/view", // 사이트관리/자주묻는질문관리상세
  ADMIN_FAQ_WRITE: "/admin/faq/write", // 사이트관리/자주묻는질문관리등록

  ADMIN_QNA: "/admin/qna", // 사이트관리/묻고답하기관리
  ADMIN_QNA_VIEW: "/admin/qna/view", // 사이트관리/묻고답하기관리상세
  ADMIN_QNA_WRITE: "/admin/qna/write", // 사이트관리/묻고답하기관리등록

  ADMIN_NOTICE: "/admin/notice", // 사이트관리/공지사항관리
  ADMIN_NOTICE_VIEW: "/admin/notice/view", // 사이트관리/공지사항관리상세
  ADMIN_NOTICE_WRITE: "/admin/notice/write", // 사이트관리/공지사항관리등록

  ADMIN_NEWS: "/admin/news", // 사이트관리/새소식관리
  ADMIN_NEWS_VIEW: "/admin/news/view", // 사이트관리/새소식관리상세
  ADMIN_NEWS_WRITE: "/admin/news/write", // 사이트관리/새소식관리등록

};


export default URL;
