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
      {/* ------------------------------------------ */}
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<Home />}></Route>

        {/* Login - Signup - Forgot Password */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/forget-password" element={<ForgorPassword />}></Route>
        {/*  */}
        {/*  Courses */}
        <Route path="/courses" element={<Courses />}></Route>
        {/*  Detail Courses */}
        <Route path="/course/:courseId" element={<CourseDetail />}></Route>
        {/*  */}

        {/* ------------------------------------------------------------ */}
        {/* Instructors Links */}
        <Route
          path="/instructor-add-course"
          element={
            <AuthRoute>
              <AddCourse />
            </AuthRoute>
          }
        ></Route>
        {/* <Route element={<Auth />}> */}

        {/* Update Courses */}
        <Route
          path="/instructor-update-course/:courseId"
          element={
            <AuthRoute>
              <UpdateCourse />
            </AuthRoute>
          }
        ></Route>
        {/* Private instructor Courses */}
        <Route
          path="/instructor-courses"
          element={
            <AuthRoute>
              <InstructorPrivateProfile />
            </AuthRoute>
          }
        ></Route>
        {/* Detail instructor Courses */}
        <Route
          path="/instructor-courses/:courseId"
          element={
            <AuthRoute>
              <InstructorCourseDetail />
            </AuthRoute>
          }
        ></Route>
        {/* Add Section  */}
        <Route
          path="/instructor-add-course-sections/:courseId"
          element={
            <AuthRoute>
              <AddCourseSection />
            </AuthRoute>
          }
        ></Route>
        {/* View Sections */}
        <Route
          path="/instructor-course-sections"
          element={
            <AuthRoute>
              <InstructorAllCourseSection />
            </AuthRoute>
          }
        ></Route>
        {/* Update Section Course */}
        <Route
          path="/update-course-section/:sectionId"
          element={
            <AuthRoute>
              <UpdateCourseSection />
            </AuthRoute>
          }
        ></Route>
        {/*  Users/students */}
        <Route
          path="/students-position/:courseId"
          element={<Ranking />}
        ></Route>
        {/*  Users/students/start */}
        <Route
          path="/start-section/:courseId"
          element={
            <AuthRoute>
              <StartSection />
            </AuthRoute>
          }
        ></Route>
        {/*  Users/students/Update progress */}
        <Route
          path="/progress-update/:courseId"
          element={
            <AuthRoute>
              <ProgressUpdate />
            </AuthRoute>
          }
        ></Route>
        {/*  Users/student-dashboard */}
        <Route
          path="/student-dashboard"
          element={
            <AuthRoute>
              <StudentDashboard />
            </AuthRoute>
          }
        ></Route>
        {/* </Route> */}

        {/* ------------------------------------------------------------ */}
        <Route path="/user" element={<User />}></Route>
        <Route path="/courses-course-detail" element={<Course />}></Route>
        <Route element={<Auth />}>
          <Route path="/courses/detail" element={<CourseDetail />}></Route>
        </Route>

        {/* All route not found */}
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
