import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useLocation, Navigate } from "react-router";

const ProtectedRoute = () => {
    const infoAuth = useSelector((state) => state.authUser);
    const location = useLocation();

    return !infoAuth.isLoggedIn ? <Navigate to="/login" replace state={{ path: location.pathname }} /> : <Outlet />;
}

export default ProtectedRoute;