import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div>
      <div className={styles.container_footer}>
        <section className={styles.contact} id="contact">
          <div className={styles.main_contact}>
            <img src="/public/logo.png" alt="logo" />
            <div className={styles.contact_content}>
              <ul className={styles.footer__list}>
                <li>
                  <a href="#">Facebook</a>
                </li>
                <li>
                  <a href="#">Instagram</a>
                </li>
                <li>
                  <a href="#">Twitter</a>
                </li>
              </ul>
            </div>
            <div className={styles.contact_content}>
              <ul className={styles.footer__list}>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Courses</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">My learning</a>
                </li>
              </ul>
            </div>
            <div className={styles.contact_content}>
              <ul className={styles.footer__list}>
                <li>
                  <a href="#">Profile</a>
                </li>
                <li>
                  <a href="#">Login</a>
                </li>
                <li>
                  <a href="#">Register</a>
                </li>
                <li>
                  <a href="#">Dashboard</a>
                </li>
              </ul>
            </div>
            <div className={styles.contact_content}>
              <ul className={styles.footer__list}>
                <li>
                  <a href="#">Ho Chi Minh</a>
                </li>
                <li>
                  <a href="mailto:tuyendtm20@uef.edu.vn">
                    tuyendtm20@uef.edu.vn
                  </a>
                </li>
                <li>
                  <a href="tel:0396789177">0396789177</a>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <div className={styles.last_text}>
          <p>@2024 Dang Thi Mong Tuyen. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
