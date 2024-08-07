import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSingleCoursesAPI } from "../../services/courses/courseServices";
import { startSectionAPI } from "../../services/courseSections/courseSectionServices";
import AddCourseSection from "../Instructors/AddCourseSection";
import { FaBookReader, FaPencilAlt, FaPlayCircle } from "react-icons/fa";
import AlertMessage from "../Alert/AlertMessage";
import { GoGoal } from "react-icons/go";

const StartSection = () => {
  // Use Selector
  const userData = useSelector((state) => state?.auth?.user);
  const token = userData?.token;
  // ! Get the course id
  const { courseId } = useParams();
  console.log("Test course ID:");
  console.log(courseId);
  // ! react query
  const {
    data: courseData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["course-details"],
    queryFn: () => getSingleCoursesAPI(courseId),
  });
  console.log(courseData);

  // ! Start section mutation
  const startMutation = useMutation({
    mutationFn: startSectionAPI,
    mutationKey: ["start-section"],
  });

  // ! Handler
  const handleStartSectionHandler = (sectionId) => {
    const courseData = {
      sectionId,
      courseId,
      token,
    };
    startMutation.mutate(courseData);
  };
  // ! Get course sections
  const sections = courseData?.sections;
  // const [sectionState, setSectionState] = useState(sections?.enrolled || false);
  console.log(sections);
  return (
    <div className="p-20 container mx-auto bg-red-100 rounded-lg shadow">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Start Course Section
      </h2>
      {/* Mutation alert */}
      {startMutation.isPending && (
        <AlertMessage type="loading" message="Enrolling..." />
      )}
      {startMutation.isError && (
        <AlertMessage
          type="error"
          message={startMutation.error?.response?.data?.message}
        />
      )}
      {startMutation.isSuccess && (
        <AlertMessage type="success" message="Enroll sucess..." />
      )}

      {sections?.map((section) => {
        return (
          <div
            key={section?._id}
            className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 p-4 rounded-lg mb-4 shadow"
          >
            <span className="flex items-center font-medium text-gray-800 mb-3 sm:mb-0">
              <FaBookReader className="text-indigo-500 mr-3 text-xl" />
              {section?.sectionName}
            </span>
            <div className="flex items-center space-x-3">
              {section?.enrolled ? (
                <Link
                  to={`/courses-course-detail/${section._id}`}
                  className="flex items-center justify-center bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
                >
                  <GoGoal className="mr-2" /> Go
                </Link>
              ) : (
                <button
                  onClick={() => handleStartSectionHandler(section._id)}
                  className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
                >
                  <FaPlayCircle className="mr-2" /> Start
                </button>
              )}

              <Link
                to={`/progress-update/${courseId}`}
                className="flex items-center justify-center bg-orange-500 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
              >
                <FaPencilAlt className="mr-2" /> Update Progress
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StartSection;
