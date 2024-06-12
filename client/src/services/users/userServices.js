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

// ! Ranking
export const getAllUsersAPI = async (courseId) => {
  // const navigate = useNavigate();
  const response = await axios.get(
    `${VITE_BASE_URL}/user/position/${courseId}`
  );
  // navigate("/");
  // Return a promist
  return response.data;
};

// ! Private Profile
export const getUserProfileAPI = async (data) => {
  console.log("Test 3");
  console.log(data);
  const response = await axios.get(
    `${VITE_BASE_URL}/user/private-profile/?courseId=${data?.courseId}`,
    {
      headers: {
        Authorization: `Bearer ${data?.token}`,
      },
    }
  );
  return response.data;
};
