import styles from "./Home.module.css";

import Footer from "../footer/Footer";
import { useQuery } from "@tanstack/react-query";
import { getAllCoursesAPI } from "../../services/courses/courseServices";
import { getAllUsers } from "../../services/users/userServices";

const Home = () => {
  // UseQuery
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["list Courses"],
    queryFn: getAllCoursesAPI,
  });
  console.log(data);

  const { data: userData } = useQuery({
    queryKey: ["list User"],
    queryFn: getAllUsers,
  });
  console.log(userData);

  return (
    // className={styles.container}
    <div>
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
            <h4>{data?.length}</h4>
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
            <h4>{userData?.length}</h4>
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
            <img src="/public/shutterstock_2079730714.jpg" alt="image" />
            <h3>Software Engineering</h3>
            <p> 8 courses</p>
          </div>
          <div className={styles.box}>
            <img src="/public/1665130804phpZFCpIs.jpeg" alt="image" />
            <h3>Information Systems</h3>
            <p>6 courses</p>
          </div>
          <div className={styles.box}>
            <img src="/public/what-is-cybersecurity.jpg" alt="image" />
            <h3>Cyber Security</h3>
            <p> 4 courses</p>
          </div>
          <div className={styles.box}>
            <img src="/public/images.jpg" alt="image" width="80" height="80" />
            <h3>Artificial Intelligence</h3>
            <p> 7 courses</p>
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
          {data?.slice(0, 2).map((course) => (
            <div className={styles.row}>
              <a href={`/course/${course._id}`}>
                <img src={course.image} alt="image" />
                <div className={styles.course_text}>
                  <h3>{course?.title}</h3>
                  <h4>{course.description}</h4>
                  <h6>{course?.duration} minutes</h6>
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
                    <h7>{course?.students?.length} Students</h7>
                  </div>
                </div>
              </a>
            </div>
          ))}
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
