import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { FaBookOpen } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getUserProfileAPI } from "../../services/users/userServices";
import { useSelector } from "react-redux";
import { updateSectionProgressAPI } from "../../services/courseSections/courseSectionServices";
import AlertMessage from "../Alert/AlertMessage";

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
  const { data, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getUserProfileAPI(courseData),
  });
  console.log("test data");
  console.log(data);
  let ongoingSections = data?.courseProgress?.sections;
  console.log(ongoingSections);
  let ongoingCourse = data?.courseProgress?.courseId;
  console.log(ongoingCourse);

  // Mutation
  const updateProgressMutation = useMutation({
    mutationFn: updateSectionProgressAPI,
    mutationKey: ["update-progress"],
  });

  // handle update progress
  // ! section state
  const [sections, setSections] = useState([]);
  useEffect(() => {
    if (data?.courseProgress?.sections) {
      setSections(data.courseProgress.sections);
    }
  }, [data]);
  console.log("Updated sections:", sections);
  const handleProgressChange = async (sectionId, newStatus) => {
    setSections(
      sections.map((section) =>
        section?.sectionId === sectionId
          ? { ...section, status: newStatus }
          : section
      )
    );
    console.log("Updated sections:", sections);
    // Data for update
    const updateData = {
      sectionId: sectionId?._id,
      newStatus,
      courseId,
    };
    console.log("Updated:", updateData);

    // mutation logic
    updateProgressMutation
      .mutateAsync(updateData)
      .then(() => {
        refetch();
      })
      .catch((e) => console.log(e));
    console.log(updateProgressMutation);
  };

  // ----------------------------------------
  return (
    <div className="p-20 container mx-auto bg-red-100 rounded-lg shadow">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Update Your Section Progress
      </h2>
      {/* Mutation alert */}
      {updateProgressMutation.isPending && (
        <AlertMessage type="loading" message="Updating..." />
      )}
      {updateProgressMutation.isError && (
        <AlertMessage
          type="error"
          message={updateProgressMutation.error?.response?.data?.message}
        />
      )}
      {updateProgressMutation.isSuccess && (
        <AlertMessage type="success" message="Update success..." />
      )}

      <h1 className="text-5xl font-bold text-indigo-600 mb-6">
        {ongoingCourse?.title}
      </h1>

      {ongoingSections?.map((section) => (
        <div
          key={section.sectionId?._id}
          className="flex flex-col md:flex-row items-center justify-between bg-gray-50 p-4 rounded-lg mb-4 shadow"
        >
          <span className="flex items-center text-lg font-medium text-gray-800 mb-3 md:mb-0">
            <FaBookOpen className="text-indigo-500 mr-3" />
            {section.sectionId?.sectionName}
          </span>
          <select
            className="border border-gray-300 rounded px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={section.status}
            onChange={(e) =>
              handleProgressChange(section.sectionId, e.target.value)
            }
          >
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
