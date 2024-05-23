import React, { useState, ChangeEvent } from "react";

import styles from "./Signup.module.css";
import { Link } from "react-router-dom";

const Signup = () => {
  const [userDetails, setuserDetails] = useState({
    username: "",
    password: "",
    email: "",
  });

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setuserDetails((prev) => ({ ...prev, [name]: value }));
    console.log(userDetails);
  }

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
          <input
            value={userDetails.password}
            placeholder="Enter your password ..."
            type="password"
            name="password"
            onChange={handleInputChange}
          />
          <button>Sign Up</button>
        </div>
        <Link to="/">Already have an account ? Loin</Link>
      </div>
    </div>
  );
};

export default Signup;
