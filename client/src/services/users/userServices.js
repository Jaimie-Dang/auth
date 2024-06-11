import axios from "axios";
import { VITE_BASE_URL } from "../../Utils/utils";

// ! Login User

export const loginAPI = async (userData) => {
  // const navigate = useNavigate();
  const response = await axios.post(`${VITE_BASE_URL}/user/login`, {
    email: userData?.email,
    password: userData?.password,
  });
  // navigate("/");
  // Return a promist
  return response.data;
};
