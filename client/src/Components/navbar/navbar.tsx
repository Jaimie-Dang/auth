import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const navbar = () => {
  const navigate = useNavigate();
  return (
    // <nav>
    //   <span>Hello {user.username}</span>
    //   <button
    //     onClick={() => {
    //       localStorage.clear();
    //       navigate("/login");
    //       toast.success("User logged out");
    //     }}
    //     className={styles.logoutBtn}
    //   >
    //     LOGOUT
    //   </button>
    // </nav>
    <header>
      <a href="/" className={styles.logo}>
        <img src="/public/logo.png" alt="logo" />
      </a>
      <div className={styles.header_searchBar}>
        <input className={styles.search_bar} type="text" placeholder="Search" />
        <button className={styles.search_button}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <ul className={styles.navbar}>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/courses">Courses</a>
        </li>
        <li>
          <a href="/my-learning">My learning</a>
        </li>
        <li>
          <a href="/user">{user.username}</a>
        </li>
        <li>
          <a href="/login">Login/Register</a>
        </li>
      </ul>
    </header>
  );
};

export default navbar;
