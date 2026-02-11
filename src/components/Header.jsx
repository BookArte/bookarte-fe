import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { logoutMember } from "@/api/member.api";

// import * as EgovNet from "@/api/egovFetch";

import URL from "@/constants/url";
import CODE from "@/constants/code";

import logoImg from "@/assets/images/logo_w.png";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();
  const { accessToken, userInfo } = useAuthStore.getState();
  const setLogout = useAuthStore((state) => state.setLogout);

  const isLoggedIn = !!accessToken;

  const logOutHandler = async () => {
    try {
      await logoutMember();
    } catch (error) {
      console.error("로그아웃 요청 실패:", error);
    } finally {
      setLogout();
      navigate(URL.MAIN);
      toast.success("로그아웃 되었습니다.");
    }
  };

  const logInHandler = () => {
    // 로그인 정보 없을 시
    navigate(URL.MEMBER_LOGIN);
    // PC와 Mobile 열린메뉴 닫기
    document.querySelector(".all_menu.WEB").classList.add("closed");
    document.querySelector(".btnAllMenu").classList.remove("active");
    document.querySelector(".btnAllMenu").title = "전체메뉴 닫힘";
    document.querySelector(".all_menu.Mobile").classList.add("closed");
  };

  return (
    // <!-- header -->
    <div className="header">
      <div className="inner">
        <Link to={URL.MAIN} className="ico lnk_go_template" target="_blank">
          홈페이지 템플릿 소개 페이지로 이동
        </Link>

        <h1 className="logo">
          <Link to={URL.MAIN} className="w">
            <img
            // src={logoImg}
            // alt="표준프레임워크포털 eGovFrame 심플홈페이지"
            />
          </Link>
        </h1>

        <div className="gnb">
          <h2 className="blind">주메뉴</h2>
          <ul>
            <li>
              <NavLink
                to={URL.ABOUT}
                className={({ isActive }) => (isActive ? "cur" : "")}
              >
                도서관 소개
              </NavLink>
            </li>
            <li>
              <NavLink
                to={URL.BOOK_RECOMMEND}
                className={({ isActive }) => (isActive ? "cur" : "")}
              >
                도서
              </NavLink>
            </li>
            <li>
              <NavLink
                to={URL.EVENT}
                className={({ isActive }) => (isActive ? "cur" : "")}
              >
                행사/고객센터
              </NavLink>
            </li>
            <li>
              <NavLink
                to={URL.NOTICE}
                className={({ isActive }) => (isActive ? "cur" : "")}
              >
                안내/소식
              </NavLink>
            </li>
            {true && (
              <li>
                <NavLink
                  to={URL.ADMIN_ACCESS_TRAFFIC}
                  className={({ isActive }) => (isActive ? "cur" : "")}
                >
                  사이트관리
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        {/* <!-- PC web에서 보여지는 영역 --> */}
        <div className="user_info">
          {/* 로그아웃 : 로그인 정보 있을때 */}
          {isLoggedIn && (
            <>
              <span className="person">{userInfo?.userName}({userInfo?.userId})</span> 님 안녕하세요
              {true && (
                <NavLink
                  to={URL.MYPAGE}
                  className={({ isActive }) =>
                    isActive ? "btn login cur" : "btn login"
                  }
                >
                  마이페이지
                </NavLink>
              )}
              <button className="btn" onClick={logOutHandler}>
                로그아웃
              </button>
            </>
          )}
          {/* 로그인 : 로그인 정보 없을 때 */}
          {!isLoggedIn && (
            <>
              <button onClick={logInHandler} className="btn login">
                로그인
              </button>
              <NavLink
                to={URL.MEMBER_AGREEMENT}
                className={({ isActive }) =>
                  isActive ? "btn login cur" : "btn login"
                }
              >
                회원가입
              </NavLink>
            </>
          )}
        </div>
        {/* <!--// PC web에서 보여지는 영역 --> */}

        {/* <!-- right area --> */}
        <div className="right_a">
          <button
            type="button"
            className="btn btnAllMenu"
            title="전체메뉴 닫힘"
          >
            전체메뉴
          </button>
          <button
            type="button"
            className="btn mobile btnAllMenuM"
            title="전체메뉴 닫힘"
          >
            전체메뉴
          </button>
        </div>
      </div>

      {/* <!-- All menu : web --> */}
      <div className="all_menu WEB closed">
        <h2 className="blind">전체메뉴</h2>
        <div className="inner">
          <div className="col">
            <h3>도서관 소개</h3>
            <ul>
              <li>
                <NavLink
                  to={URL.ABOUT_SITE}
                  className={({ isActive }) => (isActive ? "cur" : "")}
                >
                  소개
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={URL.ABOUT_HISTORY}
                  className={({ isActive }) => (isActive ? "cur" : "")}
                >
                  연혁
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={URL.ABOUT_ORGANIZATION}
                  className={({ isActive }) => (isActive ? "cur" : "")}
                >
                  조직소개
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={URL.ABOUT_LOCATION}
                  className={({ isActive }) => (isActive ? "cur" : "")}
                >
                  찾아오시는 길
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col">
            <h3>도서</h3>
            <ul>
              <li>
                <NavLink
                  to={URL.INTRO_WORKS}
                  className={({ isActive }) => (isActive ? "cur" : "")}
                >
                  추천도서
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={URL.INTRO_SERVICE}
                  className={({ isActive }) => (isActive ? "cur" : "")}
                >
                  새로들어온 책
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={URL.INTRO_SERVICE}
                  className={({ isActive }) => (isActive ? "cur" : "")}
                >
                  베스트/스테디셀러
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={URL.INTRO_SERVICE}
                  className={({ isActive }) => (isActive ? "cur" : "")}
                >
                  인기대출도서
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col">
            <h3>행사/고객센터</h3>
            <ul>
              <li>
                <NavLink
                  to={URL.SUPPORT_DOWNLOAD}
                  className={({ isActive }) => (isActive ? "cur" : "")}
                >
                  행사/이벤트 참여
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={URL.SUPPORT_QNA}
                  className={({ isActive }) => (isActive ? "cur" : "")}
                >
                  FAQ
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={URL.SUPPORT_APPLY}
                  className={({ isActive }) => (isActive ? "cur" : "")}
                >
                  QNA
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col">
            <h3>안내/소식</h3>
            <ul>
              <li>
                <NavLink to={URL.INFORM_DAILY}>오늘의 행사</NavLink>
              </li>
              <li>
                <NavLink
                  to={URL.INFORM_WEEKLY}
                  className={({ isActive }) => (isActive ? "cur" : "")}
                >
                  공지사항
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={URL.INFORM_NOTICE}
                  className={({ isActive }) => (isActive ? "cur" : "")}
                >
                  뉴스
                </NavLink>
              </li>
            </ul>
          </div>
          {true && (
            <div className="col">
              <h3>사이트관리</h3>
              <ul>
                <li>
                  <NavLink
                    to={URL.ADMIN_SCHEDULE}
                    className={({ isActive }) => (isActive ? "cur" : "")}
                  >
                    일정관리
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={URL.ADMIN_BOARD}
                    className={({ isActive }) => (isActive ? "cur" : "")}
                  >
                    게시판생성관리
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={URL.ADMIN_USAGE}
                    className={({ isActive }) => (isActive ? "cur" : "")}
                  >
                    게시판사용관리
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={URL.ADMIN_NOTICE}
                    className={({ isActive }) => (isActive ? "cur" : "")}
                  >
                    공지사항관리
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={URL.ADMIN_GALLERY}
                    className={({ isActive }) => (isActive ? "cur" : "")}
                  >
                    사이트갤러리관리
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={URL.ADMIN_MANAGER}
                    className={({ isActive }) => (isActive ? "cur" : "")}
                  >
                    사이트관리자 암호변경
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={URL.ADMIN_MEMBERS}
                    className={({ isActive }) => (isActive ? "cur" : "")}
                  >
                    회원관리
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
    // <!--// header -->
  );
}

export default Header;
