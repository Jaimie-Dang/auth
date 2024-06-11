import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// ! Validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});
const Login = () => {
  // ! Handle form using formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Make http request
      console.log(values);
    },
  });

  console.log(formik);
  return (
    <div>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <h1>Login Form</h1>
          <input
            type="email"
            placeholder="Enter Email"
            {...formik.getFieldProps("email")}
          />
          {/* Error */}
          {formik.touched && formik.errors.email && (
            <div style={{ color: "red" }}>{formik.errors.email}</div>
          )}
          <input
            type="password"
            placeholder="Enter Password"
            {...formik.getFieldProps("password")}
          />
          {/* Error */}
          {formik.touched && formik.errors.password && (
            <div style={{ color: "red" }}>{formik.errors.password}</div>
          )}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
