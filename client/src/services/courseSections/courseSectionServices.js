import axios from "axios";
import { VITE_BASE_URL } from "../../Utils/utils";

// ! Add course Section
export const addCourseSectionAPI = async (data) => {
  console.log(data);
  const response = await axios.post(
    `${VITE_BASE_URL}/course-sections/create/${data.courseId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    }
  );
  // Return a promise
  return response.data;
};

// ! Get all course Section
export const getAllCourseSectionAPI = async (token) => {
  // console.log(sectionData);
  const response = await axios.get(`${VITE_BASE_URL}/course-sections`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // Return a promise
  return response.data;
};

// ! start course Section
export const startSectionAPI = async (section) => {
  console.log("Test 2");
  console.log(section);
  const response = await axios.put(
    `${VITE_BASE_URL}/progress/start-section`,
    {
      sectionId: section?.sectionId,
      courseId: section?.courseId,
      enrolled: true,
    },
    {
      headers: {
        Authorization: `Bearer ${section?.token}`,
      },
    }
  );
  console.log("Test 3");
  console.log(response);
  return response.data;
};

// ! Update course Section
export const updateCourseSectionAPI = async (data) => {
  console.log("Test 2");
  console.log(data);
  const response = await axios.put(
    `${VITE_BASE_URL}/course-sections/${data?.sectionId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${data?.token}`,
      },
    }
  );
  return response.data;
};

// ! Delete Section
export const deleteSectionAPI = async (section) => {
  const response = await axios.delete(
    `${VITE_BASE_URL}/course-sections/${section.sectionId}`,
    {
      headers: {
        Authorization: `Bearer ${section.token}`,
      },
    }
  );
  return response.data;
};

// ! update progress
export const updateSectionProgressAPI = async (section) => {
  console.log("Test section");
  console.log(section.token);
  const response = await axios.put(
    `${VITE_BASE_URL}/progress/update`,
    {
      sectionId: section?.sectionId,
      courseId: section?.courseId,
      newStatus: section?.newStatus,
    },
    {
      headers: {
        Authorization: `Bearer ${section?.token}`,
      },
    }
  );
  console.log("Test 3");
  console.log(response);
  return response.data;
};
