import React, { useState } from "react";

import styles from "./ForgotPassword.module.css";

const ForgorPassword = () => {
  const [step, setstep] = useState(0);
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>Forgot Password ...</h2>
        {step === 0 && <EmailComponent />}
        {step === 1 && <OTPComponent />}
        {step === 2 && <PasswordComponent />}
      </div>
    </div>
  );
};

export default ForgorPassword;

const EmailComponent = () => {
  const [email, setemail] = useState("");
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
      <button>GET OTP</button>
    </div>
  );
};

const OTPComponent = () => {
  const [OTP, setOTP] = useState("");
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
      <button>VERIFY OTP</button>
    </div>
  );
};

const PasswordComponent = () => {
  const [password, setpassword] = useState("");

  const [show, setshow] = useState(false);
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
        <button>RESET PASSWORD</button>
      </div>
    </div>
  );
};
