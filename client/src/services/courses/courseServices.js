import axios from "axios";
import { VITE_BASE_URL } from "../../Utils/utils";
// ! Add course

export const addCourseAPI = async (courseData) => {
  console.log(courseData);
  const response = await axios.post(
    `${VITE_BASE_URL}/course/create`,
    courseData,
    {
      headers: {
        Authorization: `Bearer ${courseData.token}`,
      },
    }
  );
  // Return a promist
  return response.data;
};

// ! Fetch courses
export const getAllCoursesAPI = async () => {
  // const navigate = useNavigate();
  const response = await axios.get(`${VITE_BASE_URL}/course/lists`);
  // Return a promist
  return response.data;
};

// ! Fetch courses - Add more
export const privateProfileAPI = async (token) => {
  console.log("Test");
  console.log(token);
  const response = await axios.get(`${VITE_BASE_URL}/course/private-lists`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // Return a promist
  return response.data;
};

// ! Fetch Single course
export const getSigleCoursesAPI = async (id) => {
  const response = await axios.get(`${VITE_BASE_URL}/course/${id}`);
  // Return a promist
  return response.data;
};
