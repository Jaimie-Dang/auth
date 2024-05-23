import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const Auth = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default Auth;
