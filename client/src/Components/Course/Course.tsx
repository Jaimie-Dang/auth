import React from "react";
import Navbar from "../navbar/PublicNavbar";
import Footer from "../footer/Footer";
import styles from "./Course.module.css";

const Course = () => {
  return (
    <div>
      <Navbar user={""} />
      <div className={styles.main_container}>
        {/*  */}
        <div className={styles.text_container}>
          <h1>PROGRAMMING LANGUAGE</h1>
          <div>
            A programming language is a system of notation for writing computer
            programs. Programming languages are described in terms of their
            syntax (form) and semantics (meaning), usually defined by a formal
            language.
          </div>
          <h5>(120 minutes)</h5>
        </div>
        {/*  */}
        <div className={styles.course_container}>
          <div className={styles.section_container}>
            <div className={styles.img_container}>
              <a href="courses/detail">
                <img
                  src="/public/logo.png"
                  alt="img"
                  height={130}
                  width={200}
                />
              </a>
            </div>
            <div className={styles.content}>
              <a href="courses/detail">
                <div>Reading: Programming Language</div>
              </a>
              <div>
                This unit discusses which programming languages are the most
                popular, what they are used for, and why.
              </div>
            </div>
          </div>
          <div className={styles.section_container}>
            <div className={styles.img_container}>
              <a href="courses/detail">
                <img
                  src="/public/logo.png"
                  alt="img"
                  height={130}
                  width={200}
                />
              </a>
            </div>
            <div className={styles.content}>
              <a href="courses/detail">
                <div>Why do we use it?</div>
              </a>
              <div>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Course;
