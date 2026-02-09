
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
import RecommedationBookList from "../pages/recommendation/RocommendationBookList"
import Agreement from "../pages/member/Agreement";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FindId from "../pages/member/FindId";
import FindPassword from "../pages/member/FindPassword";


import ReorderRecommendation from "../pages/recommendation/ReorderRecommendation";
import ResetPassword from "../pages/member/ResetPassword";
import UpdateRecommendation from "../pages/recommendation/UpdateRecommendation";
import Mypage from "../pages/mypage/Mypage";
import MypageInfo from "../pages/mypage/MypageInfo";
import MypageLayout from "../components/mypage/MypageLayout";
import MypageDashboard from "../components/mypage/MypageDashboard";

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

        {/*BOOK*/}
        {/* RegisterBook */}
        <Route path={"/book/register"} element={<RegisterBook />} />

        {/* BookList */}
        <Route path={"/book/list"} element={<BookList />} />

        {/* BookDetail */}
        <Route path={"/book/view/:bookId"} element={<BookDetail />} />

        {/* UpdateBook */}
        <Route path={"/book/update/:bookId"} element={<UpdateBook />} />

        {/* RecommendationBookList */}
        <Route path={"/book/recommendation"} element={< RecommedationBookList />} />

        {/* SetRecommednation */}
        <Route path={"/admin/recommendation/set"} element={<SetRecommedation />} />

        {/* ReorderRecommednation */}
        <Route path={"/admin/recommendation/reorder"} element={<ReorderRecommendation />} />

        {/* UpdateRecommendation */}
        <Route path={"/admin/recommendation/update/:recommendationId"} element={<UpdateRecommendation />} />

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