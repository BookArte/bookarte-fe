
import { Routes, Route } from "react-router-dom";
import Main from "@/pages/main/Main";

const RootRoutes = () => {

  return (
    <>
      {/* <Header /> */}
      <Routes>
        {/* MAIN */}
        <Route path={"/"} element={<Main />} />

      </Routes>

      {/* <Footer /> */}
    </>
  );
};

export default RootRoutes;