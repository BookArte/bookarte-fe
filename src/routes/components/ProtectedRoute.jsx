import { useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from "@/store/useAuthStore";
import URL from "@/constants/url";

function ProtectedRoute({ allowedRoles }) {
    const { accessToken, userInfo } = useAuthStore();
    const navigate = useNavigate();

    const userRole = userInfo?.role;
    const isLoggedIn = !!accessToken;
    const hasAccess = !allowedRoles || allowedRoles.includes(userRole);

    const wasLoggedInOnMount = useRef(isLoggedIn);

    useEffect(() => {
        if (!isLoggedIn) {
            if (wasLoggedInOnMount.current) {
                navigate(URL.MAIN, { replace: true });
                return;
            }

            alert("로그인이 필요한 서비스입니다.");
            navigate(URL.LOGIN, { replace: true });
            return;
        }

        if (allowedRoles && !hasAccess) {
            alert("접근 권한이 없습니다.");
            navigate(URL.MAIN, { replace: true });
        }
    }, [isLoggedIn, hasAccess, allowedRoles, navigate]);

    if (!isLoggedIn || (allowedRoles && !hasAccess)) {
        return null;
    }

    return <Outlet />;
}

export default ProtectedRoute;