import styles from "./AddCourse.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import AlertMessage from "../Alert/AlertMessage";
import { addCourseAPI } from "../../services/courses/courseServices";
import { useSelector } from "react-redux";

// Validation schema
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  difficulty: Yup.string().required("Difficulty is required"),
  duration: Yup.number().required("Duation is required"),
});

const AddCourse = () => {
  // Use Selector
  const userData = useSelector((state) => state?.auth?.user);
  const token = userData?.token;
  // Mutation logic
  const mutation = useMutation({ mutationFn: addCourseAPI });

  // Handle form using formik
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      difficulty: "",
      duration: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const courseData = {
        ...values,
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
        <h1 className="">Add Course</h1>
        {/* <p>
          Add a new course that you want your students to keep track of their
          progress.
        </p> */}
        {/* control input */}
        <div className={styles.inputContainer}>
          <div className={styles.container_styles}>
            <form onSubmit={formik.handleSubmit}>
              {mutation.isSuccess && (
                <AlertMessage type="success" message="Add Course sucess..." />
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
              <input
                type="text"
                placeholder="Enter Difficulty"
                {...formik.getFieldProps("difficulty")}
                className="mb-3 h-10 "
              />
              {/* Error */}
              {formik.touched.difficulty && formik.errors.difficulty && (
                <div className={styles.error}>{formik.errors.difficulty}</div>
              )}
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
              <button type="submit">Add Course</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
