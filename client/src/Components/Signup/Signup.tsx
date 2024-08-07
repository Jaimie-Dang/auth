import React, { useState, ChangeEvent } from "react";

import styles from "./Signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import { emailRegex, passwordRegex } from "../../Utils/RegEx";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../Loader/Loader";

const Signup = () => {
  //---------------------------
  const navigate = useNavigate(); // to navigate user to specific link
  //---------------------------
  const [userDetails, setuserDetails] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [isLoading, setisLoading] = useState(false);
  const [show, setshow] = useState(false);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setuserDetails((prev) => ({ ...prev, [name]: value }));
    console.log(userDetails);
  }

  // insert async in order to call/add "API"
  const handleSignUp = async () => {
    if (!userDetails.username) {
      toast.error("Please enter a valid username");
      return;
    }
    if (!emailRegex.test(userDetails.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!passwordRegex.test(userDetails.password)) {
      toast.error(
        "Password must be at least 8 characters and must include at lease one speacial character and one number"
      );
      return;
    }

    // call API + BE using axios - axios dùng để giao tiếp giữa FE và BE
    try {
      setisLoading(true);
      const response = await axios.post(
        "http://localhost:5000/user/register",
        userDetails
      );
      // toast.success("FORM SUBMITED");
      toast.success(response.data.message);
      navigate("/login");
      console.log(response);
      setisLoading(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error);
      setisLoading(false);
    }

    // toast.success("FORM SUBMITED");
    // console.log(emailRegex.test(userDetails.email));
    // console.log(passwordRegex.test(userDetails.password), userDetails.password);
  };
  return (
    // full page
    <div className={styles.container}>
      {/* container - Form */}
      <div className={styles.formContainer}>
        <h2>Sign Up ...</h2>
        {/* control input */}
        <div className={styles.inputContainer}>
          <input
            value={userDetails.username}
            placeholder="Enter your username ..."
            type="text"
            name="username"
            onChange={handleInputChange}
          />
          <input
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
          <button onClick={handleSignUp}>
            {isLoading ? <Loader /> : "SIGN UP"}
          </button>
        </div>
        <Link to="/login">Already have an account ? Login</Link>
      </div>
    </div>
  );
};

export default Signup;
