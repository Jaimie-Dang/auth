import ForgorPassword from "./Components/ForgotPassword/ForgorPassword";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./Utils/Auth";
import User from "./Components/User/User";
import Course from "./Components/Course/Course";
import CourseDetail from "./Components/CourseDetail/CourseDetail";
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
        {/* Homepage */}
        <Route path="/" element={<Home />}></Route>
        {/* Instructors Links */}
        <Route path="/instructor-add-course" element={<AddCourse />}></Route>
        {/* Login - Signup - Forgot Password */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/forget-password" element={<ForgorPassword />}></Route>
        {/* Public Courses */}
        <Route path="/courses" element={<Courses />}></Route>
        {/* Private Courses */}
        <Route
          path="/instructor-courses"
          element={<InstructorPrivateProfile />}
        ></Route>
        {/* Detail Courses */}
        <Route path="/course/:courseId" element={<InstructorCourseDetail />}>
          {/* <Route
            path="instructor-add-course-sections/:courseId"
            element={<AddCourseSection />}
          ></Route> */}
        </Route>
        {/* Add Section  */}
        <Route
          path="/instructor-add-course-sections/:courseId"
          element={<AddCourseSection />}
        ></Route>
        {/* View Sections */}
        <Route
          path="/instructor-course-sections"
          element={<InstructorAllCourseSection />}
        ></Route>

        {/* ------------- */}
        <Route path="/user" element={<User />}></Route>
        <Route path="/courses-course" element={<Course />}></Route>
        <Route element={<Auth />}>
          <Route path="/courses/detail" element={<CourseDetail />}></Route>
        </Route>

        {/* Tất cả route không hợp lệ */}
        <Route path="*" element="404 PAGE NOT FOUND"></Route>
      </Routes>
    </Router>
  );
};

export default App;

// import Accordion from "react-bootstrap/Accordion";

// function App() {
//   return (
//     <Accordion defaultActiveKey="0">
//       <Accordion.Item eventKey="0">
//         <Accordion.Header>Accordion Item #1</Accordion.Header>
//         <Accordion.Body>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//           eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
//           minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//           aliquip ex ea commodo consequat. Duis aute irure dolor in
//           reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
//           pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
//           culpa qui officia deserunt mollit anim id est laborum.
//         </Accordion.Body>
//       </Accordion.Item>
//       <Accordion.Item eventKey="1">
//         <Accordion.Header>Accordion Item #2</Accordion.Header>
//         <Accordion.Body>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//           eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
//           minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//           aliquip ex ea commodo consequat. Duis aute irure dolor in
//           reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
//           pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
//           culpa qui officia deserunt mollit anim id est laborum.
//         </Accordion.Body>
//       </Accordion.Item>
//     </Accordion>
//   );
// }

// export default App;
