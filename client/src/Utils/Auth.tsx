import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { useSelector } from "react-redux";

const Auth = () => {
  return isLoggedIn() ? <Outlet /> : <Navigate to="/login" />;
};

export default Auth;

export const isLoggedIn = () => {
  const userData = useSelector((state) => state?.auth?.user);
  const token = userData?.token;
  console.log("Test token - localstorage: ");
  console.log(token);

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
