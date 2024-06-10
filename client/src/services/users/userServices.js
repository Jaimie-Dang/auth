import axios from "axios";
// ! Login User

export const loginAPI = async (userData) => {
  const response = await axios.post("http://localhost:5000/user/login", {
    email: userData?.email,
    password: userData?.password,
  });
  // Return a promist
  return response.data;
};
