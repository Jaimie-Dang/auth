import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { emailRegex, passwordRegex } from "../../Utils/RegEx";

interface User {
  username: string;
  email: string;
}
const Home = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const [user, setuser] = useState<User | null>(null); // user or null

  const [newUserData, setnewUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isEdit, setisEdit] = useState({
    username: false,
    email: false,
    password: false,
  });

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

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setnewUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(newUserData);
  }

  const updateUserData = async (type: string) => {
    if (!emailRegex.test(newUserData.email) && type === "email") {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!passwordRegex.test(newUserData.password) && type === "password") {
      toast.error(
        "Password must be at least 8 characters and must include at lease one speacial character and one number"
      );
      return;
    }

    if (!newUserData.username && type === "username") {
      toast.error("Please enter a valid username");
      return;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/user/updateUser`,
        {
          type,
          newUserData,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

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
            <div>
              <input
                name="username"
                value={newUserData.username}
                onChange={handleChange}
                disabled={!isEdit.username}
                placeholder="update username"
                type="text"
              />
              <button
                onClick={() => {
                  setisEdit((prev) => ({
                    ...prev,
                    username: true,
                  }));
                }}
                className={styles.edit}
              >
                EDIT
              </button>
              {isEdit.username && (
                <div className={styles.buttons}>
                  <button
                    onClick={() => {
                      updateUserData("username");
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setisEdit((prev) => ({
                        ...prev,
                        username: false,
                      }));
                      setnewUserData((prev) => ({
                        ...prev,
                        username: "",
                      }));
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
            <div>
              <input
                name="email"
                value={newUserData.email}
                onChange={handleChange}
                disabled={!isEdit.email}
                placeholder="update email"
                type="text"
              />
              <button
                onClick={() => {
                  setisEdit((prev) => ({
                    ...prev,
                    email: true,
                  }));
                }}
                className={styles.edit}
              >
                EDIT
              </button>
              {isEdit.email && (
                <div className={styles.buttons}>
                  <button
                    onClick={() => {
                      updateUserData("email");
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setisEdit((prev) => ({
                        ...prev,
                        email: false,
                      }));
                      setnewUserData((prev) => ({
                        ...prev,
                        email: "",
                      }));
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
            <div className={styles.passwordEdit}>
              <div className={styles.passwordContainer}>
                <input
                  name="password"
                  value={newUserData.password}
                  onChange={handleChange}
                  disabled={!isEdit.password}
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
              <button
                onClick={() => {
                  setisEdit((prev) => ({
                    ...prev,
                    password: true,
                  }));
                }}
                className={styles.edit}
              >
                EDIT
              </button>
            </div>
            {isEdit.password && (
              <div className={styles.buttons}>
                <button
                  onClick={() => {
                    updateUserData("password");
                  }}
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setisEdit((prev) => ({
                      ...prev,
                      password: false,
                    }));
                    setnewUserData((prev) => ({
                      ...prev,
                      password: "",
                    }));
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
