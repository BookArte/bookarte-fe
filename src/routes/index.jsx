
import { Routes, Route } from "react-router-dom";
import Main from "@/pages/main/Main";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import initPage from "@/js/ui";
import { useEffect } from "react";
import RegisterBook from "../pages/book/RegisterBook";
import BookList from "../pages/book/BookList";



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

        {/* RegisterBook */}
        <Route path={"/book/register"} element={<RegisterBook />} />

        {/* BookList */}
        <Route path={"/book/list"} element={<BookList />} />

      </Routes>

      <Footer />
    </>
  );
};

export default RootRoutes;