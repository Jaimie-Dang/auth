import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// ! Login User

export const loginAPI = async (userData) => {
  // const navigate = useNavigate();
  const response = await axios.post("http://localhost:5000/user/login", {
    email: userData?.email,
    password: userData?.password,
  });
  // navigate("/");
  // Return a promist
  return response.data;
};
