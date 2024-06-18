import React, { useEffect, useState, ChangeEvent } from "react";
import styles from "./User.module.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { emailRegex, passwordRegex } from "../../Utils/RegEx";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";

interface User {
  username: string;
  email: string;
}

const User = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(true);
  const [user, setUser] = useState<User | null>(null); // user or null
  const [newUserData, setNewUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState({
    username: false,
    email: false,
    password: false,
  });

  const authUser = useSelector((state) => state.auth.user); // Lấy user từ Redux store

  const getUser = async () => {
    if (!authUser || !authUser.token) return;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/`,
        {
          headers: { Authorization: `Bearer ${authUser.token}` },
        }
      );
      console.log(response);

      // take user from Network
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [authUser]); // Chạy effect này khi authUser thay đổi

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setNewUserData((prev) => ({
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
        "Password must be at least 8 characters and must include at least one special character and one number"
      );
      return;
    }

    if (!newUserData.username && type === "username") {
      toast.error("Please enter a valid username");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/user/updateUser`,
        {
          type,
          newUserData,
        },
        {
          headers: { Authorization: `Bearer ${authUser.token}` },
        }
      );

      toast.success(response.data.message);

      setIsEdit({ email: false, password: false, username: false });
      setNewUserData({ username: "", password: "", email: "" });
      getUser();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
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
                  setIsEdit((prev) => ({
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
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          updateUserData("username");
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setIsEdit((prev) => ({
                            ...prev,
                            username: false,
                          }));
                          setNewUserData((prev) => ({
                            ...prev,
                            username: "",
                          }));
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  )}
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
                  setIsEdit((prev) => ({
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
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          updateUserData("email");
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setIsEdit((prev) => ({
                            ...prev,
                            email: false,
                          }));
                          setNewUserData((prev) => ({
                            ...prev,
                            email: "",
                          }));
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  )}
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
                  type={show ? "password" : "text"}
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
                  setIsEdit((prev) => ({
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
                {isLoading ? (
                  <Loader />
                ) : (
                  <>
                    <button
                      onClick={() => {
                        updateUserData("password");
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEdit((prev) => ({
                          ...prev,
                          password: false,
                        }));
                        setNewUserData((prev) => ({
                          ...prev,
                          password: "",
                        }));
                      }}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
