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
// nav bar
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/forget-password" element={<ForgorPassword />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/user" element={<User />}></Route>
        <Route path="/courses" element={<Course />}></Route>
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
