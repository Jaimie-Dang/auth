import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaBookOpen } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getUserProfileAPI } from "../../services/users/userServices";
import { useSelector } from "react-redux";

const ProgressUpdate = () => {
  // Use Selector
  const userData = useSelector((state) => state?.auth?.user);
  const token = userData?.token;
  // ! get the course id
  const { courseId } = useParams();
  const courseData = {
    token,
    courseId,
  };
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getUserProfileAPI(courseData),
  });
  console.log("test");
  console.log(data);
  let ongoingSections = data?.courseProgress?.sections;
  console.log(ongoingSections);
  let ongoingCourse = data?.courseProgress?.courseId;
  console.log(ongoingCourse);
  return (
    <div className="p-20 container mx-auto bg-white rounded-lg shadow">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Update Your Section Progress
      </h2>
      {/* Mutation alert */}
      {/* {startMutation.isPending && (
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
      )} */}

      <h1 className="text-5xl font-bold text-indigo-600 mb-6">
        {ongoingCourse?.title}
      </h1>

      {ongoingSections?.map((section) => (
        <div
          key={section.sectionId?._id}
          className="flex flex-col md:flex-row items-center justify-between bg-gray-100 p-4 rounded-lg mb-4"
        >
          <span className="flex items-center text-lg font-medium text-gray-800 mb-3 md:mb-0">
            <FaBookOpen className="text-indigo-500 mr-3" />
            {section.sectionId?.sectionName}
          </span>
          <select className="border border-gray-300 rounded px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500">
            <option value="">Select Status</option>
            <option value="In Progress">In Progress</option>
            <option value="In Completed">In Completed</option>
            <option value="Paused">Paused</option>
            <option value="Away">Away</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default ProgressUpdate;
