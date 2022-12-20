import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";


function RequireAuth() {
    const { isAuth } = useSelector((state) => state.userReducer);
    const location = useLocation();
    return isAuth ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth;