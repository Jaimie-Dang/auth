import ForgorPassword from "./Components/ForgotPassword/ForgorPassword";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// nav bar
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/forget-password" element={<ForgorPassword />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
