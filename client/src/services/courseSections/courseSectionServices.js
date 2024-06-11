import axios from "axios";
import { VITE_BASE_URL } from "../../Utils/utils";
// ! Add course Section

export const addCourseSectionAPI = async (sectionData) => {
  console.log(sectionData);
  const response = await axios.post(
    `${VITE_BASE_URL}/course-sections/create/${sectionData.courseId}`,
    { sectionName: sectionData.sectionName },
    {
      headers: {
        Authorization: `Bearer ${sectionData.token}`,
      },
    }
  );
  // Return a promist
  return response.data;
};
