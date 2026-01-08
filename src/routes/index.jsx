
import { Routes, Route } from "react-router-dom";
import Main from "@/pages/main/Main";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import initPage from "@/js/ui";
import { useEffect } from "react";
import RegisterBook from "../pages/book/RegisterBook";



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
        <Route path={"/book/register"} element={<RegisterBook/>} />

      </Routes>

      <Footer />
    </>
  );
};

export default RootRoutes;