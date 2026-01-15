
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


        {/* SetRecommednation */}
        <Route path={"/recommend/set"} element={<SetRecommedation />} />

        {/* Member */}
        {/* Login */}
        <Route path={"/member/login"} element={<Login />} />

        {/* Join */}
        <Route path={"/member/join"} element={<Join />} />

      </Routes>

      <Footer />
    </>
  );
};

export default RootRoutes;