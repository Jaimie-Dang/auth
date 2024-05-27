import React, { useState } from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  return (
    <div className={styles.container}>
      <nav>
        <span>Hello user</span>
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/");
            toast.success("User logged out");
          }}
          className={styles.logoutBtn}
        >
          LOGOUT
        </button>
      </nav>
      <div className={styles.mainContainer}>
        <div className={styles.user}>
          User Details
          <p>Username: name</p>
          <p>Email: email</p>
        </div>
        <div className={styles.editContainer}>
          Update User
          <input placeholder="update username" type="text" />
          <input placeholder="update email" type="text" />
          <div className={styles.passwordContainer}>
            <input
              placeholder="update password"
              type={show ? "text" : "password"}
            />
            <button
              onClick={() => {
                setShow(!show);
              }}
            >
              {show ? "SHOW" : "HIDE"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
