import React from "react";
import { useSelector } from "react-redux/es/exports";
import { Outlet, Navigate } from "react-router-dom";
import Login from "./Login";

const ProtectedRoute = () => {
  const isAuth = useSelector((state) => state.auth.value);
  return isAuth ? <Outlet /> : <Login />;
};

export default ProtectedRoute;
