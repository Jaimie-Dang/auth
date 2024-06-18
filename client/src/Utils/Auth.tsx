import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Auth = () => {
  return isLoggedIn() ? <Outlet /> : <Navigate to="/login" />;
};

export default Auth;

const isLoggedIn = () => {
  // const token = localStorage.getItem("token");
  const userData = localStorage.getItem("userInfo");

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
