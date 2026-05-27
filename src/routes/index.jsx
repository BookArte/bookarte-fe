import { Routes, Route } from "react-router-dom";
import Main from "@/pages/main/Main";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import initPage from "@/js/ui";
import { useEffect } from "react";
import RegisterBook from "../pages/book/RegisterBook";
import BookList from "../pages/book/BookList";
import BookDetail from "../pages/book/BookDetail";
import UpdateBook from "../pages/book/UpdateBook";
import SetRecommedation from "../pages/recommendation/SetRecommedation";
import Login from "../pages/member/Login";
import Join from "../pages/member/Join";
import RecommedationBookList from "../pages/recommendation/RocommendationBookList";
import Agreement from "../pages/member/Agreement";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FindId from "../pages/member/FindId";
import FindPassword from "../pages/member/FindPassword";
import ReorderRecommendation from "../pages/recommendation/ReorderRecommendation";
import ResetPassword from "../pages/member/ResetPassword";
import UpdateRecommendation from "../pages/recommendation/UpdateRecommendation";
import BorrowDashboardPage from "../pages/borrow/BorrowDashboardPage";
import MyBorrowStatusList from "../pages/borrow/MyBorrowStatusList";
import Mypage from "../pages/mypage/Mypage";
import MypageInfo from "../pages/mypage/MypageInfo";
import MypageLayout from "../components/mypage/MypageLayout";
import MypageDashboard from "../components/mypage/MypageDashboard";
import PenaltyManagement from "../pages/penalty/PenaltyManagement";
import AdminLayout from "../components/admin/AdminLayout";
import RecommendationHistory from "../pages/recommendation/RecommendationHistory";
import BorrowHistory from "../pages/borrow/BorrowHistory";
import BookStatusList from "../pages/book/BookStatusList";
import AdminNoticePage from "../pages/admin/notice/AdminNoticePage";
import AdminNoticeWritePage from "../pages/admin/notice/AdminNoticeWritePage";
import AdminNoticeModifyPage from "../pages/admin/notice/AdminNoticeModifyPage";
import NewArrivalsList from "../pages/book/NewArrivalsList";
import BestSellerList from "../pages/book/BestSellerList";
import PopularList from "../pages/book/PopularList";
import MyBorrowHistory from "../pages/borrow/MyBorrowHistory";
import MyWishList from "../pages/wish/MyWishList";
import AdminNewsPage from "../pages/admin/news/AdminNewsPage";
import AdminNewsWritePage from "../pages/admin/news/AdminNewsWritePage";
import AdminNewsModifyPage from "../pages/admin/news/AdminNewsModifyPage";
import AdminQnaPage from "../pages/admin/qna/AdminQnaPage";
import AdminQnaWritePage from "../pages/admin/qna/AdminQnaWritePage";
import AdminQnaModifyPage from "../pages/admin/qna/AdminQnaModifyPage";
import AdminFaqPage from "../pages/admin/faq/AdminFaqPage";
import AdminFaqWritePage from "../pages/admin/faq/AdminFaqWritePage";
import AdminFaqModifyPage from "../pages/admin/faq/AdminFaqModifyPage";
import BoardLayout from "../components/common/BoardLayout";
import NoticeListPage from "../pages/notice/NoticeListPage";
import NoticeDetailPage from "../pages/notice/NoticeDetailPage";
import NewsListPage from "../pages/news/NewsListPage";
import NewsDetailPage from "../pages/news/NewsDetailPage";
import FaqListPage from "../pages/faq/FaqListPage";
import FaqDetailPage from "../pages/faq/FaqDetailPage";
import QnaHomePage from "../pages/qna/QnaHomePage";
import QnaWritePage from "../pages/qna/QnaWritePage";
import MyPageQnaListPage from "../pages/mypage/MypageQnaListPage";
import MypageQnaDetailPage from "../pages/mypage/MypageQnaDetailPage";
import MypageQnaEditPage from "../pages/mypage/MypageQnaEditPage";

const RootRoutes = () => {

  useEffect(() => {
    initPage();
  }, []);

  return (
    <>
      <Header />

      <Routes>
        {/* MAIN */}
        <Route path={"/"} element={<Main />} />

        {/* BookList */}
        <Route path={"/book/list"} element={<BookList />} />

        {/* NewArrivalsList */}
        <Route path={"/book/new"} element={<NewArrivalsList />} />

        {/* BestSellerList */}
        <Route path={"/book/best"} element={<BestSellerList />} />

        {/* PopularList */}
        <Route path={"/book/popular"} element={<PopularList />} />

        {/* BookDetail */}
        <Route path={"/book/view/:bookId"} element={<BookDetail />} />

        {/* RecommendationBookList */}
        <Route path={"/book/recommendation"} element={< RecommedationBookList />} />

        <Route path="/admin" element={<AdminLayout />} >

          {/* 도서 업무 */}
          <Route path="book">
            {/* 도서 등록 */}
            <Route path="register" element={<RegisterBook />} />
            {/* 도서 현황 */}
            <Route path="status" element={<BookStatusList />} />
            {/* 도서 수정 */}
            <Route path="update/:bookId" element={<UpdateBook />} />
          </Route>

          {/* 추천 도서 업무 */}
          <Route path="recommendation">
            {/* 추천 도서 설정 */}
            <Route path="set" element={<SetRecommedation />} />
            {/* 추천 도서 순서 변경 */}
            <Route path="reorder" element={<ReorderRecommendation />} />
            {/* 추천 도서 수정 */}
            <Route path="update/:recommendationId" element={<UpdateRecommendation />} />
            {/* 추천 도서 히스토리 */}
            <Route path="history" element={<RecommendationHistory />} />
          </Route>

          {/* 대출 업무 */}
          <Route path="borrow">
            {/* 전체 대출 이력 */}
            <Route path="history" element={<BorrowHistory />} />
            { /* 대출 대시보드 */}
            <Route path="dashboard" element={<BorrowDashboardPage />} />
          </Route>

          {/*연체 패널티 관리*/}
          <Route path="penalty/management" element={<PenaltyManagement />} />

          {/* 공지사항 관리 */}
          <Route path="notice">
            <Route index element={<AdminNoticePage />} />
            <Route path="write" element={<AdminNoticeWritePage />} />
            <Route path="modify/:id" element={<AdminNoticeModifyPage />} />
          </Route>

          {/* 뉴스 관리 */}
          <Route path="news">
            <Route index element={<AdminNewsPage />} />
            <Route path="write" element={<AdminNewsWritePage />} />
            <Route path="modify/:id" element={<AdminNewsModifyPage />} />
          </Route>

          {/* Q&A 관리 */}
          <Route path="qna">
            <Route index element={<AdminQnaPage />} />
            <Route path="write" element={<AdminQnaWritePage />} />
            <Route path="modify/:id" element={<AdminQnaModifyPage />} />
          </Route>

          {/* FAQ 관리 */}
          <Route path="faq">
            <Route index element={<AdminFaqPage />} />
            <Route path="write" element={<AdminFaqWritePage />} />
            <Route path="modify/:id" element={<AdminFaqModifyPage />} />
          </Route>

        </Route>


        {/* Member */}
        <Route path="/member">
          {/* Login */}
          <Route path="login" element={<Login />} />

          {/* Join */}
          <Route path="join" element={<Join />} />

          {/* Agreement */}
          <Route path="agreement" element={<Agreement />} />

          {/* FindId */}
          <Route path="find_id" element={<FindId />} />

          {/* FindPassword */}
          <Route path="find_password" element={<FindPassword />} />

          {/* ResetPassword */}
          <Route path="reset_password" element={<ResetPassword />} />
        </Route>

        {/* Mypage */}
        <Route path="/mypage" element={<MypageLayout />}>
          <Route element={<Mypage />} >
            {/* MypageDashboard */}
            <Route index element={<MypageDashboard />} />
            {/* MypageInfo */}
            <Route path="info" element={<MypageInfo />} />

            <Route path="borrow" >
              {/* MyBorrowStatus */}
              <Route path="status" element={<MyBorrowStatusList />} />

              {/* MyBorrowHistory */}
              <Route path="history" element={<MyBorrowHistory />} />
            </Route>

            {/* MyWishList */}
            <Route path="wish-list" element={<MyWishList />} />

            {/* My QnA */}
            <Route path="qna" element={<MyPageQnaListPage />} />
            <Route path="qna/view/:id" element={<MypageQnaDetailPage />} />
            <Route path="qna/edit/:id" element={<MypageQnaEditPage />} />
          </Route>
        </Route>

        {/* 공지사항 */}
        <Route path="/notice" element={<BoardLayout />} >
          <Route index element={<NoticeListPage />} />
          <Route path="view/:id" element={<NoticeDetailPage />} />
        </Route>

        {/* 새소식 */}
        <Route path="/news" element={<BoardLayout />} >
          <Route index element={<NewsListPage />} />
          <Route path="view/:id" element={<NewsDetailPage />} />
        </Route>

        {/* FAQ */}
        <Route path="/faq" element={<BoardLayout />} >
          <Route index element={<FaqListPage />} />
          <Route path="view/:id" element={<FaqDetailPage />} />
        </Route>

        {/* QNA */}
        <Route path="/qna" element={<BoardLayout />} >
          <Route index element={<QnaHomePage />} />
          <Route path="write" element={<QnaWritePage />} />
        </Route>

      </Routes>

      <Footer />
      <ToastContainer
        position="top-center"   // toast 위치
        autoClose={3000}       // 3초 후 자동 종료
        toastStyle={{ whiteSpace: 'pre-line' }}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default RootRoutes;