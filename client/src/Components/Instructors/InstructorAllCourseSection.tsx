import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { getAllCourseSectionAPI } from "../../services/courseSections/courseSectionServices";
import { deleteSectionAPI } from "../../services/courseSections/courseSectionServices";
import { useSelector } from "react-redux";
import AlertMessage from "../Alert/AlertMessage";
import { Link } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const InstructorAllCourseSection = () => {
  // Use Selector
  const userData = useSelector((state) => state?.auth?.user);
  const token = userData?.token;
  // ! UseQuery
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ["get-course-sections"],
    queryFn: () => getAllCourseSectionAPI(token),
  });

  // Mutation logic
  const mutation = useMutation({
    mutationFn: deleteSectionAPI,
    mutationKey: ["delete-section"],
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
  console.log(data);

  // show loading
  // show loading
  if (isLoading) {
    return <AlertMessage type="loading" message="Loading ..." />;
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
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-20 bg-red-100">
      <h2 className="text-2xl font-bold">Course sections</h2>
      {/* Alert Message */}
      {mutation.isSuccess && (
        <AlertMessage type="success" message="Sucess..." />
      )}

      {mutation.isPending && (
        <AlertMessage type="loading" message="Loading..." />
      )}
      {mutation.isError && (
        <AlertMessage
          type="error"
          message={mutation.error.response?.data?.message}
        />
      )}
      {data?.map((section) => (
        <div
          key={section._id}
          className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-lg"
        >
          <p className="text-xl font-semibold text-gray-800">
            {section.sectionName}
          </p>
          <div className="space-x-2">
            {/* <Link to={`/update-course-section/${section._id}`}> */}
            <div className="flex items-center">
              <Link to={`/update-course-section/${section._id}`}>
                <button
                  onClick={() => handleDelete(section._id)}
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition duration-200 mr-4 w-12"
                >
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
            {/* </Link> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InstructorAllCourseSection;
