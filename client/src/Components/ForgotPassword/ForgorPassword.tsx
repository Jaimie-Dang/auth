import React, { useState } from "react";

import styles from "./ForgotPassword.module.css";
import { emailRegex, passwordRegex } from "../../Utils/RegEx";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgorPassword = () => {
  const [step, setstep] = useState(0);
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>Forgot Password ...</h2>
        {step === 0 && <EmailComponent setstep={setstep} />}
        {step === 1 && <OTPComponent setstep={setstep} />}
        {step === 2 && <PasswordComponent />}
      </div>
    </div>
  );
};

export default ForgorPassword;

const EmailComponent = ({ setstep }) => {
  const [email, setemail] = useState("");

  const getOTP = async () => {
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/resetPassword`,
        { email }
      );
      console.log(response);
      // lấy dữ liệu từ json - message từ server
      toast.success(response.data.message);

      // Lay email tu localstorage
      localStorage.setItem("email", email);
      // change step
      setstep(1);
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <div className={styles.inputContainer}>
      <input
        value={email}
        placeholder="Enter your email ..."
        type="email"
        name="email"
        onChange={(e) => {
          setemail(e.target.value);
        }}
      />
      <button onClick={getOTP}>GET OTP</button>
    </div>
  );
};

const OTPComponent = ({ setstep }) => {
  const [OTP, setOTP] = useState("");
  const verifyOTP = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/verifyPasswordOTP`,
        { OTP }
      );
      console.log(response);
      // lấy dữ liệu từ json - message từ server
      toast.success(response.data.message);
      setstep(2);
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className={styles.inputContainer}>
      <input
        value={OTP}
        placeholder="Enter your OTP ..."
        type="text"
        onChange={(e) => {
          setOTP(e.target.value);
        }}
      />
      <button onClick={verifyOTP}>VERIFY OTP</button>
    </div>
  );
};

const PasswordComponent = () => {
  const [password, setpassword] = useState("");

  const [show, setshow] = useState(false);

  const navigate = useNavigate();

  const resetPassword = async () => {
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters and must include at lease one speacial character and one number"
      );
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/resetPassword`,
        { password, isOTPVerified: true, email: localStorage.getItem("email") }
      );
      console.log(response);
      // lấy dữ liệu từ json - message từ server
      toast.success(response.data.message);

      // navigate route
      navigate("/");

      // localstorage
      localStorage.removeItem("email");
      //---------------------
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <div className={styles.passwordComponent}>
      <div className={styles.passwordContainer}>
        <input
          value={password}
          placeholder="Enter your new password ..."
          type={show ? "text" : "password"}
          name="password"
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
        <button
          onClick={() => {
            setshow(!show);
          }}
        >
          {show ? "HIDE" : "SHOW"}
        </button>
      </div>
      <div className={styles.inputContainer}>
        <button onClick={resetPassword}>RESET PASSWORD</button>
      </div>
    </div>
  );
};
