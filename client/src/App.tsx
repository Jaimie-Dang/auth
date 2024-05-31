import ForgorPassword from "./Components/ForgotPassword/ForgorPassword";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./Utils/Auth";
import User from "./Components/User/User";
import Course from "./Components/Course/Course";
import CourseDetail from "./Components/CourseDetail/CourseDetail";
// nav bar
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/forget-password" element={<ForgorPassword />}></Route>
        <Route element={<Auth />}>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/user" element={<User />}></Route>
          <Route path="/courses" element={<Course />}></Route>
        </Route>
        <Route path="/courses/detail" element={<CourseDetail />}></Route>

        {/* Tất cả route không hợp lệ */}
        <Route path="*" element="404 PAGE NOT FOUND"></Route>
      </Routes>
    </Router>
  );
};

export default App;
