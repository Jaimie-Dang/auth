import React, { useState, ChangeEvent } from "react";

import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { emailRegex, passwordRegex } from "../../Utils/RegEx";
import toast from "react-hot-toast";

const Login = () => {
  const [userDetails, setuserDetails] = useState({
    password: "",
    email: "",
  });

  const [show, setshow] = useState(false);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setuserDetails((prev) => ({ ...prev, [name]: value }));
    console.log(userDetails);
  }

  const handleLogin = () => {
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
    toast.success("FORM SUBMITED");
    // console.log(emailRegex.test(userDetails.email));
    // console.log(passwordRegex.test(userDetails.password), userDetails.password);
  };
  return (
    // full page
    <div className={styles.container}>
      {/* container - Form */}
      <div className={styles.formContainer}>
        <h2>Login ...</h2>
        <div className={styles.social}>
          <div>FB</div>
          <div>GOOGLE</div>
        </div>
        {/* control input */}
        <div className={styles.inputContainer}>
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
          <button onClick={handleLogin}>Login</button>
        </div>
        <div className={styles.footer}>
          <Link to="/signup">Already have an account ? Signup</Link>
          <Link to="/forget-password">Forgot password</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
