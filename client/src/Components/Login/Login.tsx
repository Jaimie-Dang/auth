import React, { useState, ChangeEvent } from "react";

import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { emailRegex, passwordRegex } from "../../Utils/RegEx";
import toast from "react-hot-toast";
import axios from "axios";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";

import { LoginSocialFacebook } from "reactjs-social-login";

import { useGoogleLogin } from "@react-oauth/google";
import Loader from "../Loader/Loader";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FiMail, FiLock } from "react-icons/fi";
import { useMutation } from "@tanstack/react-query";
import { loginAPI } from "../../services/users/userServices";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/slices/authSlice";
import AlertMessage from "../Alert/AlertMessage";

// ! Validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  //---------------------------

  //---------------------------
  const navigate = useNavigate(); // to navigate user to specific link
  //---------------------------
  const [userDetails, setuserDetails] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setisLoading] = useState(false);
  const [show, setshow] = useState(false);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setuserDetails((prev) => ({ ...prev, [name]: value }));
    console.log(userDetails);
  }

  // // ! Login with typing
  // const handleLogin = async () => {
  //   if (!emailRegex.test(userDetails.email)) {
  //     toast.error("Please enter a valid email address");
  //     return;
  //   }
  //   if (!passwordRegex.test(userDetails.password)) {
  //     toast.error(
  //       "Password must be at least 8 characters and must include at lease one speacial character and one number"
  //     );
  //     return;
  //   }
  //   try {
  //     setisLoading(true);
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_BASE_URL}/user/login`,
  //       userDetails
  //     );
  //     console.log(response);
  //     // lấy dữ liệu từ json - message từ server
  //     toast.success(response.data.message);

  //     // local storage - save token
  //     localStorage.setItem("userInfo", JSON.stringify(response.data));
  //     dispatch(loginAction);
  //     // navigate("/");
  //     setisLoading(false);
  //   } catch (error: any) {
  //     toast.error(error.response.data.message);
  //     console.log(error);
  //     setisLoading(false);
  //   }
  //   // toast.success("FORM SUBMITED");
  //   // console.log(emailRegex.test(userDetails.email));
  //   // console.log(passwordRegex.test(userDetails.password), userDetails.password);
  // };

  // ! Login with Google
  const handleContinueWithGoogle = useGoogleLogin({
    onSuccess: async (response: any) => {
      console.log(response);

      const res = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${response.access_token}` } }
      );

      console.log(res.data);

      // Create new User
      const newUser = {
        username: res.data.name,
        email: res.data.email,
        autoGenerated: true,
      };
      console.log(newUser);

      // call APT to backend
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/user/login`,
          newUser
        );
        console.log("Test res: ");
        console.log(response.data);
        // lấy dữ liệu từ json - message từ server
        toast.success(response.data.message);

        // Save user info in localStorage
        // localStorage.setItem("userInfo", newUser);
        // ! Save the user into localstorage
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        // ! Dispatch login action
        dispatch(loginAction(response.data));
        // Redirect
        // Set time loading
        setTimeout(() => {
          if (user?.role === "student") {
            navigate("/student-dashboard");
          } else if (user?.role === "instructor") {
            navigate("/instructor-courses");
          } else {
            navigate("/");
          }
        }, 1000);
        setisLoading(false);
      } catch (error: any) {
        toast.error(error.response.data.message);
        console.log(error);
        setisLoading(false);
      }
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  // ! Login with Facebook
  const handleContinueWithFacebook = async (res) => {
    const newUser = {
      username: res.data.name,
      email: res.data.email,
      autoGenerated: true,
    };

    console.log(newUser);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/login`,
        newUser
      );
      console.log(response);

      toast.success(response.data.message);

      // ! Save the user into localstorage
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      // ! Dispatch login action
      dispatch(loginAction(response.data));
      // Redirect
      // Set time loading
      setTimeout(() => {
        if (user?.role === "student") {
          navigate("/student-dashboard");
        } else if (user?.role === "instructor") {
          navigate("/instructor-courses");
        } else {
          navigate("/");
        }
      }, 1000);
      setisLoading(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error);
      setisLoading(false);
    }
  };

  // ! ---------------------------
  // ! dispatch
  const dispatch = useDispatch();
  // ! Mutation logic
  const mutation = useMutation({
    mutationFn: loginAPI,
    mutationKey: ["login"],
  });
  const user = useSelector((state) => state.auth.user);

  // ! Handle form using formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Make http request
      mutation
        .mutateAsync(values)
        .then((data) => {
          console.log(data);
          toast.success(data.message);
          // ! Save the user into localstorage
          localStorage.setItem("userInfo", JSON.stringify(data));
          // ! Dispatch login action
          dispatch(loginAction(data));
          // Redirect
          // Set time loading
          setTimeout(() => {
            if (user?.role === "student") {
              navigate("/student-dashboard");
            } else if (user?.role === "instructor") {
              navigate("/instructor-courses");
            } else {
              navigate("/");
            }
          }, 1000);
        })
        .catch((e) => console.log(e));
    },
  });
  console.log(mutation);
  //-----------------------------------------
  return (
    // full page
    <div className={styles.container}>
      {/* container - Form */}
      <div className={styles.formContainer}>
        <h2>Login ...</h2>

        <div className={styles.social}>
          <div>
            <LoginSocialFacebook
              appId={import.meta.env.VITE_FACEBOOK_CLIENT_ID}
              onResolve={(res) => {
                setisLoading(true);
                handleContinueWithFacebook(res);
              }}
              onReject={(err) => {
                console.log(err);
              }}
            >
              <FacebookLoginButton>Continue with Facebook</FacebookLoginButton>
            </LoginSocialFacebook>
          </div>
          <div
            onClick={() => {
              setisLoading(true);
              handleContinueWithGoogle();
            }}
          >
            <GoogleLoginButton>Continue with Google</GoogleLoginButton>
          </div>
        </div>
        {/* control input */}
        <div className={styles.inputContainer}>
          {/* <input
            value={userDetails.email}
            placeholder="Enter your email ..."
            type="email"
            name="email"
            onChange={handleInputChange}
          />
          <div className={styles.passwordContainer}>
            <input
              value={userDetails.password}
              placeholder="Enter your password ..."
              type={show ? "text" : "password"}
              name="password"
              onChange={handleInputChange}
            />
            <button
              onClick={() => {
                setshow(!show);
              }}
            >
              {show ? "HIDE" : "SHOW"}
            </button>
          </div>
          <button disabled={isLoading} onClick={handleLogin}>
            {isLoading ? <Loader /> : "LOGIN"}
          </button> */}
          <div className={styles.container_styles}>
            <form onSubmit={formik.handleSubmit}>
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
              <input
                type="email"
                placeholder="Enter Email"
                {...formik.getFieldProps("email")}
                className="mb-3 h-10 mt-3"
              />
              {/* Error */}
              {formik.touched.email && formik.errors.email && (
                <div className={styles.error}>{formik.errors.email}</div>
              )}

              <input
                type="password"
                placeholder="Enter Password"
                {...formik.getFieldProps("password")}
                className="mb-3 h-10 "
              />
              {/* Error */}
              {formik.touched.password && formik.errors.password && (
                <div className={styles.error}>{formik.errors.password}</div>
              )}
              <button
                type="submit"
                className="hover:!bg-white hover:!text-customRed hover:!border hover:!border-customRed bg-customRed text-white"
              >
                Login
              </button>
            </form>
          </div>
        </div>
        <div className={styles.footer}>
          <Link to="/signup">Don't have an account ? Signup</Link>
          <Link to="/forget-password">Forgot password</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
