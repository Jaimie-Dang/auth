import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getSingleCoursesAPI } from "../../services/courses/courseServices";
import {
  FaEdit,
  FaLayerGroup,
  FaList,
  FaListUl,
  FaPlusCircle,
  FaTrash,
  FaTrophy,
  FaUser,
  FaWrench,
} from "react-icons/fa";
import AlertMessage from "../Alert/AlertMessage";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useSelector } from "react-redux";
import { deleteSectionAPI } from "../../services/courseSections/courseSectionServices";
import { deleteCourseAPI } from "../../services/courses/courseServices";

const InstructorCourseDetail = () => {
  // Use Selector
  const userData = useSelector((state) => state?.auth?.user);
  const token = userData?.token;
  // ! Get the course ID
  const { courseId } = useParams();
  //
  const navigate = useNavigate();
  // ! UseQuery
  const {
    data: courseData,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["course-details"],
    queryFn: () => getSingleCoursesAPI(courseId),
  });
  console.log(courseData);
  // Mutation logic
  const mutation = useMutation({
    mutationFn: deleteSectionAPI,
    mutationKey: ["delete-section"],
  });
  const courseMutation = useMutation({
    mutationFn: deleteCourseAPI,
    mutationKey: ["delete-course"],
  });
  // handle delete
  const handleDelete = (sectionId) => {
    const data = {
      sectionId,
      token,
    };
    mutation
      .mutateAsync(data)
      .then((data) => {
        console.log("data", data);
        refetch();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleDeleteCourse = () => {
    const courseData = {
      courseId,
      token,
    };
    courseMutation
      .mutateAsync(courseData)
      .then((courseData) => {
        console.log("data", courseData);
        navigate("/instructor-course");
      })
      .catch((error) => {
        console.error("Error deleting course:", error);
        // Handle error here, e.g., show an alert to the user
        alert("Failed to delete course. Please try again later.");
      });
  };
  console.log("Test courseID, token");
  console.log(courseId);
  console.log(token);

  return (
    <>
      <div className="container mx-auto p-20 bg-red-100 rounded-xl shadow-lg">
        <h1 className="text-3xl font-black text-gray-900 mb-8">
          {courseData?.title}
        </h1>
        <p className="text-gray-800 text-lg mb-8">{courseData?.description}</p>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-5">
            Course Information
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Instructor and course details */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-1xl font-semibold text-gray-800 mb-4">
                Instructor
              </h3>
              <div className="flex items-center text-gray-800">
                <FaUser className="text-blue-500 mr-3 text-xl" />
                <span className="text-lg">{courseData?.user[0]?.username}</span>
              </div>
            </div>
            {/* Course */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Course Start
              </h3>
              <div className="space-y-3">
                {/* Total students */}
                <p className="flex items-center">
                  <FaUser className="text-blue-500 mr-2" />
                  <span>{courseData?.students?.length} students</span>
                </p>
                {/* Total sections */}
                <p className="flex items-center">
                  <FaLayerGroup className="text-blue-500 mr-2" />
                  <span>{courseData?.sections?.length} sections</span>
                </p>
                {/* Difficulty Level */}
                <p className="flex items-center">
                  <span className="font-medium text-blue-500">
                    {courseData?.difficulty} Level
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto p-4">
          {mutation.isPending && (
            <AlertMessage type="loading" message="Loading..." />
          )}
          {mutation.isError && (
            <AlertMessage
              type="error"
              message={mutation.error.response?.data?.message}
            />
          )}
          {mutation.isSuccess && (
            <AlertMessage type="success" message="Sucess" />
          )}
        </div>
        {/* Action button */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Link
            to={`/students-position/${courseId}`}
            className="bg-red-500 hover:!bg-white hover:!text-red-500 hover:!border hover:!border-red-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center shadow"
          >
            <FaTrophy className="mr-2" />
            Students Ranking
          </Link>
          <Link
            to={`/instructor-add-course-sections/${courseId}`}
            className="bg-purple-500 hover:!bg-white hover:!text-purple-500 hover:!border hover:!border-purple-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center shadow"
          >
            <FaPlusCircle className="mr-2" />
            Add Course Section
          </Link>
          <Link
            to={`/instructor-update-course/${courseId}`}
            className="bg-green-500  hover:!bg-white hover:!text-green-500 hover:!border hover:!border-green-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center "
          >
            <FaEdit className="mr-2" />
            Update Course
          </Link>
          <button
            onClick={() => handleDeleteCourse()}
            className="bg-red-500 hover:!bg-white hover:!text-red-500 hover:!border hover:!border-red-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center shadow"
          >
            <FaTrash className="mr-2" />
            Delete
          </button>
          <Link
            to={`/instructor-course-sections`}
            className="bg-blue-500 hover:!bg-white hover:!text-blue-500 hover:!border hover:!border-blue-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center shadow"
          >
            <FaListUl className="mr-2" />
            View Course Sections
          </Link>
        </div>
      </div>
      {/* Course sections */}
      {courseData?.sections?.length > 0 ? (
        <div className="container mx-auto mt-4 p-4 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Sections</h2>
          <div className="space-y-4">
            {courseData?.sections?.map((section) => (
              <div
                key={section._id}
                className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow"
              >
                <p className="text-xl font-semibold text-gray-800">
                  {section.sectionName}
                </p>
                <div className="space-x-3">
                  <div className="flex items-center">
                    <Link to={`/update-course-section/${section._id}`}>
                      <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition duration-200 mr-4 w-12">
                        <FiEdit2 className="m-2" />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(section._id)}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-700 transition duration-200  w-12"
                    >
                      <FiTrash2 className="m-2" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="container mx-auto mt-4 p-4">
          <h2 className="text-2xl font-bold mb-2">No sections found</h2>
        </div>
      )}
    </>
  );
};

export default InstructorCourseDetail;
