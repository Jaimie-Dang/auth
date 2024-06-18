import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import AlertMessage from "../Alert/AlertMessage";
import { updateCourseSectionAPI } from "../../services/courseSections/courseSectionServices";

// Validation schema
const validationSchema = Yup.object({
  sectionName: Yup.string().required("Section name is required"),
});

const UpdateCourseSection = () => {
  // Use Selector
  const userData = useSelector((state) => state?.auth?.user);
  const token = userData?.token;

  // ! Mutation logic
  const mutation = useMutation({
    mutationFn: updateCourseSectionAPI,
    mutationKey: ["update-section"],
  });

  const { sectionId } = useParams();
  console.log(sectionId);
  // Handle form using formik
  const formik = useFormik({
    initialValues: {
      sectionName: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = {
        token,
        sectionId,
        sectionName: values.sectionName,
      };
      // Make http request
      mutation
        .mutateAsync(data)
        .then((data) => {
          console.log("Test data");
          console.log("data", data);
        })
        .catch((e) => console.log("error", e));
    },
  });
  // Get the auth from store
  //   const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  return (
    <div className="flex flex-wrap pb-24 bg-white p-20">
      <div className="w-full p-4">
        <div className="flex flex-col justify-center py-24 max-w-lg mx-auto bg-white rounded-lg shadow-xl">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Update Course Section
          </h1>
          <form onSubmit={formik.handleSubmit} className="px-8">
            {" "}
            {/* Alert Message */}
            {mutation.isSuccess && (
              <AlertMessage type="success" message="Update sucess..." />
            )}
            {mutation.isPending && (
              <AlertMessage type="loading" message="Loading..." />
            )}
            {mutation.isError && (
              <AlertMessage
                type="error"
                message={
                  mutation?.error.response?.data?.message ||
                  mutation?.error?.message
                }
              />
            )}
            {/* Section Name Input */}
            <div>
              <label
                htmlFor="textInput1"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Section Name
              </label>
              <input
                type="text"
                placeholder="Enter Section Name"
                {...formik.getFieldProps("sectionName")}
                className="w-full rounded-lg p-4 border border-gray-300 focus:border-orange-500 focus:ring-orange-200 transition duration-200 mb-4"
              />
              {formik.touched.sectionName && formik.errors.sectionName && (
                <div className="text-red-500 mt-1">
                  {formik.errors.sectionName}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="hover:!bg-white hover:!text-customRed hover:!border hover:!border-customRed bg-customRed text-white"
            >
              Update Course Section
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCourseSection;
