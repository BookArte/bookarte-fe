import RootRoutes from "@/routes";
import { BrowserRouter as Router } from "react-router-dom";

import "@/css/base.css";
import "@/css/layout.css";
import "@/css/component.css";
import "@/css/page.css";
import "@/css/response.css";
import { useEffect, useState } from "react";
import { refreshToken } from "./api/member.api";
import { useAuthStore } from "./store/useAuthStore";
import { jwtDecode } from "jwt-decode";

function App() {
  const setLogin = useAuthStore((state) => state.setLogin);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initLogin = async () => {
      try {
        const res = await refreshToken();
        if (res.success) {
          
          const decoded = jwtDecode(res.data.accessToken);

          setLogin(res.data.accessToken, {
            userId: decoded.userId,
            userName: decoded.userName,
            role: decoded.role
          });
        }
      } catch (err) {
        console.log("비로그인 상태 또는 토큰 만료");
      } finally {
        setIsInitialized(true);
      }
    };

    initLogin();
  }, [setLogin]);

  if (!isInitialized) return null;

  return (
    <div className="wrap">
      <Router>
        <RootRoutes />
      </Router>
    </div>
  );
}

export default App

