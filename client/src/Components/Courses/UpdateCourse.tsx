import styles from "./UpdateCourse.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import AlertMessage from "../Alert/AlertMessage";
import { updateCoursesAPI } from "../../services/courses/courseServices";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSigleCoursesAPI } from "../../services/courses/courseServices";

// Validation schema
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  difficulty: Yup.string().required("Difficulty is required"),
  duration: Yup.number().required("Duation is required"),
});

const UpdateCourse = () => {
  // courseId
  const { courseId } = useParams();
  // Use Selector
  const userData = useSelector((state) => state?.auth?.user);
  const token = userData?.token;

  // Fetch the course details
  const { data: courseData } = useQuery({
    queryKey: ["Course-details"],
    queryFn: () => getSigleCoursesAPI(courseId),
  });
  console.log(courseData);

  // Mutation logic
  const mutation = useMutation({
    mutationFn: updateCoursesAPI,
    mutationKey: ["Update Course"],
  });

  // Handle form using formik
  const formik = useFormik({
    initialValues: {
      title: courseData?.title || "",
      description: courseData?.description || "",
      difficulty: courseData?.difficulty || "",
      duration: courseData?.duration || "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const courseData = {
        ...values,
        courseId,
        token,
      };
      // Make http request
      mutation
        .mutateAsync(courseData)
        .then((data) => {
          console.log("data", data);
        })
        .catch((e) => console.log("error", e));
    },
  });
  console.log(mutation);
  //-----------------------------------------
  return (
    // full page
    <div className={styles.container}>
      {/* container - Form */}
      <div className={styles.formContainer}>
        <h1 className="text-4xl font-bold mb-4">Update Course</h1>

        {/* control input */}
        <div className={styles.inputContainer}>
          <div className={styles.container_styles}>
            <form onSubmit={formik.handleSubmit}>
              {mutation.isSuccess && (
                <AlertMessage
                  type="success"
                  message="Update Course sucess..."
                />
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
              <label
                htmlFor="textInput1"
                className="block text-gray-700 text-sm font-medium "
              >
                Enter title
              </label>
              <input
                type="text"
                placeholder="Enter Title"
                {...formik.getFieldProps("title")}
                className="mb-3 h-10 mt-3"
              />
              {/* Error */}
              {formik.touched.title && formik.errors.title && (
                <div className={styles.error}>{formik.errors.title}</div>
              )}
              <label
                htmlFor="textInput1"
                className="block text-gray-700 text-sm font-medium "
              >
                Enter Description
              </label>
              <input
                type="text"
                placeholder="Enter Description"
                {...formik.getFieldProps("description")}
                className="mb-3 h-10 "
              />
              {/* Error */}
              {formik.touched.description && formik.errors.description && (
                <div className={styles.error}>{formik.errors.description}</div>
              )}
              <label
                htmlFor="textInput1"
                className="block text-gray-700 text-sm font-medium"
              >
                Enter Difficulty
              </label>
              <select
                placeholder="Select Difficulty"
                {...formik.getFieldProps("difficulty")}
                className="mb-3 h-10 "
              >
                <option value="easy" label="Easy" />
                <option value="basic" label="Basic" />
                <option value="difficult" label="Difficult" />
              </select>
              {/* Error */}
              {formik.touched.difficulty && formik.errors.difficulty && (
                <div className={styles.error}>{formik.errors.difficulty}</div>
              )}
              <label
                htmlFor="textInput1"
                className="block text-gray-700 text-sm font-medium"
              >
                Enter Number
              </label>
              <input
                type="number"
                placeholder="Enter Duration"
                {...formik.getFieldProps("duration")}
                className="mb-3 h-10 "
              />
              {/* Error */}
              {formik.touched.duration && formik.errors.duration && (
                <div className={styles.error}>{formik.errors.duration}</div>
              )}
              <button
                type="submit"
                className="hover:!bg-white hover:!text-customRed hover:!border hover:!border-customRed bg-customRed text-white"
              >
                Update Course
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCourse;
