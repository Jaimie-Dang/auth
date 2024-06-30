import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthRoute = ({ children }) => {
  return isLoggedIn() ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthRoute;

export const isLoggedIn = () => {
  const userData = useSelector((state) => state?.auth?.user);
  const token = userData?.token;

  if (!token) {
    return false;
  }

  const { exp } = jwtDecode(token);

  console.log(exp * 1000, Date.now());
  if (exp! * 1000 > Date.now()) {
    return true;
  } else {
    localStorage.clear();
    return false;
  }
};
