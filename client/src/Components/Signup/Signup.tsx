import React from "react";

import styles from "./Signup.module.css";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    // full page
    <div className={styles.container}>
      {/* container - Form */}
      <div className={styles.formContainer}>
        <h2>Sign Up ...</h2>
        {/* control input */}
        <div className={styles.inputContainer}>
          <input placeholder="Enter your username ..." type="text" />
          <input placeholder="Enter your email ..." type="text" />
          <input placeholder="Enter your password ..." type="text" />
          <button>Sign Up</button>
        </div>
        <Link to="/">Already have an account ? Loin</Link>
      </div>
    </div>
  );
};

export default Signup;
