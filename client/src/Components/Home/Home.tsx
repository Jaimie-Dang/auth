import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { emailRegex, passwordRegex } from "../../Utils/RegEx";
import Loader from "../Loader/Loader";
import Navbar from "../Home/navbar/navbar";
import Footer from "./footer/Footer";

interface User {
  username: string;
  email: string;
}
const Home = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(true);

  const [user, setuser] = useState<User | null>(null); // user or null

  const [newUserData, setnewUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isLoading, setisLoading] = useState(false);

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
      setisLoading(true);
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

      toast.success(response.data.message);

      setisEdit({ email: false, password: false, username: false });
      setnewUserData({ username: "", password: "", email: "" });
      getUser();
      setisLoading(false);
    } catch (error) {
      console.log(error);
      setisLoading(false);
    }
  };

  return (
    // className={styles.container}
    <div>
      {user && <Navbar user={user} />}
      {/* <!--Start section--> */}
      <section className={styles.home} id="home">
        <div className={styles.home_text}>
          {/* <h1 className="text-danger">Welcome</h1> */}
          <h6>Best learning English for IT platform</h6>
          <h1>Accessible Online Courses For All</h1>
          <p>Own your future learning new skills online</p>
          <div className={styles.latter}>
            <form action="#">
              <input type="email" placeholder="Write your email" required />
              <input type="submit" value="Let's start" required />
            </form>
          </div>
        </div>
        <div className={styles.home_img}>
          <img src="/public/image-home.png" alt="" />
        </div>
      </section>
      {/* <!--Start container section--> */}
      <section className={styles.Container}>
        <div className={styles.container_box}>
          <div className={styles.container_img}>
            <img src="/public/trophy-svgrepo-com.svg" alt="" />
          </div>
          <div className={styles.container_text}>
            <h4>19</h4>
            <p>Top Courses</p>
          </div>
        </div>
        <div className={styles.container_box}>
          <div className={styles.container_img}>
            <img src="/public/an-examination-svgrepo-com.svg" alt="" />
          </div>
          <div className={styles.container_text}>
            <h4>100</h4>
            <p>Trending</p>
          </div>
        </div>
        <div className={styles.container_box}>
          <div className={styles.container_img}>
            <img src="/public/team-svgrepo-com.svg" alt="" />
          </div>
          <div className={styles.container_text}>
            <h4>999</h4>
            <p>Users</p>
          </div>
        </div>
      </section>
      {/* <!--Start container section--> */}
      <section className={styles.categories} id="categories">
        <div className={styles.center_text}>
          <h5>CATEGORIES</h5>
          <h2>Popular Categories</h2>
        </div>
        <div className={styles.categories_content}>
          <div className={styles.box}>
            <img
              src="/public/shutterstock_2079730714.jpg"
              alt="image"
              width="200"
              height="80"
            />
            <h3>Software Engineering</h3>
            <p> 8 lessons</p>
          </div>
          <div className={styles.box}>
            <img
              src="/public/1665130804phpZFCpIs.jpeg"
              alt="image"
              width="80"
              height="80"
            />
            <h3>Information Systems</h3>
            <p>6 lessons</p>
          </div>
          <div className={styles.box}>
            <img
              src="/public/what-is-cybersecurity.jpg"
              alt="image"
              width="80"
              height="80"
            />
            <h3>Cyber Security</h3>
            <p> 4 lessons</p>
          </div>
          <div className={styles.box}>
            <img src="/public/images.jpg" alt="image" width="80" height="80" />
            <h3>Artificial Intelligence</h3>
            <p> 7 lessons</p>
          </div>
        </div>
        <div className={styles.main_btn}>
          {/* <!-- <a href="#" className="btn"> </a>
        <a href="#" className="btn"></a> -->
        <!-- <button className="btn swiper-button-prev">&lt; Back</button>
        <button className="btn swiper-button-next">Next &gt;</button> --> */}
        </div>
      </section>
      {/* <!--Start course section--> */}
      <section className={styles.courses} id="courses">
        <div className={styles.center_text}>
          <h5>COURSES</h5>
          <h2>Explore Popular Courses</h2>
        </div>
        <div className={styles.course_content}>
          <div className={styles.row}>
            <a href="/courses">
              <img src="/public/0_bEonUGnx4V0nL1eJ.jpg" alt="image" />
              <div className={styles.course_text}>
                <h3>Programming Languages</h3>
                <h6>32 minutes</h6>
                <div className={styles.rating}>
                  <div className={styles.star}>
                    <a href="#">
                      <i className="bx bxs-star"></i>
                    </a>
                    <a href="#">
                      <i className="bx bxs-star"></i>
                    </a>
                    <a href="#">
                      <i className="bx bxs-star"></i>
                    </a>
                    <a href="#">
                      <i className="bx bxs-star"></i>
                    </a>
                    <a href="#">
                      <i className="bx bx-star"></i>
                    </a>
                  </div>
                </div>
                <div className="review">
                  <p>3 reviews</p>
                </div>
              </div>
            </a>
          </div>

          <div className={styles.row}>
            <a href="/courses">
              <img src="/public/getty_913588226_414027.jpg" alt="image" />
              <div className={styles.course_text}>
                <h3>Networking</h3>
                <h6>80 minutes</h6>
                <div className={styles.rating}>
                  <div className={styles.star}>
                    <a href="#">
                      <i className="bx bxs-star"></i>
                    </a>
                    <a href="#">
                      <i className="bx bxs-star"></i>
                    </a>
                    <a href="#">
                      <i className="bx bxs-star"></i>
                    </a>
                    <a href="#">
                      <i className="bx bxs-star"></i>
                    </a>
                    <a href="#">
                      <i className="bx bx-star"></i>
                    </a>
                  </div>
                </div>
                <div className="review">
                  <p>5 reviews</p>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className={styles.main_btn}>
          <a href="/courses" className={styles.btn}>
            All Courses
          </a>
        </div>
      </section>
      {/* <!--Start cta section--> */}
      <section className={styles.cta}>
        <div className={styles.center_text}>
          <h5>Trusted by</h5>
          <h2>Studens Of UEF</h2>
        </div>
        <div className={styles.cta_content}>
          <div className={styles.cta_img}>
            <img src="/public/logo.png" alt="" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
