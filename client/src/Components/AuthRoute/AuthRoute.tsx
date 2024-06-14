import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const userData = useSelector((state) => state?.auth?.user);
  if (!userData) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default AuthRoute;
