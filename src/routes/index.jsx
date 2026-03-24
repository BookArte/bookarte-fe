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

        {/* BookDetail */}
        <Route path={"/book/view/:bookId"} element={<BookDetail />} />

        {/* RecommendationBookList */}
        <Route path={"/book/recommendation"} element={< RecommedationBookList />} />

        {/* MyBorrowStatus */}
        <Route path={"/mypage/borrow/status"} element={<MyBorrowStatusList />} />

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
          </Route>
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