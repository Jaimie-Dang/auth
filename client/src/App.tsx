import ForgorPassword from "./Components/ForgotPassword/ForgorPassword";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./Utils/Auth";
import User from "./Components/User/User";
import Course from "./Components/Course/Course";
import CourseDetail from "./Components/Courses/CourseDetail";
import "bootstrap/dist/css/bootstrap.min.css";
import PublicNavbar from "./Components/navbar/PublicNavbar";
import InstructorNavbar from "./Components/navbar/InstructorNavbar";
import StudentsNavbar from "./Components/navbar/StudentsNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useDebugValue, useEffect } from "react";
import { loginAction } from "./redux/slices/authSlice";
import AddCourse from "./Components/Instructors/AddCourse";
import Courses from "./Components/Courses/Courses";
import InstructorPrivateProfile from "./Components/Instructors/InstructorPrivateProfile";
import InstructorCourseDetail from "./Components/Instructors/InstructorCourseDetail";
import AddCourseSection from "./Components/Instructors/AddCourseSection";
import InstructorAllCourseSection from "./Components/Instructors/InstructorAllCourseSection";
import UpdateCourseSection from "./Components/Instructors/UpdateCourseSection";
import UpdateCourse from "./Components/Courses/UpdateCourse";
import Ranking from "./Components/Login/Ranking";
import StartSection from "./Components/Login/StartSection";
import ProgressUpdate from "./Components/Login/ProgressUpdate";
import StudentDashboard from "./Components/Login/StudentDashboard";
import AuthRoute from "./Components/AuthRoute/AuthRoute";

// ! Test
// import Login from "./Components/Users/Login";

// nav bar
const App = () => {
  const dispatch = useDispatch();
  // ! useSelector
  const userData = useSelector((state) => state?.auth?.user);
  // console.log(userData);
  useEffect(() => {
    dispatch(loginAction(JSON.parse(localStorage.getItem("userInfo"))));
  }, [dispatch]);
  return (
    <Router>
      {/* Navbar here */}
      {userData?.role === "student" ? (
        <StudentsNavbar />
      ) : userData?.role === "instructor" ? (
        <InstructorNavbar />
      ) : (
        <PublicNavbar />
      )}
      <Routes>
        {/* ------------------------------------------ */}
        {/* Homepage */}
        <Route path="/" element={<Home />}></Route>

        {/* Login - Signup - Forgot Password */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/forget-password" element={<ForgorPassword />}></Route>
        {/*  Courses */}
        <Route path="/courses" element={<Courses />}></Route>

        {/* ------------------------------------------------------------ */}
        {/*  Detail Courses */}
        <Route element={<Auth />}>
          <Route path="/course/:courseId" element={<CourseDetail />}></Route>

          {/* ------------------ Instructors Links -------------------- */}
          <Route path="/instructor-add-course" element={<AddCourse />}></Route>

          <Route
            path="/instructor-update-course/:courseId"
            element={<UpdateCourse />}
          ></Route>

          <Route
            path="/instructor-courses"
            element={<InstructorPrivateProfile />}
          ></Route>

          <Route
            path="/instructor-courses/:courseId"
            element={<InstructorCourseDetail />}
          ></Route>

          <Route
            path="/instructor-add-course-sections/:courseId"
            element={<AddCourseSection />}
          ></Route>

          <Route
            path="/instructor-course-sections"
            element={<InstructorAllCourseSection />}
          ></Route>

          {/* Update Section Course */}
          <Route
            path="/update-course-section/:sectionId"
            element={<UpdateCourseSection />}
          ></Route>

          {/* ------------------ Students Links -------------------- */}
          <Route
            path="/start-section/:courseId"
            element={<StartSection />}
          ></Route>

          <Route
            path="/progress-update/:courseId"
            element={<ProgressUpdate />}
          ></Route>
          <Route
            path="/student-dashboard"
            element={<StudentDashboard />}
          ></Route>

          <Route
            path="/students-position/:courseId"
            element={<Ranking />}
          ></Route>

          <Route path="/user" element={<User />}></Route>

          <Route
            path="/courses-course-detail/:sectionId"
            element={<Course />}
          ></Route>
        </Route>

        {/* ------------------ NotFound Links -------------------- */}
        <Route path="*" element="404 PAGE NOT FOUND"></Route>
      </Routes>
    </Router>
  );
};

export default App;
