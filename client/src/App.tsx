import ForgorPassword from "./Components/ForgotPassword/ForgorPassword";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";

const App = () => {
  return (
    <div>
      <Login />
      <Signup />
      <ForgorPassword />
      <Home />
    </div>
  );
};

export default App;
