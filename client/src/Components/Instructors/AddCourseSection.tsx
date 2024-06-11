import styles from "./AddCourse.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import AlertMessage from "../Alert/AlertMessage";
import { addCourseSectionAPI } from "../../services/courseSections/courseSectionServices";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Validation schema
const validationSchema = Yup.object({
  sectionName: Yup.string().required("Section name is required"),
});

const AddCourseSection = () => {
  // Use Selector
  const userData = useSelector((state) => state?.auth?.user);
  const token = userData?.token;
  // ! Mutation logic
  const mutation = useMutation({ mutationFn: addCourseSectionAPI });
  const { courseId } = useParams();
  // console.log(courseId);
  // // Handle form using formik
  const formik = useFormik({
    initialValues: {
      sectionName: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = {
        token,
        courseId,
        sectionName: values.sectionName,
      };
      // Make http request
      mutation
        .mutateAsync(data)
        .then((data) => {
          console.log("data", data);
        })
        .catch((e) => console.log("error", e));
    },
  });
  return (
    <div className="flex flex-wrap pb-24 p-20 ">
      <div className="w-full p-4">
        <div className="bg-white shadow-lg rounded-lg max-w-md mx-auto p-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Add Course Section
          </h1>
          <p className="text-gray-700 text-center mb-6">
            Add a new section to your course.
          </p>
          <form onSubmit={formik.handleSubmit}>
            {/* Alert Message */}
            {mutation.isSuccess && (
              <AlertMessage type="success" message="Login sucess..." />
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
            {/* Section name input */}

            <label
              className="block test-sm font-semibold text-gray-700 mb-2 mt-3"
              htmlFor="textInput1"
            >
              Section name
            </label>
            <input
              type="text"
              placeholder="Enter Section Name"
              {...formik.getFieldProps("sectionName")}
              className="mb-3 h-10 "
            />
            {/* Error */}
            {formik.touched.sectionName && formik.errors.sectionName && (
              <div className={styles.error}>{formik.errors.sectionName}</div>
            )}

            <button
              type="submit"
              className="hover:!bg-white hover:!text-customRed hover:!border hover:!border-customRed bg-customRed text-white"
            >
              Add Section Name
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourseSection;
