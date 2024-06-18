import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  getSingleCoursesAPI,
  startCoursesAPI,
} from "../../services/courses/courseServices";
import {
  FaBookOpen,
  FaChartLine,
  FaLayerGroup,
  FaListUl,
  FaPlay,
  FaPlusCircle,
  FaTrophy,
  FaUser,
} from "react-icons/fa";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Button } from "@headlessui/react";
import { useSelector } from "react-redux";
import AlertMessage from "../Alert/AlertMessage";

const CourseDetail = () => {
  // Use Selector
  const userData = useSelector((state) => state?.auth?.user);
  const token = userData?.token;
  // ! Get the course id
  const { courseId } = useParams();
  // ! react query
  const {
    data: courseData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["course-details"],
    queryFn: () => getSingleCoursesAPI(courseId),
  });

  // Mutation logic
  const startCourseMutation = useMutation({
    mutationFn: startCoursesAPI,
    mutationKey: ["start-course"],
  });
  const handleStartCourse = () => {
    const courseData = {
      courseId,
      token,
    };
    startCourseMutation.mutate(courseData);
  };

  //   console.log(courseData);
  console.log(handleStartCourse);
  return (
    <>
      <div className="container mx-auto p-20 bg-red-100 rounded-xl shadow-lg">
        <h1 className="text-3xl font-black text-gray-900 mb-8">
          {courseData?.title}
        </h1>
        <p className="text-gray-800 text-lg mb-8">{courseData?.description}</p>
        <div className="mb-10">
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
                  <span>{courseData?.students?.length} student</span>
                </p>
                {/* Total sections */}
                <p className="flex items-center">
                  <FaLayerGroup className="text-blue-500 mr-2" />
                  <span>{courseData?.sections?.length} section</span>
                </p>
                {/* Difficulty Level */}
                <p className="flex items-center">
                  <span className="font-medium text-blue-500">
                    {courseData?.difficulty}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto p-4">
          {startCourseMutation.isPending && (
            <AlertMessage type="loading" message="Loading..." />
          )}
          {startCourseMutation.isError && (
            <AlertMessage
              type="error"
              message={startCourseMutation.error.response?.data?.message}
            />
          )}
          {startCourseMutation.isSuccess && (
            <AlertMessage type="success" message="Success" />
          )}
        </div>
        {/* Action button */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button
            onClick={handleStartCourse}
            className="bg-green-500 hover:!bg-white hover:!text-green-500 hover:!border hover:!border-green-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center shadow"
          >
            <FaPlay className="mr-2" />
            Apply Now
          </Button>
          <Link
            to={`/start-section/${courseId}`}
            className="bg-blue-500 hover:!bg-white hover:!text-blue-500 hover:!border hover:!border-blue-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center shadow"
          >
            <FaBookOpen className="mr-2" />
            Start Course Section
          </Link>
          <Link
            to={`/progress-update/${courseId}`}
            className="bg-yellow-500 hover:!bg-white hover:!text-yellow-500 hover:!border hover:!border-yellow-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center shadow"
          >
            <FaChartLine className="mr-2" />
            Update Progress
          </Link>
          <Link
            to={`/students-position/${courseId}`}
            className="bg-red-500 hover:!bg-white hover:!text-red-500 hover:!border hover:!border-red-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center shadow"
          >
            <FaTrophy className="mr-2" />
            Students Ranking
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
                {/* <div className="space-x-3">
                  <div className="flex items-center">
                    <Link to={`/update-course-section/${section._id}`}>
                      <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition duration-200 mr-4 w-12">
                        <FaPlay className="m-2" />
                      </button>
                    </Link>
                  </div>
                </div> */}
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

export default CourseDetail;
