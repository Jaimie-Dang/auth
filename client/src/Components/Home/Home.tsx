import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

interface User {
  username: string;
  email: string;
}
const Home = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const [user, setuser] = useState<User | null>(null); // user or null

  // call API : get method
  const getUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response);

      // take user from Network
      setuser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className={styles.container}>
      {user && (
        <nav>
          <span>Hello {user.username}</span>
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
      )}
      {/* to render => wrap + { ... + code} */}
      {user && (
        <div className={styles.mainContainer}>
          <div className={styles.user}>
            User Details
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
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
      )}
    </div>
  );
};

export default Home;
