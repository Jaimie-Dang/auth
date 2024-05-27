import React from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate();
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
        <div>
          User Details
          <p>Username: name</p>
          <p>Email: email</p>
        </div>
        <div className={styles.editContainer}>
          Update User
          <input type="text" />
          <input type="text" />
          <input type="text" />
        </div>
      </div>
    </div>
  );
};

export default Home;
