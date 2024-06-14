import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getAllCoursesAPI } from "../../services/courses/courseServices";
import { Link } from "react-router-dom";
import { FaBookOpen, FaLayerGroup, FaUser } from "react-icons/fa";
import AlertMessage from "../Alert/AlertMessage";
import { useSelector } from "react-redux";
import { privateProfileAPI } from "../../services/courses/courseServices";

const InstructorPrivateProfile = () => {
  const userData = useSelector((state) => state.auth);
  const token = userData?.user?.token;
  // UseQuery
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["courses"],
    queryFn: () => privateProfileAPI(token),
  });
  console.log(data);

  // show loading
  if (isLoading) {
    return <AlertMessage type="loading" message="Loading courses..." />;
  }
  // show error
  if (isError) {
    return (
      <AlertMessage
        type="error"
        message={error?.response?.data?.message || error?.message}
      />
    );
  }
  console.log("Test");
  console.log(data.courses);
  return (
    <div className="container mx-auto p-20 bg-red-100">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold mb-4 text-gray-800">
          Explore Our Courses
        </h2>
        <p>Select a course you have enrolled</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {data?.map((course) => (
          <Link
            key={course._id}
            to={`/instructor-courses/${course._id}`}
            className="no-underline transform hover:scale-105 transition duration-300"
          >
            <div className="bg-white shadow-xl rounded-xl overflow-hidden hover:shadow-2xl">
              <div className="p-6">
                <div className="text-center">
                  <img src={course.image} alt="image" />
                  {/* <FaBookOpen className="mx-auto text-blue-600 text-7xl mb-6" /> */}
                  <h3 className="text-3xl font-bold mb-3 text-gray-800">
                    {course?.title}
                  </h3>
                  <p className="text-gray-700 mb-4">{course.description}</p>
                </div>
                <div className="text-sm space-y-3">
                  {/* Instructor */}
                  <div className="flex items-center justify-between">
                    <span className="flex item  s-center space-x-2">
                      <FaUser className="text-blue-600" />
                      <span>{course?.user[0]?.username}</span>
                    </span>
                    <span className="text-blue-500 font-medium">
                      {course?.difficulty}
                    </span>
                  </div>
                  {/* Student */}
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <FaUser className="text-blue-600" />
                      <span>{course?.students?.length} Students</span>
                    </span>
                    <span className="text-blue-500 font-medium">
                      {new Date(course?.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {/* Total sections */}
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <FaLayerGroup className="text-blue-600" />
                      <span>{course?.sections?.length} Sections</span>
                    </span>
                    <span className="text-green-500 font-bold">View more</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InstructorPrivateProfile;
